/**
 * Bayrol Pool Card – Custom Lovelace cards for Bayrol Pool Access
 *
 * Cards:
 *   - bayrol-pool-dashboard-card : Full pool overview (metrics + equipment)
 *   - bayrol-pool-chart-card     : Historical chart for any pool entity
 */

import "./bayrol-pool-dashboard-card";
import "./bayrol-pool-chart-card";
import "./bayrol-pool-messages-card";

const CARD_VERSION = "2026.4.0";

/* eslint-disable no-console */
console.info(
  `%c BAYROL-POOL-CARD %c v${CARD_VERSION} `,
  "color: white; background: #03a9f4; font-weight: bold; padding: 2px 6px; border-radius: 4px 0 0 4px;",
  "color: #03a9f4; background: white; font-weight: bold; padding: 2px 6px; border-radius: 0 4px 4px 0; border: 1px solid #03a9f4;"
);

// Register cards in HA's custom card picker
(window as unknown as Record<string, unknown>).customCards = (
  (window as unknown as Record<string, unknown>).customCards as unknown[] || []
).concat([
  {
    type: "bayrol-pool-dashboard-card",
    name: "Bayrol Pool Dashboard",
    description: "Vue d'ensemble de votre piscine Bayrol — température, pH, ORP, sel, équipements.",
    preview: true,
    documentationURL: "https://github.com/tdenolle/bayrol-pool-card",
  },
  {
    type: "bayrol-pool-chart-card",
    name: "Bayrol Pool Chart",
    description: "Graphique historique pour n'importe quelle entité Bayrol Pool Access.",
    preview: true,
    documentationURL: "https://github.com/tdenolle/bayrol-pool-card",
  },
  {
    type: "bayrol-pool-messages-card",
    name: "Bayrol Pool Messages",
    description: "Affiche les messages et alertes de votre Bayrol Pool Access.",
    preview: true,
    documentationURL: "https://github.com/tdenolle/bayrol-pool-card",
  },
]);
