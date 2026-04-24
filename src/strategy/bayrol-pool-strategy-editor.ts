/**
 * Visual config editor for the Bayrol Pool dashboard strategy.
 *
 * Rendered in the HA "Edit dashboard" dialog when the user picks
 * the bayrol-pool strategy. Lets them set device_serial and toggle
 * sections without touching YAML.
 */

import { LitElement, html, css, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant } from "../types";
import { BayrolPoolStrategyConfig } from "./bayrol-pool-strategy";

@customElement("bayrol-pool-strategy-editor")
export class BayrolPoolStrategyEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
    .row {
      padding: 8px 0;
    }
    ha-textfield {
      width: 100%;
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: BayrolPoolStrategyConfig = { type: "custom:bayrol-pool" };

  public setConfig(config: BayrolPoolStrategyConfig): void {
    this._config = config;
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

  protected render(): TemplateResult {
    return html`
      <div>
        <div class="row">
          <ha-textfield
            label="Numéro de série du device"
            .value="${this._config.device_serial || ""}"
            .configValue="${"device_serial"}"
            @input="${this._valueChanged}"
            helper="Laissez vide pour auto-détection"
          ></ha-textfield>
        </div>
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
