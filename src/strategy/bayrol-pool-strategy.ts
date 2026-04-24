/**
 * Bayrol Pool Dashboard Strategy
 *
 * Generates a complete Lovelace dashboard for Bayrol Pool Access.
 * Users pick this strategy when creating a new dashboard — no YAML needed.
 *
 * Custom element: ll-strategy-dashboard-bayrol-pool
 * Strategy type:  custom:bayrol-pool
 */

import { HomeAssistant } from "../types";

export interface BayrolPoolStrategyConfig {
  type: string;
  device_serial?: string;
  entity_prefix?: string;
  show_equipment?: boolean;
  show_charts?: boolean;
  show_messages?: boolean;
  title?: string;
}

export interface BayrolDevice {
  serial: string;
  prefix: string;
  /** Friendly label built from entity naming, e.g. "bayrol – 1234567" */
  label: string;
}

interface LovelaceViewConfig {
  title: string;
  path: string;
  icon?: string;
  type?: string;
  cards: Record<string, unknown>[];
}

interface LovelaceDashboardConfig {
  title?: string;
  views: LovelaceViewConfig[];
}

const DEVICE_PATTERN = /^sensor\.(.+?)_(\d{5,})_(temperature|ph|mv_se|salt|status)$/;

/**
 * Detect all Bayrol Pool Access devices from HA entity states.
 * Returns a deduplicated list of { serial, prefix, label }.
 */
export function detectBayrolDevices(hass: HomeAssistant): BayrolDevice[] {
  const seen = new Map<string, BayrolDevice>();
  for (const entityId of Object.keys(hass.states)) {
    const m = entityId.match(DEVICE_PATTERN);
    if (m) {
      const prefix = m[1];
      const serial = m[2];
      if (!seen.has(serial)) {
        seen.set(serial, { serial, prefix, label: `${prefix} – ${serial}` });
      }
    }
  }
  return Array.from(seen.values());
}

class BayrolPoolDashboardStrategy extends HTMLElement {
  static getCreateSuggestions(_hass: HomeAssistant) {
    return {
      title: "Bayrol Pool Access",
      icon: "mdi:pool",
    };
  }

  static async generate(
    config: BayrolPoolStrategyConfig,
    hass: HomeAssistant,
  ): Promise<LovelaceDashboardConfig> {
    const devices = detectBayrolDevices(hass);
    const serial = config.device_serial || (devices.length > 0 ? devices[0].serial : "");
    const prefix = config.entity_prefix;
    const showEquipment = config.show_equipment !== false;
    const showCharts = config.show_charts !== false;
    const showMessages = config.show_messages !== false;

    // ---- Overview view (always present) ----
    const overviewCards: Record<string, unknown>[] = [
      {
        type: "custom:bayrol-pool-dashboard-card",
        device_serial: serial,
        ...(prefix ? { entity_prefix: prefix } : {}),
        show_equipment: showEquipment,
      },
    ];

    if (showMessages) {
      overviewCards.push({
        type: "custom:bayrol-pool-messages-card",
        device_serial: serial,
        ...(prefix ? { entity_prefix: prefix } : {}),
      });
    }

    const views: LovelaceViewConfig[] = [
      {
        title: "Vue d'ensemble",
        path: "overview",
        icon: "mdi:pool",
        cards: overviewCards,
      },
    ];

    // ---- Charts view (optional) ----
    if (showCharts) {
      views.push({
        title: "Historique",
        path: "history",
        icon: "mdi:chart-line",
        cards: [
          {
            type: "custom:bayrol-pool-temp-chart-card",
            title: "Température",
            device_serial: serial,
            ...(prefix ? { entity_prefix: prefix } : {}),
          },
          {
            type: "custom:bayrol-pool-chart-card",
            title: "pH",
            device_serial: serial,
            entity_key: "ph",
            unit: "pH",
            color: "#ff9800",
            ...(prefix ? { entity_prefix: prefix } : {}),
          },
          {
            type: "custom:bayrol-pool-chart-card",
            title: "ORP",
            device_serial: serial,
            entity_key: "mv_se",
            unit: "mV",
            color: "#4caf50",
            ...(prefix ? { entity_prefix: prefix } : {}),
          },
        ],
      });
    }

    return {
      title: config.title || "Bayrol Pool Access",
      views,
    };
  }
}

customElements.define(
  "ll-strategy-dashboard-bayrol-pool",
  BayrolPoolDashboardStrategy,
);

export { BayrolPoolDashboardStrategy };
