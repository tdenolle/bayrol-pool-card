# Règles Copilot — bayrol-pool-card

## Push Git

**Toujours demander l'approbation de l'utilisateur avant de pusher sur `develop` ou `main`.**

- Builder le projet (`npm run build`)
- Si le build passe, présenter le résumé des changements et attendre le feu vert
- Seulement après confirmation explicite, exécuter `git push`

## Versioning

Format **CalVer** : `ANNEE.MOIS.INCREMENT` (ex: `2026.4.0`, `2026.4.1`, ...)

- Premier incrément du mois = `0`
- Versions dev : `ANNEE.MOIS.INCREMENT-dev.YYYYMMDDHHMMSS`
- Fichiers à synchroniser lors d'un bump de version :
  - `package.json`

## Stack technique

- **LitElement** (framework UI natif Home Assistant)
- **TypeScript** + **Rollup** pour le bundle
- **Chart.js** (lazy-loaded) pour les graphiques
- Distribution via **HACS**

## Branches

- `main` : releases stables (tags `ANNEE.MOIS.INCREMENT`)
- `develop` : preview/dev (pre-release automatique)

## Documentation

- Mettre à jour le **README.md** à chaque ajout, modification ou suppression de carte
- Sections à maintenir synchronisées : liste des cartes, exemples YAML, exemple dashboard complet, **previews SVG**
- Vérifier que le README reflète l'état actuel du code avant chaque push sur `develop` ou `main`

## Previews des cartes

- Chaque carte doit avoir un **mockup SVG** dans `docs/preview-{nom}.svg`
- Convention de nommage : `preview-dashboard.svg`, `preview-chart.svg`, `preview-messages.svg`, `preview-temp-chart.svg`
- Le SVG utilise un thème sombre (fond `#1c1c1c`, texte `#e0e0e0`, secondaire `#999`)
- Lors de l'ajout d'une nouvelle carte :
  1. Créer le fichier `docs/preview-{nom}.svg` avec des données mockées réalistes
  2. Ajouter `![Preview](docs/preview-{nom}.svg)` dans le README sous le bloc YAML de config
  3. S'assurer que le SVG fait ~480px de large et utilise le même style visuel que les autres previews
