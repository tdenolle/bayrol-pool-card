import { LitElement, html, css, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { HomeAssistant, HassEntity, LovelaceCardConfig } from "./types";
import { findEntityByKey, parseNumericState } from "./utils";

interface BayrolPoolTempChartConfig extends LovelaceCardConfig {
  title?: string;
  device_serial: string;
  entity_prefix?: string;
  color?: string;
  filtration_off_color?: string;
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

interface FiltrationRange {
  start: number;
  end: number;
}

@customElement("bayrol-pool-temp-chart-card")
export class BayrolPoolTempChartCard extends LitElement {
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

    .title {
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--pool-text);
    }

    .period-selector {
      display: flex;
      gap: 4px;
    }

    .period-btn {
      background: none;
      border: 1px solid var(--divider-color, #e0e0e0);
      border-radius: 12px;
      padding: 4px 10px;
      font-size: 0.75rem;
      cursor: pointer;
      color: var(--pool-text-secondary);
      transition: all 0.2s;
    }

    .period-btn.active {
      background: var(--primary-color, #03a9f4);
      color: white;
      border-color: var(--primary-color, #03a9f4);
    }

    .current-value {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 12px;
    }

    .value {
      font-size: 2rem;
      font-weight: 600;
    }

    .unit {
      font-size: 1rem;
      color: var(--pool-text-secondary);
    }

    .min-max {
      font-size: 0.8rem;
      color: var(--pool-text-secondary);
      margin-left: 8px;
    }

    .chart-wrapper {
      position: relative;
      height: 200px;
    }

    .no-data {
      height: 200px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--pool-text-secondary);
    }

    .legend {
      display: flex;
      gap: 16px;
      margin-top: 8px;
      font-size: 0.75rem;
      color: var(--pool-text-secondary);
    }

    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .legend-swatch {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
  `;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: BayrolPoolTempChartConfig;
  @state() private _period: Period = "24h";
  @state() private _tempHistory: HistoryPoint[] = [];
  @state() private _filtrationOffRanges: FiltrationRange[] = [];
  @state() private _loading = false;

  private _canvas?: HTMLCanvasElement;
  private _chart?: unknown;
  private _fetchTimer?: number;

  public setConfig(config: BayrolPoolTempChartConfig): void {
    if (!config.device_serial) {
      throw new Error("Configuration requise : 'device_serial'");
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 4;
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._fetchHistory();
    this._fetchTimer = window.setInterval(() => this._fetchHistory(), 300000);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._fetchTimer) {
      clearInterval(this._fetchTimer);
    }
  }

  private _getEntityId(key: string, domain = "sensor"): string {
    if (!this._config || !this.hass) return "";
    const prefix = this._config.entity_prefix;
    if (prefix) {
      return `${domain}.${prefix}_${key}`;
    }
    return findEntityByKey(this.hass.states, this._config.device_serial, key, domain) || "";
  }

  private _getTempEntity(): HassEntity | undefined {
    if (!this.hass) return undefined;
    const id = this._getEntityId("temperature");
    return id ? this.hass.states[id] : undefined;
  }

  private async _fetchHistory(): Promise<void> {
    if (!this.hass || !this._config) return;

    const tempEntityId = this._getEntityId("temperature");
    const flowEntityId = this._getEntityId("flow_in");
    const hours = PERIOD_HOURS[this._period];
    const startTime = new Date(Date.now() - hours * 3600000).toISOString();

    this._loading = true;

    const callApi = (this.hass as HomeAssistant & {
      callApi(method: string, path: string): Promise<unknown[][]>;
    }).callApi.bind(this.hass);

    try {
      // Fetch both histories in parallel
      const entityIds = flowEntityId
        ? `${tempEntityId},${flowEntityId}`
        : tempEntityId;
      const url = `history/period/${startTime}?filter_entity_id=${entityIds}&minimal_response&no_attributes`;
      const response = await callApi("GET", url);

      // Parse temperature
      if (response && response.length > 0) {
        const tempEntries = response.find((arr) => {
          const entries = arr as Array<Record<string, unknown>>;
          return entries.length > 0 && (entries[0].entity_id as string)?.includes("temperature");
        }) as Array<Record<string, unknown>> | undefined;

        if (tempEntries) {
          this._tempHistory = tempEntries
            .filter((e) => e.state !== "unknown" && e.state !== "unavailable")
            .map((e) => ({
              x: new Date(e.last_changed as string).getTime(),
              y: parseFloat(e.state as string),
            }))
            .filter((p) => !isNaN(p.y));
        } else {
          this._tempHistory = [];
        }

        // Parse flow_in (on/off) → extract OFF ranges
        const flowEntries = response.find((arr) => {
          const entries = arr as Array<Record<string, unknown>>;
          return entries.length > 0 && (entries[0].entity_id as string)?.includes("flow_in");
        }) as Array<Record<string, unknown>> | undefined;

        this._filtrationOffRanges = flowEntries
          ? this._computeOffRanges(flowEntries)
          : [];
      }
    } catch (_err) {
      this._tempHistory = [];
      this._filtrationOffRanges = [];
    }

    this._loading = false;
    this._renderChart();
  }

  /**
   * Given flow_in state changes (on/off), compute time ranges where filtration was OFF.
   */
  private _computeOffRanges(entries: Array<Record<string, unknown>>): FiltrationRange[] {
    const ranges: FiltrationRange[] = [];
    let offStart: number | null = null;
    const now = Date.now();

    for (const entry of entries) {
      const time = new Date(entry.last_changed as string).getTime();
      const state = (entry.state as string)?.toLowerCase();

      if (state === "off" || state === "unavailable" || state === "unknown") {
        if (offStart === null) {
          offStart = time;
        }
      } else if (state === "on") {
        if (offStart !== null) {
          ranges.push({ start: offStart, end: time });
          offStart = null;
        }
      }
    }

    // If still off at end of data, extend to now
    if (offStart !== null) {
      ranges.push({ start: offStart, end: now });
    }

    return ranges;
  }

  private _setPeriod(period: Period): void {
    this._period = period;
    this._fetchHistory();
  }

  private async _renderChart(): Promise<void> {
    await this.updateComplete;
    this._canvas = this.shadowRoot?.querySelector("canvas") as HTMLCanvasElement | undefined;
    if (!this._canvas || this._tempHistory.length === 0) return;

    const color = this._config?.color || "#03a9f4";
    const offColor = this._config?.filtration_off_color || "rgba(244, 67, 54, 0.15)";

    // Load Chart.js if needed
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

    // Build box annotations for filtration OFF ranges
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotations: Record<string, any> = {};
    this._filtrationOffRanges.forEach((range, i) => {
      annotations[`offRange${i}`] = {
        type: "box",
        xMin: range.start,
        xMax: range.end,
        backgroundColor: offColor,
        borderWidth: 0,
        label: {
          display: false,
        },
      };
    });

    // Register annotation plugin if available
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const annotationPlugin = (window as unknown as Record<string, any>).ChartAnnotation;
    if (annotationPlugin) {
      ChartCtor.register(annotationPlugin);
    }

    this._chart = new ChartCtor(this._canvas, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Température",
            data: this._tempHistory,
            borderColor: color,
            backgroundColor: `${color}22`,
            borderWidth: 1.5,
            fill: false,
            tension: 0,
            stepped: "before",
            pointRadius: 0,
            pointHitRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              afterBody: (context: any[]) => {
                if (!context.length) return "";
                const x = context[0].parsed.x;
                const isOff = this._filtrationOffRanges.some(
                  (r) => x >= r.start && x <= r.end
                );
                return isOff ? "⚠ Filtration arrêtée" : "✓ Filtration active";
              },
            },
          },
          annotation: {
            annotations,
          },
        },
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
            ticks: { color: "#999", callback: (value: number) => `${value}°C` },
          },
        },
      },
    });
  }

  private _loadChartJs(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js";
      script.onload = () => {
        // Date adapter
        const adapter = document.createElement("script");
        adapter.src =
          "https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns@3/dist/chartjs-adapter-date-fns.bundle.min.js";
        adapter.onload = () => {
          // Annotation plugin for background ranges
          const annotation = document.createElement("script");
          annotation.src =
            "https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3/dist/chartjs-plugin-annotation.min.js";
          annotation.onload = () => {
            // Store reference for registration
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const win = window as unknown as Record<string, any>;
            if (win["chartjs-plugin-annotation"]) {
              win.ChartAnnotation = win["chartjs-plugin-annotation"];
            }
            resolve();
          };
          annotation.onerror = () => {
            // Annotation is optional — chart works without it, just no background shading
            resolve();
          };
          document.head.appendChild(annotation);
        };
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

    const entity = this._getTempEntity();
    const numValue = entity ? parseNumericState(entity.state) : null;
    const title = this._config.title || "Température";
    const unit = (entity?.attributes.unit_of_measurement as string) || "°C";

    // Compute min/max from actual history data
    const dataMin = this._tempHistory.length > 0 ? Math.min(...this._tempHistory.map((p) => p.y)).toFixed(1) : undefined;
    const dataMax = this._tempHistory.length > 0 ? Math.max(...this._tempHistory.map((p) => p.y)).toFixed(1) : undefined;

    // Check current filtration state
    const flowId = this._getEntityId("flow_in");
    const flowEntity = flowId ? this.hass.states[flowId] : undefined;
    const filtrationOn = flowEntity?.state?.toLowerCase() === "on";

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
          <span class="value" style="color: ${filtrationOn ? "var(--pool-text)" : "var(--warning-color, #ff9800)"}">
            ${numValue !== null ? numValue : "--"}
          </span>
          ${unit ? html`<span class="unit">${unit}</span>` : nothing}
          ${!filtrationOn && numValue !== null
            ? html`<span class="min-max" style="color: var(--warning-color, #ff9800)">⚠ Filtration arrêtée</span>`
            : nothing}
          ${dataMin !== undefined && dataMax !== undefined
            ? html`<span class="min-max">Min: ${dataMin} — Max: ${dataMax}</span>`
            : nothing}
        </div>

        ${this._tempHistory.length > 0
          ? html`<div class="chart-wrapper"><canvas></canvas></div>`
          : html`<div class="no-data">${this._loading ? "Chargement..." : "Aucune donnée"}</div>`}

        <div class="legend">
          <div class="legend-item">
            <div class="legend-swatch" style="background: ${this._config.color || "#03a9f4"}"></div>
            <span>Température</span>
          </div>
          <div class="legend-item">
            <div class="legend-swatch" style="background: ${this._config.filtration_off_color || "rgba(244, 67, 54, 0.3)"}"></div>
            <span>Filtration arrêtée</span>
          </div>
        </div>
      </ha-card>
    `;
  }

  static getStubConfig(): Record<string, unknown> {
    return { device_serial: "", title: "Température" };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "bayrol-pool-temp-chart-card": BayrolPoolTempChartCard;
  }
}
