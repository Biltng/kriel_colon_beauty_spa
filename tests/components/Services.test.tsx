import { render, screen } from "@testing-library/react";
import Services from "@/components/sections/Services";

describe("Services section", () => {
  it("renders every service with its price and a working Book Now link", () => {
    render(<Services />);
    expect(screen.getByText("Colon Cleansing")).toBeInTheDocument();
    expect(screen.getByText(/ZAR 550/)).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /book now/i }).length).toBeGreaterThan(0);
  });

  it("groups services under their category heading", () => {
    render(<Services />);
    expect(screen.getByRole("heading", { name: "Colon Hydrotherapy" })).toBeInTheDocument();
  });
});
