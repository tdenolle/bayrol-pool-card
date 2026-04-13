import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "./styles";
import { HomeAssistant, HassEntity, LovelaceCardConfig } from "./types";
import { findEntityByKey, parseNumericState, getPhColor, getOrpColor } from "./utils";

interface BayrolPoolDashboardConfig extends LovelaceCardConfig {
  title?: string;
  device_serial: string;
  entity_prefix?: string;
  show_equipment?: boolean;
}

interface MetricConfig {
  key: string;
  label: string;
  icon: string;
  unit?: string;
  domain?: string;
  color_fn?: (value: number) => string;
}

const METRICS: MetricConfig[] = [
  { key: "temperature", label: "Température", icon: "mdi:thermometer-water", unit: "°C" },
  { key: "ph", label: "pH", icon: "mdi:ph", unit: "pH", color_fn: getPhColor },
  { key: "mv_se", label: "ORP", icon: "mdi:water-opacity", unit: "mV", color_fn: getOrpColor },
  { key: "salt", label: "Sel", icon: "mdi:shaker-outline", unit: "g/L" },
];

const EQUIPMENT: { key: string; label: string; domain: string }[] = [
  { key: "se_on_off", label: "Électrolyse", domain: "switch" },
  { key: "ph_on_off", label: "Régulation pH", domain: "switch" },
  { key: "mv_on_off", label: "Régulation ORP", domain: "switch" },
  { key: "se_activate_boost", label: "Boost", domain: "switch" },
  { key: "filtration_mode", label: "Filtration", domain: "select" },
];

@customElement("bayrol-pool-dashboard-card")
export class BayrolPoolDashboardCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolDashboardConfig;

  public setConfig(config: BayrolPoolDashboardConfig): void {
    if (!config.device_serial) {
      throw new Error("Configuration requise : 'device_serial'");
    }
    this._config = {
      show_equipment: true,
      ...config,
    };
  }

  public getCardSize(): number {
    return this._config?.show_equipment ? 5 : 3;
  }

  private _getEntity(key: string, domain = "sensor"): HassEntity | undefined {
    if (!this.hass || !this._config) return undefined;
    // Allow full override via entities map
    const entities = this._config.entities as Record<string, string> | undefined;
    if (entities && entities[key]) {
      return this.hass.states[entities[key]];
    }
    // Allow override via entity_prefix
    const prefix = this._config.entity_prefix;
    if (prefix) {
      return this.hass.states[`${domain}.${prefix}_${key}`];
    }
    // Auto-detect from device_serial
    const entityId = findEntityByKey(this.hass.states, this._config.device_serial, key, domain);
    return entityId ? this.hass.states[entityId] : undefined;
  }

  private _isOnline(): boolean {
    const status = this._getEntity("status");
    if (!status) return false;
    return status.state === "Online";
  }

  private _renderMetric(metric: MetricConfig): TemplateResult {
    const entity = this._getEntity(metric.key, metric.domain || "sensor");
    const numValue = entity ? parseNumericState(entity.state) : null;
    const available = numValue !== null;
    const valueStr = available ? numValue.toString() : "--";
    const color = available && metric.color_fn ? metric.color_fn(numValue) : "var(--pool-text)";

    const min = entity?.attributes["min"] as string | undefined;
    const max = entity?.attributes["max"] as string | undefined;
    const rangeStr = min !== undefined && max !== undefined ? `${min} — ${max}` : "";

    return html`
      <div class="metric">
        <ha-icon class="icon" icon="${metric.icon}"></ha-icon>
        <span class="label">${metric.label}</span>
        <span class="value ${available ? "" : "unavailable"}" style="color: ${color}">${valueStr}</span>
        ${metric.unit ? html`<span class="unit">${metric.unit}</span>` : nothing}
        ${rangeStr ? html`<span class="range">${rangeStr}</span>` : nothing}
      </div>
    `;
  }

  private _renderEquipmentItem(eq: { key: string; label: string; domain: string }): TemplateResult {
    const entity = this._getEntity(eq.key, eq.domain);
    let valueStr = "--";
    let cssClass = "";

    if (entity) {
      const s = entity.state;
      if (s === "on" || s === "ON") {
        valueStr = "ON";
        cssClass = "on";
      } else if (s === "off" || s === "OFF") {
        valueStr = "OFF";
        cssClass = "off";
      } else {
        valueStr = s;
      }
    }

    return html`
      <div class="eq-item">
        <span class="eq-label">${eq.label}</span>
        <span class="eq-value ${cssClass}">${valueStr}</span>
      </div>
    `;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html`<ha-card><div>Chargement...</div></ha-card>`;
    }

    const title = this._config.title || "Bayrol Pool Access";
    const online = this._isOnline();

    return html`
      <ha-card>
        <div class="header">
          <div>
            <div class="title">${title}</div>
            <div class="subtitle">${this._config.device_serial}</div>
          </div>
          <span class="status-badge ${online ? "online" : "offline"}">
            ${online ? "En ligne" : "Hors ligne"}
          </span>
        </div>

        <div class="metrics">
          ${METRICS.map((m) => this._renderMetric(m))}
        </div>

        ${this._config.show_equipment
          ? html`
              <div class="equipment">
                <div class="section-title">Équipements</div>
                <div class="eq-grid">
                  ${EQUIPMENT.map((eq) => this._renderEquipmentItem(eq))}
                </div>
              </div>
            `
          : nothing}
      </ha-card>
    `;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("bayrol-pool-dashboard-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return { device_serial: "", show_equipment: true };
  }
}

// --- Visual Config Editor ---
@customElement("bayrol-pool-dashboard-editor")
export class BayrolPoolDashboardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolDashboardConfig;

  public setConfig(config: BayrolPoolDashboardConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config) return;
    const target = ev.target as HTMLInputElement;
    const key = target.configValue as string;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const newConfig = { ...this._config, [key]: value };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: newConfig } })
    );
  }

  protected render(): TemplateResult {
    if (!this._config) {
      return html``;
    }
    return html`
      <div style="padding: 16px;">
        <ha-textfield
          label="Titre (optionnel)"
          .value="${this._config.title || ""}"
          .configValue="${"title"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Numéro de série du device (requis)"
          .value="${this._config.device_serial || ""}"
          .configValue="${"device_serial"}"
          @input="${this._valueChanged}"
          required
        ></ha-textfield>
        <ha-textfield
          label="Préfixe entité (optionnel)"
          .value="${this._config.entity_prefix || ""}"
          .configValue="${"entity_prefix"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-formfield label="Afficher les équipements">
          <ha-switch
            .checked="${this._config.show_equipment !== false}"
            .configValue="${"show_equipment"}"
            @change="${this._valueChanged}"
          ></ha-switch>
        </ha-formfield>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bayrol-pool-dashboard-card": BayrolPoolDashboardCard;
    "bayrol-pool-dashboard-editor": BayrolPoolDashboardEditor;
  }

  interface HTMLInputElement {
    configValue?: string;
  }
}
