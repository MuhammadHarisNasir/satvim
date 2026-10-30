import { describe, expect, it } from "vitest";
import { calcRoi } from "@/lib/site-config";

describe("ROI estimator", () => {
  it("hours = candidates × minutes ÷ 60 and cost = hours × hourly", () => {
    expect(calcRoi(120, 15, 25)).toEqual({ hours: 30, cost: 750 });
  });
  it("shows no result unless every value is above zero", () => {
    expect(calcRoi(120, 0, 25)).toBeNull();
    expect(calcRoi(NaN, 15, 25)).toBeNull();
  });
});
