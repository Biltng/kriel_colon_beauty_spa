import { render, screen } from "@testing-library/react";
import Reviews from "@/components/sections/Reviews";

describe("Reviews section", () => {
  it("shows the aggregate rating and at least one quote", () => {
    render(<Reviews />);
    // Scoped to the heading: a decorative bleed numeral elsewhere on the page
    // also renders the rating average, so an unscoped text query would be ambiguous.
    expect(screen.getByRole("heading", { name: /4\.9 rated by 100 clients/i })).toBeInTheDocument();
    expect(screen.getByText(/best massage/i)).toBeInTheDocument();
  });
});
