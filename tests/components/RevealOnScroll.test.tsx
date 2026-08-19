import { render, screen } from "@testing-library/react";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

jest.mock("@/hooks/useReducedMotion", () => ({
  useReducedMotion: jest.fn(),
}));
import { useReducedMotion } from "@/hooks/useReducedMotion";

describe("RevealOnScroll", () => {
  it("renders children content regardless of motion preference", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    render(<RevealOnScroll><p>Hello spa</p></RevealOnScroll>);
    expect(screen.getByText("Hello spa")).toBeInTheDocument();
  });

  it("applies reduced-motion-safe fade when preference is set", () => {
    (useReducedMotion as jest.Mock).mockReturnValue(true);
    render(<RevealOnScroll><p>Hello spa</p></RevealOnScroll>);
    const wrapper = screen.getByText("Hello spa").parentElement;
    expect(wrapper).toHaveAttribute("data-motion", "reduced");
  });
});
