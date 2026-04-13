import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { chartCardStyles } from "./styles";
import { HomeAssistant, HassEntity, LovelaceCardConfig } from "./types";
import { findEntityByKey, parseNumericState, getPhColor, getOrpColor } from "./utils";

interface BayrolPoolChartConfig extends LovelaceCardConfig {
  title?: string;
  device_serial: string;
  entity_key: string;
  entity_prefix?: string;
  entity_domain?: string;
  unit?: string;
  color?: string;
  hours_to_show?: number;
}

type Period = "6h" | "24h" | "7d" | "30d";

const PERIOD_HOURS: Record<Period, number> = {
  "6h": 6,
  "24h": 24,
  "7d": 168,
  "30d": 720,
};

interface HistoryPoint {
  x: number;
  y: number;
}

@customElement("bayrol-pool-chart-card")
export class BayrolPoolChartCard extends LitElement {
  static styles = chartCardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolChartConfig;
  @state() private _period: Period = "24h";
  @state() private _history: HistoryPoint[] = [];
  @state() private _loading = false;

  private _canvas?: HTMLCanvasElement;
  private _chart?: unknown; // Chart.js instance
  private _fetchTimer?: number;

  public setConfig(config: BayrolPoolChartConfig): void {
    if (!config.device_serial || !config.entity_key) {
      throw new Error("Configuration requise : 'device_serial' et 'entity_key'");
    }
    this._config = {
      hours_to_show: 24,
      ...config,
    };
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._fetchHistory();
    // Refresh every 5 minutes
    this._fetchTimer = window.setInterval(() => this._fetchHistory(), 300000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._fetchTimer) {
      clearInterval(this._fetchTimer);
    }
  }

  private _getEntityId(): string {
    if (!this._config || !this.hass) return "";
    // Allow direct entity_id override
    if (this._config.entity_id) return this._config.entity_id as string;
    const prefix = this._config.entity_prefix;
    const domain = this._config.entity_domain || "sensor";
    if (prefix) {
      return `${domain}.${prefix}_${this._config.entity_key}`;
    }
    // Auto-detect from device_serial
    return findEntityByKey(this.hass.states, this._config.device_serial, this._config.entity_key, domain) || "";
  }

  private _getEntity(): HassEntity | undefined {
    if (!this.hass) return undefined;
    const id = this._getEntityId();
    return id ? this.hass.states[id] : undefined;
  }

  private async _fetchHistory(): Promise<void> {
    if (!this.hass || !this._config) return;

    const entityId = this._getEntityId();
    const hours = PERIOD_HOURS[this._period];
    const startTime = new Date(Date.now() - hours * 3600000).toISOString();

    this._loading = true;

    try {
      const url = `history/period/${startTime}?filter_entity_id=${entityId}&minimal_response&no_attributes`;
      const response = await (this.hass as HomeAssistant & { callApi(method: string, path: string): Promise<unknown[][]> }).callApi("GET", url);

      if (response && response.length > 0 && response[0]) {
        const entries = response[0] as Array<Record<string, unknown>>;
        this._history = entries
          .filter((entry) => entry.state !== "unknown" && entry.state !== "unavailable")
          .map((entry) => ({
            x: new Date(entry.last_changed as string).getTime(),
            y: parseFloat(entry.state as string),
          }))
          .filter((p) => !isNaN(p.y));
      } else {
        this._history = [];
      }
    } catch (_err) {
      this._history = [];
    }

    this._loading = false;
    this._renderChart();
  }

  private _setPeriod(period: Period): void {
    this._period = period;
    this._fetchHistory();
  }

