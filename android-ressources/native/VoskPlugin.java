package app.perenoel.veutsavoir;

import android.Manifest;
import android.content.pm.PackageManager;
import android.content.res.AssetManager;
import android.media.AudioFormat;
import android.media.AudioRecord;
import android.media.MediaRecorder;
import androidx.core.content.ContextCompat;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import org.json.JSONArray;
import org.json.JSONObject;
import org.vosk.Model;
import org.vosk.Recognizer;

/** Moteur de reconnaissance vocale embarqué (hors connexion), français. */
@CapacitorPlugin(name = "VoskSTT")
public class VoskPlugin extends Plugin {
    private static final String YN = "[\"oui\",\"non\",\"ouais\",\"ouai\",\"nan\",\"mouais\",\"peut-être\",\"un peu\",\"beaucoup\",\"pas du tout\",\"je ne sais pas\",\"bof\",\"d'accord\",\"bien sûr\",\"pas vraiment\",\"plutôt oui\",\"plutôt non\",\"[unk]\"]";
    private static final String AGE = "[\"un\",\"deux\",\"trois\",\"quatre\",\"cinq\",\"six\",\"sept\",\"huit\",\"neuf\",\"dix\",\"onze\",\"douze\",\"treize\",\"quatorze\",\"quinze\",\"seize\",\"ans\",\"j'ai\",\"[unk]\"]";
    private Model model;
    private volatile boolean stop = false;
    private volatile boolean busy = false;

    private void copyDir(AssetManager am, String src, File dst) throws Exception {
        String[] list = am.list(src);
        if (list == null || list.length == 0) {
            dst.getParentFile().mkdirs();
            try (InputStream in = am.open(src); OutputStream out = new FileOutputStream(dst)) {
                byte[] b = new byte[65536]; int n;
                while ((n = in.read(b)) > 0) out.write(b, 0, n);
            }
            return;
        }
        dst.mkdirs();
        for (String s : list) copyDir(am, src + "/" + s, new File(dst, s));
    }

    private synchronized Model chargerModele() throws Exception {
        if (model != null) return model;
        File base = new File(getContext().getFilesDir(), "vosk-fr");
        File ok = new File(base, ".ok");
        if (!ok.exists()) {
            if (base.exists()) deleteAll(base);
            copyDir(getContext().getAssets(), "vosk-fr", base);
            new FileOutputStream(ok).close();
        }
        model = new Model(base.getAbsolutePath());
        return model;
    }

    private void deleteAll(File f) {
        File[] c = f.listFiles();
        if (c != null) for (File x : c) deleteAll(x);
        f.delete();
    }

    @PluginMethod
    public void ready(final PluginCall call) {
        new Thread(() -> {
            try { chargerModele(); JSObject r = new JSObject(); r.put("ok", true); call.resolve(r); }
            catch (Throwable e) { call.reject("model: " + e); }
        }).start();
    }

    @PluginMethod
    public void stop(PluginCall call) { stop = true; call.resolve(); }

    @PluginMethod
    public void start(final PluginCall call) {
        if (ContextCompat.checkSelfPermission(getContext(), Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED) {
            call.reject("permission");
            return;
        }
        if (busy) { call.reject("busy"); return; }
        final String kind = call.getString("kind", "name");
        final int timeout = call.getInt("timeoutMs", 7000);
        busy = true; stop = false;
        new Thread(() -> {
            AudioRecord rec = null; Recognizer rz = null;
            try {
                Model m = chargerModele();
                String g = "yn".equals(kind) ? YN : "age".equals(kind) ? AGE : null;
                rz = g != null ? new Recognizer(m, 16000.0f, g) : new Recognizer(m, 16000.0f);
                int min = AudioRecord.getMinBufferSize(16000, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT);
                int size = Math.max(min, 8000);
                rec = new AudioRecord(MediaRecorder.AudioSource.VOICE_RECOGNITION, 16000, AudioFormat.CHANNEL_IN_MONO, AudioFormat.ENCODING_PCM_16BIT, size * 2);
                if (rec.getState() != AudioRecord.STATE_INITIALIZED) throw new Exception("micro");
                rec.startRecording();
                short[] buf = new short[4000];
                long t0 = System.currentTimeMillis();
                boolean spoke = false;
                String text = "";
                while (!stop) {
                    int n = rec.read(buf, 0, buf.length);
                    long el = System.currentTimeMillis() - t0;
                    if (n <= 0) { if (el > timeout + 4000) break; try { Thread.sleep(20); } catch (Exception e) {} continue; }
                    if (rz.acceptWaveForm(buf, n)) {
                        text = new JSONObject(rz.getResult()).optString("text", "");
                        if (!text.trim().isEmpty() && !text.trim().equals("[unk]")) break;
                        text = "";
                    } else {
                        String p = new JSONObject(rz.getPartialResult()).optString("partial", "");
                        if (!p.trim().isEmpty()) spoke = true;
                    }
                    if (el > timeout && !spoke) break;
                    if (el > timeout + 4000) break;
                }
                if (text.isEmpty()) text = new JSONObject(rz.getFinalResult()).optString("text", "");
                text = text.replace("[unk]", "").trim();
                JSObject r = new JSObject(); r.put("text", text);
                call.resolve(r);
            } catch (Throwable e) {
                call.reject(String.valueOf(e));
            } finally {
                try { if (rec != null) { rec.stop(); rec.release(); } } catch (Throwable e) {}
                try { if (rz != null) rz.close(); } catch (Throwable e) {}
                busy = false;
            }
        }).start();
    }
}
