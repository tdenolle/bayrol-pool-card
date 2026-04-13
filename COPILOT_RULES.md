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