  private async _renderChart(): Promise<void> {
    await this.updateComplete;
    this._canvas = this.shadowRoot?.querySelector("canvas") as HTMLCanvasElement | undefined;
    if (!this._canvas || this._history.length === 0) return;

    const color = this._config?.color || "var(--primary-color, #03a9f4)";

    // Dynamically load Chart.js if not yet loaded
    if (!(window as unknown as Record<string, unknown>).Chart) {
      await this._loadChartJs();
    }

    const Chart = (window as unknown as Record<string, unknown>).Chart as unknown;
    if (!Chart) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ChartCtor = Chart as any;

    if (this._chart) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this._chart as any).destroy();
    }

    this._chart = new ChartCtor(this._canvas, {
      type: "line",
      data: {
        datasets: [
          {
            data: this._history,
            borderColor: color,
            backgroundColor: `${color}22`,
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHitRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          x: {
            type: "time",
            time: {
              tooltipFormat: "dd/MM HH:mm",
              displayFormats: { minute: "HH:mm", hour: "HH:mm", day: "dd/MM" },
            },
            grid: { display: false },
            ticks: { maxTicksLimit: 8, color: "#999" },
          },
          y: {
            grid: { color: "rgba(0,0,0,0.06)" },
            ticks: { color: "#999" },
          },
        },
      },
    });
  }

  private _loadChartJs(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Chart.js
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js";
      script.onload = () => {
        // Date adapter
        const adapter = document.createElement("script");
        adapter.src =
          "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js";
        adapter.onload = () => resolve();
        adapter.onerror = () => reject(new Error("Failed to load chart adapter"));
        document.head.appendChild(adapter);
      };
      script.onerror = () => reject(new Error("Failed to load Chart.js"));
      document.head.appendChild(script);
    });
  }

  protected render(): TemplateResult {
    if (!this._config || !this.hass) {
      return html`<ha-card><div>Chargement...</div></ha-card>`;
    }

    const entity = this._getEntity();
    const numValue = entity ? parseNumericState(entity.state) : null;
    const title = this._config.title || this._config.entity_key;
    const unit = this._config.unit || (entity?.attributes.unit_of_measurement as string) || "";

    // Color based on entity type
    let valueColor = "var(--pool-text)";
    if (numValue !== null) {
      if (this._config.entity_key === "ph") valueColor = getPhColor(numValue);
      else if (this._config.entity_key === "mv_se") valueColor = getOrpColor(numValue);
    }

    const min = entity?.attributes["min"] as string | undefined;
    const max = entity?.attributes["max"] as string | undefined;

    return html`
      <ha-card>
        <div class="header">
          <span class="title">${title}</span>
          <div class="period-selector">
            ${(["6h", "24h", "7d", "30d"] as Period[]).map(
              (p) => html`
                <button
                  class="period-btn ${this._period === p ? "active" : ""}"
                  @click="${() => this._setPeriod(p)}"
                >
                  ${p}
                </button>
              `
            )}
          </div>
        </div>

        <div class="current-value">
          <span class="value" style="color: ${valueColor}">
            ${numValue !== null ? numValue : "--"}
          </span>
          ${unit ? html`<span class="unit">${unit}</span>` : nothing}
          ${min !== undefined && max !== undefined
            ? html`<span class="min-max">Min: ${min} — Max: ${max}</span>`
            : nothing}
        </div>

        ${this._history.length > 0
          ? html`<div class="chart-wrapper"><canvas></canvas></div>`
          : html`<div class="no-data">${this._loading ? "Chargement..." : "Aucune donnée"}</div>`}
      </ha-card>
    `;
  }

  static getConfigElement(): HTMLElement {
    return document.createElement("bayrol-pool-chart-editor");
  }

  static getStubConfig(): Record<string, unknown> {
    return { device_serial: "", entity_key: "temperature", hours_to_show: 24 };
  }
}

// --- Visual Config Editor ---
@customElement("bayrol-pool-chart-editor")
export class BayrolPoolChartEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolChartConfig;

  public setConfig(config: BayrolPoolChartConfig): void {
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
          label="Numéro de série du device (requis)"
          .value="${this._config.device_serial || ""}"
          .configValue="${"device_serial"}"
          @input="${this._valueChanged}"
          required
        ></ha-textfield>
        <ha-textfield
          label="Clé entité (ex: temperature, ph, mv_se)"
          .value="${this._config.entity_key || ""}"
          .configValue="${"entity_key"}"
          @input="${this._valueChanged}"
          required
        ></ha-textfield>
        <ha-textfield
          label="Unité (optionnel)"
          .value="${this._config.unit || ""}"
          .configValue="${"unit"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
        <ha-textfield
          label="Couleur (optionnel, ex: #4fc3f7)"
          .value="${this._config.color || ""}"
          .configValue="${"color"}"
          @input="${this._valueChanged}"
        ></ha-textfield>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bayrol-pool-chart-card": BayrolPoolChartCard;
    "bayrol-pool-chart-editor": BayrolPoolChartEditor;
  }
}
