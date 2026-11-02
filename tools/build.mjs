// Prépare le dossier www/ (ce que l'application embarque) à partir de app/.
import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
rmSync("www", { recursive: true, force: true });
mkdirSync("www", { recursive: true });
cpSync("app", "www", { recursive: true });
if (existsSync("voix")) cpSync("voix", "www/voix", { recursive: true }); // voix enregistrées (optionnel)
console.log("www/ prêt");
