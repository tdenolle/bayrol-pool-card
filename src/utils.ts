/**
 * Default entity ID suffix mappings for Bayrol Pool Access entities.
 * These match the keys defined in entities.json of the bayrol-poolaccess-mqtt addon.
 */

export const POOL_ENTITY_KEYS = {
  temperature: "temperature",
  ph: "ph",
  orp: "mv_se",
  salt: "salt",
  status: "status",
  flow: "flow_in",
  seOnOff: "se_on_off",
  phOnOff: "ph_on_off",
  orpOnOff: "mv_on_off",
  boost: "se_activate_boost",
  filtration: "filtration_mode",
  heater: "heater_hvac",
  phDosRate: "ph_dos_rate",
  orpDosRate: "mv_dos_rate",
  seProductionRate: "se_production_rate",
} as const;

export type PoolEntityKey = keyof typeof POOL_ENTITY_KEYS;

/**
 * Normalize a string the same way as the Python bridge's norm() function.
 * Removes all non-alphanumeric characters (including - and _) and lowercases.
 */
export function norm(s: string): string {
  return s.replace(/[\W_]/g, "").toLowerCase();
}

/**
 * Build a full HA entity_id from the device serial and a pool entity key.
 * Matches the unique_id format from bayrol-poolaccess-mqtt:
 *   unique_id = norm(manufacturer) + "_" + norm(device.id) + "_" + key
 * HA typically uses unique_id as entity_id: sensor.bayrol_{normalizedSerial}_{key}
 */
export function buildEntityId(serial: string, key: string, domain = "sensor"): string {
  return `${domain}.${norm("Bayrol")}_${norm(serial)}_${key}`;
}

/**
 * Try to find an entity by scanning hass.states for a matching suffix pattern.
 * Fallback when buildEntityId doesn't match (e.g. user renamed entities).
 */
export function findEntityByKey(
  states: Record<string, { entity_id: string }>,
  serial: string,
  key: string,
  domain = "sensor"
): string | undefined {
  // Try exact match first
  const exactId = buildEntityId(serial, key, domain);
  if (states[exactId]) return exactId;

  // Fuzzy: search for entities ending with the key that contain the normalized serial
  const normalizedSerial = norm(serial);
  for (const entityId of Object.keys(states)) {
    if (
      entityId.startsWith(`${domain}.`) &&
      entityId.includes(normalizedSerial) &&
      entityId.endsWith(`_${key}`)
    ) {
      return entityId;
    }
  }
  return undefined;
}

/**
 * Parse a numeric state value, return null if invalid.
 */
export function parseNumericState(state: string | undefined): number | null {
  if (state === undefined || state === "unknown" || state === "unavailable") {
    return null;
  }
  const num = parseFloat(state);
  return isNaN(num) ? null : num;
}

/**
 * Get a color for a value within a range (green = good, red = bad).
 */
export function getStatusColor(value: number, min: number, max: number, optimal_min: number, optimal_max: number): string {
  if (value >= optimal_min && value <= optimal_max) return "var(--success-color, #4caf50)";
  if (value >= min && value <= max) return "var(--warning-color, #ff9800)";
  return "var(--error-color, #f44336)";
}

// pH standard ranges
export function getPhColor(value: number): string {
  return getStatusColor(value, 6.8, 7.8, 7.0, 7.4);
}

// ORP standard ranges (mV)
export function getOrpColor(value: number): string {
  return getStatusColor(value, 550, 900, 650, 750);
}
