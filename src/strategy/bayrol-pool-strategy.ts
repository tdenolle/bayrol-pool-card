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

/**
 * Auto-detect a Bayrol Pool Access device serial from HA entity states.
 * Looks for sensor entities whose entity_id contains "bayrol" or typical
 * bayrol keys like "_ph" / "_temperature" with a numeric serial-like suffix.
 */
function detectDeviceSerial(hass: HomeAssistant): string | undefined {
  // Look for entities matching the pattern sensor.<prefix>_<serial>_<key>
  // e.g. sensor.bayrol_1234567_temperature
  const pattern = /^sensor\.(.+?)_(\d{5,})_(temperature|ph|mv_se|salt|status)$/;
  for (const entityId of Object.keys(hass.states)) {
    const m = entityId.match(pattern);
    if (m) {
      return m[2];
    }
  }
  return undefined;
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
    const serial = config.device_serial || detectDeviceSerial(hass) || "";
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
