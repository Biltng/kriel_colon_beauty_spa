import { render, screen } from "@testing-library/react";
import Reviews from "@/components/sections/Reviews";

describe("Reviews section", () => {
  it("shows the aggregate rating and at least one quote", () => {
    render(<Reviews />);
    expect(screen.getByText(/4\.9/)).toBeInTheDocument();
    expect(screen.getByText(/100/)).toBeInTheDocument();
    expect(screen.getByText(/best massage/i)).toBeInTheDocument();
  });
});
