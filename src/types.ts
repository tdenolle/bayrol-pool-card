/**
 * Home Assistant types used by custom Lovelace cards.
 * Minimal subset — avoids pulling in the full HA frontend dependency.
 */

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  callService(domain: string, service: string, data?: Record<string, unknown>): Promise<void>;
  formatEntityState(entity: HassEntity): string;
  language: string;
  themes: HassThemes;
  config: HassConfig;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed: string;
  last_updated: string;
}

export interface HassThemes {
  default_theme: string;
  themes: Record<string, Record<string, string>>;
}

export interface HassConfig {
  unit_system: {
    temperature: string;
    length: string;
    mass: string;
    volume: string;
  };
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
  getCardSize?(): number;
}

export interface LovelaceCardConfig {
  type: string;
  [key: string]: unknown;
}

export interface LovelaceCardEditor extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: LovelaceCardConfig): void;
}
