/**
 * Visual config editor for the Bayrol Pool dashboard strategy.
 *
 * Rendered in the HA "Edit dashboard" dialog when the user picks
 * the bayrol-pool strategy. Lets them set device_serial and toggle
 * sections without touching YAML.
 */

import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../types";
import { BayrolPoolStrategyConfig, BayrolDevice, detectBayrolDevices } from "./bayrol-pool-strategy";

@customElement("bayrol-pool-strategy-editor")
export class BayrolPoolStrategyEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .row {
      padding: 8px 0;
    }
    ha-textfield,
    ha-select {
      width: 100%;
    }
    .manual-input {
      margin-top: 4px;
    }
    .hint {
      font-size: 0.85em;
      color: var(--secondary-text-color, #727272);
      margin-top: 4px;
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: BayrolPoolStrategyConfig = { type: "custom:bayrol-pool" };
  @state() private _devices: BayrolDevice[] = [];
  @state() private _manualSerial = false;

  public setConfig(config: BayrolPoolStrategyConfig): void {
    this._config = config;
    this._refreshDevices();
  }

  updated(changedProps: Map<string, unknown>): void {
    if (changedProps.has("hass")) {
      this._refreshDevices();
    }
  }

  private _refreshDevices(): void {
    if (!this.hass) return;
    this._devices = detectBayrolDevices(this.hass);
    // If current serial isn't in the detected list and is set, show manual mode
    if (
      this._config.device_serial &&
      !this._devices.some((d) => d.serial === this._config.device_serial)
    ) {
      this._manualSerial = true;
    }
  }

  private _dispatchChanged(): void {
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: this._config },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _deviceSelected(ev: Event): void {
    const value = (ev.target as HTMLSelectElement).value;
    if (value === "__manual__") {
      this._manualSerial = true;
      return;
    }
    this._manualSerial = false;
    this._config = { ...this._config, device_serial: value };
    this._dispatchChanged();
  }

  private _valueChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const key = target.configValue as string;
    if (!key) return;
    const value = target.type === "checkbox" ? target.checked : target.value;
    this._config = { ...this._config, [key]: value };
    this._dispatchChanged();
  }

  private _switchChanged(ev: Event): void {
    const target = ev.target as HTMLInputElement;
    const key = target.configValue as string;
    if (!key) return;
    this._config = { ...this._config, [key]: (target as unknown as { checked: boolean }).checked };
    this._dispatchChanged();
  }

  private _renderDevicePicker(): TemplateResult {
    const currentSerial = this._config.device_serial || "";

    if (this._devices.length === 0) {
      // No devices detected — show manual input only
      return html`
        <div class="row">
          <ha-textfield
            label="Numéro de série du device"
            .value="${currentSerial}"
            .configValue="${"device_serial"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
          <div class="hint">Aucun appareil Bayrol détecté. Saisissez le numéro de série manuellement.</div>
        </div>
      `;
    }

    return html`
      <div class="row">
        <ha-select
          label="Appareil Bayrol"
          .value="${this._manualSerial ? "__manual__" : currentSerial}"
          @selected="${this._deviceSelected}"
          @closed="${(ev: Event) => ev.stopPropagation()}"
          fixedMenuPosition
        >
          ${this._devices.map(
            (d) => html`
              <ha-list-item .value="${d.serial}">
                ${d.label}
              </ha-list-item>
            `,
          )}
          <ha-list-item value="__manual__">Saisie manuelle…</ha-list-item>
        </ha-select>
      </div>
      ${this._manualSerial
        ? html`
            <div class="row manual-input">
              <ha-textfield
                label="Numéro de série"
                .value="${currentSerial}"
                .configValue="${"device_serial"}"
                @input="${this._valueChanged}"
              ></ha-textfield>
            </div>
          `
        : nothing}
    `;
  }

  protected render(): TemplateResult {
    return html`
      <div>
        ${this._renderDevicePicker()}
        <div class="row">
          <ha-textfield
            label="Préfixe entité (optionnel)"
            .value="${this._config.entity_prefix || ""}"
            .configValue="${"entity_prefix"}"
            @input="${this._valueChanged}"
          ></ha-textfield>
        </div>
        <div class="row">
          <ha-formfield label="Afficher les équipements">
            <ha-switch
              .checked="${this._config.show_equipment !== false}"
              .configValue="${"show_equipment"}"
              @change="${this._switchChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="row">
          <ha-formfield label="Afficher les graphiques">
            <ha-switch
              .checked="${this._config.show_charts !== false}"
              .configValue="${"show_charts"}"
              @change="${this._switchChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
        <div class="row">
          <ha-formfield label="Afficher les messages / alertes">
            <ha-switch
              .checked="${this._config.show_messages !== false}"
              .configValue="${"show_messages"}"
              @change="${this._switchChanged}"
            ></ha-switch>
          </ha-formfield>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bayrol-pool-strategy-editor": BayrolPoolStrategyEditor;
  }
}
