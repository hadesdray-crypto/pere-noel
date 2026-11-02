"""Remplace les icônes et l'écran de démarrage de Capacitor par ceux du Père Noël."""
import os, shutil
from PIL import Image
RES = "android/app/src/main/res"
for dossier in os.listdir("android-ressources/res"):
    for f in os.listdir(f"android-ressources/res/{dossier}"):
        os.makedirs(f"{RES}/{dossier}", exist_ok=True)
        shutil.copy(f"android-ressources/res/{dossier}/{f}", f"{RES}/{dossier}/{f}")
splash = Image.open("android-ressources/splash.png")
for racine, _, fichiers in os.walk(RES):
    for f in fichiers:
        if f == "splash.png":
            p = os.path.join(racine, f)
            w, h = Image.open(p).size
            cote = max(w, h)
            grand = splash.resize((cote, cote))
            grand.crop(((cote - w) // 2, (cote - h) // 2, (cote - w) // 2 + w, (cote - h) // 2 + h)).save(p)
os.makedirs(f"{RES}/values", exist_ok=True)
open(f"{RES}/values/ic_launcher_background.xml", "w").write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#3A0D0B</color>\n</resources>\n')
print("icônes remplacées")
