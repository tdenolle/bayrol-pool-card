import { describe, it, expect } from "vitest";
import {
  norm,
  buildEntityId,
  findEntityByKey,
  parseNumericState,
  getStatusColor,
  getPhColor,
  getOrpColor,
} from "../src/utils";

describe("norm", () => {
  it("strips dashes and lowercases", () => {
    expect(norm("22ASE2-00841")).toBe("22ase200841");
  });

  it("strips underscores", () => {
    expect(norm("some_value")).toBe("somevalue");
  });

  it("strips spaces and special chars", () => {
    expect(norm("Hello World!")).toBe("helloworld");
  });

  it("handles already normalized string", () => {
    expect(norm("abc123")).toBe("abc123");
  });

  it("handles empty string", () => {
    expect(norm("")).toBe("");
  });

  it("normalizes manufacturer name", () => {
    expect(norm("Bayrol")).toBe("bayrol");
  });
});

describe("buildEntityId", () => {
  it("builds correct entity_id for temperature", () => {
    expect(buildEntityId("22ASE2-00841", "temperature")).toBe(
      "sensor.bayrol_22ase200841_temperature"
    );
  });

  it("builds correct entity_id for pH", () => {
    expect(buildEntityId("22ASE2-00841", "ph")).toBe(
      "sensor.bayrol_22ase200841_ph"
    );
  });

  it("builds correct entity_id for ORP", () => {
    expect(buildEntityId("22ASE2-00841", "mv_se")).toBe(
      "sensor.bayrol_22ase200841_mv_se"
    );
  });

  it("supports custom domain", () => {
    expect(buildEntityId("22ASE2-00841", "filtration_mode", "select")).toBe(
      "select.bayrol_22ase200841_filtration_mode"
    );
  });

  it("defaults to sensor domain", () => {
    expect(buildEntityId("ABC", "temp")).toMatch(/^sensor\./);
  });
});

describe("findEntityByKey", () => {
  const mockStates: Record<string, { entity_id: string }> = {
    "sensor.bayrol_22ase200841_temperature": {
      entity_id: "sensor.bayrol_22ase200841_temperature",
    },
    "sensor.bayrol_22ase200841_ph": {
      entity_id: "sensor.bayrol_22ase200841_ph",
    },
    "sensor.other_device_temperature": {
      entity_id: "sensor.other_device_temperature",
    },
  };

  it("finds exact match", () => {
    expect(findEntityByKey(mockStates, "22ASE2-00841", "temperature")).toBe(
      "sensor.bayrol_22ase200841_temperature"
    );
  });

  it("finds pH entity", () => {
    expect(findEntityByKey(mockStates, "22ASE2-00841", "ph")).toBe(
      "sensor.bayrol_22ase200841_ph"
    );
  });

  it("returns undefined for missing key", () => {
    expect(findEntityByKey(mockStates, "22ASE2-00841", "salt")).toBeUndefined();
  });

  it("does not match other devices", () => {
    expect(
      findEntityByKey(mockStates, "22ASE2-00841", "other_device_temperature")
    ).toBeUndefined();
  });

  it("falls back to fuzzy match when exact fails", () => {
    const states: Record<string, { entity_id: string }> = {
      "sensor.bayrol_poolaccess_22ase200841_temperature": {
        entity_id: "sensor.bayrol_poolaccess_22ase200841_temperature",
      },
    };
    expect(findEntityByKey(states, "22ASE2-00841", "temperature")).toBe(
      "sensor.bayrol_poolaccess_22ase200841_temperature"
    );
  });

  it("respects domain filter", () => {
    const states: Record<string, { entity_id: string }> = {
      "select.bayrol_22ase200841_filtration_mode": {
        entity_id: "select.bayrol_22ase200841_filtration_mode",
      },
    };
    expect(
      findEntityByKey(states, "22ASE2-00841", "filtration_mode", "select")
    ).toBe("select.bayrol_22ase200841_filtration_mode");
  });

  it("does not match wrong domain", () => {
    const states: Record<string, { entity_id: string }> = {
      "sensor.bayrol_22ase200841_filtration_mode": {
        entity_id: "sensor.bayrol_22ase200841_filtration_mode",
      },
    };
    expect(
      findEntityByKey(states, "22ASE2-00841", "filtration_mode", "select")
    ).toBeUndefined();
  });
});

describe("parseNumericState", () => {
  it("parses valid float", () => {
    expect(parseNumericState("25.3")).toBe(25.3);
  });

  it("parses valid integer", () => {
    expect(parseNumericState("7")).toBe(7);
  });

  it("returns null for undefined", () => {
    expect(parseNumericState(undefined)).toBeNull();
  });

  it("returns null for 'unknown'", () => {
    expect(parseNumericState("unknown")).toBeNull();
  });

  it("returns null for 'unavailable'", () => {
    expect(parseNumericState("unavailable")).toBeNull();
  });

  it("returns null for non-numeric string", () => {
    expect(parseNumericState("abc")).toBeNull();
  });

  it("parses negative numbers", () => {
    expect(parseNumericState("-5.2")).toBe(-5.2);
  });

  it("parses zero", () => {
    expect(parseNumericState("0")).toBe(0);
  });
});

describe("getStatusColor", () => {
  it("returns success for value in optimal range", () => {
    expect(getStatusColor(7.2, 6.8, 7.8, 7.0, 7.4)).toContain("success");
  });

  it("returns warning for value in acceptable range", () => {
    expect(getStatusColor(6.9, 6.8, 7.8, 7.0, 7.4)).toContain("warning");
  });

  it("returns error for value out of range", () => {
    expect(getStatusColor(6.5, 6.8, 7.8, 7.0, 7.4)).toContain("error");
  });

  it("returns success at optimal boundary", () => {
    expect(getStatusColor(7.0, 6.8, 7.8, 7.0, 7.4)).toContain("success");
    expect(getStatusColor(7.4, 6.8, 7.8, 7.0, 7.4)).toContain("success");
  });

  it("returns warning at acceptable boundary", () => {
    expect(getStatusColor(6.8, 6.8, 7.8, 7.0, 7.4)).toContain("warning");
    expect(getStatusColor(7.8, 6.8, 7.8, 7.0, 7.4)).toContain("warning");
  });
});

describe("getPhColor", () => {
  it("returns success for optimal pH", () => {
    expect(getPhColor(7.2)).toContain("success");
  });

  it("returns warning for acceptable pH", () => {
    expect(getPhColor(6.9)).toContain("warning");
  });

  it("returns error for bad pH", () => {
    expect(getPhColor(6.0)).toContain("error");
  });
});

describe("getOrpColor", () => {
  it("returns success for optimal ORP", () => {
    expect(getOrpColor(700)).toContain("success");
  });

  it("returns warning for acceptable ORP", () => {
    expect(getOrpColor(600)).toContain("warning");
  });

  it("returns error for bad ORP", () => {
    expect(getOrpColor(400)).toContain("error");
  });
});
