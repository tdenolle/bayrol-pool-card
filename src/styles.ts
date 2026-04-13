import { css } from "lit";

export const cardStyles = css`
  :host {
    --pool-bg: var(--ha-card-background, var(--card-background-color, white));
    --pool-text: var(--primary-text-color, #212121);
    --pool-text-secondary: var(--secondary-text-color, #727272);
    --pool-border: var(--divider-color, #e0e0e0);
    --pool-accent: var(--primary-color, #03a9f4);
  }

  ha-card {
    padding: 16px;
    overflow: hidden;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .header .title {
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--pool-text);
  }

  .header .subtitle {
    font-size: 0.8rem;
    color: var(--pool-text-secondary);
  }

  .header .status-badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 12px;
    text-transform: uppercase;
  }

  .status-badge.online {
    background: var(--success-color, #4caf50);
    color: white;
  }

  .status-badge.offline {
    background: var(--error-color, #f44336);
    color: white;
  }

  /* Metrics Grid */
  .metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 12px;
    margin-bottom: 16px;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 8px;
    border-radius: 12px;
    background: var(--pool-border);
    background: color-mix(in srgb, var(--pool-text) 5%, transparent);
  }

  .metric .icon {
    font-size: 1.5rem;
    margin-bottom: 4px;
  }

  .metric .label {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--pool-text-secondary);
    margin-bottom: 2px;
  }

  .metric .value {
    font-size: 1.6rem;
    font-weight: 700;
    line-height: 1.1;
  }

  .metric .unit {
    font-size: 0.7rem;
    color: var(--pool-text-secondary);
  }

  .metric .range {
    font-size: 0.65rem;
    color: var(--pool-text-secondary);
    margin-top: 4px;
  }

  /* Equipment Section */
  .equipment {
    border-top: 1px solid var(--pool-border);
    padding-top: 12px;
  }

  .equipment .section-title {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--pool-text-secondary);
    margin-bottom: 8px;
  }

  .eq-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 6px;
  }

  .eq-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 10px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--pool-text) 5%, transparent);
  }

  .eq-item .eq-label {
    font-size: 0.8rem;
    color: var(--pool-text-secondary);
  }

  .eq-item .eq-value {
    font-size: 0.8rem;
    font-weight: 600;
  }

  .eq-item .eq-value.on {
    color: var(--success-color, #4caf50);
  }

  .eq-item .eq-value.off {
    color: var(--pool-text-secondary);
  }

  /* Unavailable state */
  .unavailable {
    color: var(--pool-text-secondary);
    opacity: 0.6;
  }
`;

export const chartCardStyles = css`
  :host {
    --pool-text: var(--primary-text-color, #212121);
    --pool-text-secondary: var(--secondary-text-color, #727272);
    --pool-border: var(--divider-color, #e0e0e0);
    --pool-accent: var(--primary-color, #03a9f4);
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

  .period-selector {
    display: flex;
    gap: 4px;
  }

  .period-btn {
    font-size: 0.75rem;
    padding: 4px 10px;
    border: 1px solid var(--pool-border);
    border-radius: 16px;
    background: transparent;
    color: var(--pool-text-secondary);
    cursor: pointer;
    transition: all 0.2s;
  }

  .period-btn.active {
    background: var(--pool-accent);
    color: white;
    border-color: var(--pool-accent);
  }

  .current-value {
    display: flex;
    align-items: baseline;
    gap: 6px;
    margin-bottom: 12px;
  }

  .current-value .value {
    font-size: 2rem;
    font-weight: 700;
  }

  .current-value .unit {
    font-size: 0.9rem;
    color: var(--pool-text-secondary);
  }

  .current-value .min-max {
    font-size: 0.75rem;
    color: var(--pool-text-secondary);
    margin-left: auto;
  }

  .chart-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .chart-wrapper canvas {
    width: 100% !important;
    height: 100% !important;
  }

  .no-data {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
    color: var(--pool-text-secondary);
    font-size: 0.9rem;
  }
`;
