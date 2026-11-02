# Le Père Noël veut savoir

Le Père Noël pose des questions à l'enfant (oui / non, à la voix ou au bouton) et trouve le cadeau qui lui plairait, façon Akinator. À la fin, l'enfant passe le téléphone à ses parents, qui récupèrent la liste.

- `app/index.html` : toute l'application (une seule page, sans image incrustée, tout est dessiné).
- `version.json` : la version en cours et ses nouveautés ; l'application le lit pour proposer la mise à jour.
- `voix/` (optionnel) : voix enregistrées du Père Noël, avec `voix/map.json` qui associe chaque phrase à son fichier audio.
- `.github/workflows/android.yml` : le robot fabrique l'APK, le signe et le publie dans les Releases.

Pour mettre à jour l'application sur les téléphones : modifier `app/index.html`, mettre le même numéro de version dans `version.json`, et l'application propose la mise à jour toute seule.
