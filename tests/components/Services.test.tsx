import { render, screen } from "@testing-library/react";
import Services from "@/components/sections/Services";

describe("Services section", () => {
  it("renders every service with its price and a working Book Now link", () => {
    render(<Services />);
    expect(screen.getByText("Colon Cleansing")).toBeInTheDocument();
    expect(screen.getByText(/ZAR 550/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /book now/i }).length).toBeGreaterThan(0);
  });

  it("gives each Book Now link a distinct accessible name per service", () => {
    render(<Services />);
    expect(
      screen.getByRole("link", { name: /Book Now – Colon Cleansing/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Book Now – LED-Light Therapy/i })
    ).toBeInTheDocument();
  });

  it("groups services under their category heading", () => {
    render(<Services />);
    expect(screen.getByRole("heading", { name: "Colon Hydrotherapy" })).toBeInTheDocument();
  });
});
