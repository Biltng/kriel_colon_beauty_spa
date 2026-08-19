import { SERVICES, SERVICE_CATEGORIES } from "@/lib/services";

describe("services data", () => {
  it("every service has a non-empty freshaUrl and belongs to a known category", () => {
    expect(SERVICES.length).toBeGreaterThan(0);
    for (const service of SERVICES) {
      expect(service.freshaUrl).toMatch(/^https:\/\/www\.fresha\.com\//);
      expect(SERVICE_CATEGORIES).toContain(service.category);
    }
  });

  it("has no duplicate service ids", () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
