import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, HassEntity, LovelaceCardConfig } from "./types";
import { findEntityByKey } from "./utils";

interface BayrolPoolMessagesConfig extends LovelaceCardConfig {
  title?: string;
  device_serial: string;
  entity_prefix?: string;
  entity_id?: string;
}

interface PoolMessage {
  key: string;
  type: "warning" | "info" | "success" | "error";
  message: string;
}

@customElement("bayrol-pool-messages-card")
export class BayrolPoolMessagesCard extends LitElement {
  static styles = css`
    :host {
      --pool-text: var(--primary-text-color, #212121);
      --pool-text-secondary: var(--secondary-text-color, #727272);
    }

    ha-card {
      padding: 16px;
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 12px;
    }

    .header .title {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--pool-text);
    }

    .header .count {
      font-size: 0.8rem;
      color: var(--pool-text-secondary);
      background: color-mix(in srgb, var(--pool-text) 8%, transparent);
      padding: 2px 10px;
      border-radius: 12px;
    }

    .messages {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .empty {
      text-align: center;
      color: var(--pool-text-secondary);
      font-size: 0.9rem;
      padding: 16px;
    }

    .empty ha-icon {
      display: block;
      margin-bottom: 8px;
      --mdc-icon-size: 32px;
      color: var(--success-color, #4caf50);
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolMessagesConfig;

  public setConfig(config: BayrolPoolMessagesConfig): void {
    if (!config.device_serial && !config.entity_id) {
      throw new Error("Configuration requise : 'device_serial' ou 'entity_id'");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 3;
  }

  private _getEntity(): HassEntity | undefined {
    if (!this.hass || !this._config) return undefined;
    if (this._config.entity_id) {
      return this.hass.states[this._config.entity_id];
    }
    const prefix = this._config.entity_prefix;
    if (prefix) {
      return this.hass.states[`sensor.${prefix}_messages`];
    }
    const entityId = findEntityByKey(this.hass.states, this._config.device_serial, "messages", "sensor");
    return entityId ? this.hass.states[entityId] : undefined;
  }

  private _getMessages(): PoolMessage[] {
    const entity = this._getEntity();
    if (!entity) return [];
    const data = entity.attributes["data"] as PoolMessage[] | undefined;
    if (!data || !Array.isArray(data)) return [];
    return data;
  }

  private _renderMessage(msg: PoolMessage): TemplateResult {
    // Map to ha-alert types: warning, info, success, error
    const alertType = msg.type || "info";
    return html`<ha-alert alert-type="${alertType}">${msg.message}</ha-alert>`;
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html`<ha-card><div>Chargement...</div></ha-card>`;
    }

    const title = this._config.title || "Messages";
    const messages = this._getMessages();

    return html`
      <ha-card>
        <div class="header">
          <span class="title">${title}</span>
          ${messages.length > 0
            ? html`<span class="count">${messages.length}</span>`
            : nothing}
        </div>
        ${messages.length > 0
          ? html`<div class="messages">${messages.map((m) => this._renderMessage(m))}</div>`
          : html`
              <div class="empty">
                <ha-icon icon="mdi:check-circle-outline"></ha-icon>
                Aucun message
              </div>
            `}
      </ha-card>
    `;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("bayrol-pool-messages-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return { device_serial: "" };
  }
}

// --- Visual Config Editor ---
@customElement("bayrol-pool-messages-editor")
export class BayrolPoolMessagesEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolMessagesConfig;

  public setConfig(config: BayrolPoolMessagesConfig): void {
    this._config = config;
  }

  private _valueChanged(ev: Event): void {
    if (!this._config) return;
    const target = ev.target as HTMLInputElement;
    const key = target.configValue as string;
    const newConfig = { ...this._config, [key]: target.value };
    this.dispatchEvent(
      new CustomEvent("config-changed", { detail: { config: newConfig } })
    );
  }

  protected render(): TemplateResult {
    if (!this._config) return html``;
    return html`
      <div style="padding: 16px;">
        <ha-textfield
          label="Titre (optionnel)"
          .value="${this._config.title || ""}"
          .configValue="${"title"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Numéro de série du device"
          .value="${this._config.device_serial || ""}"
          .configValue="${"device_serial"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Entity ID (optionnel, override)"
          .value="${this._config.entity_id || ""}"
          .configValue="${"entity_id"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bayrol-pool-messages-card": BayrolPoolMessagesCard;
    "bayrol-pool-messages-editor": BayrolPoolMessagesEditor;
  }
}
