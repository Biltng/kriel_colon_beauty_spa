import { render, screen } from "@testing-library/react";
import BookNowButton from "@/components/ui/BookNowButton";

describe("BookNowButton", () => {
  it("links to the given Fresha URL and opens in a new tab", () => {
    render(<BookNowButton href="https://www.fresha.com/example" />);
    const link = screen.getByRole("link", { name: /book now/i });
    expect(link).toHaveAttribute("href", "https://www.fresha.com/example");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });

  it("supports a custom label", () => {
    render(<BookNowButton href="https://www.fresha.com/example" label="Book Colon Cleansing" />);
    expect(screen.getByRole("link", { name: "Book Colon Cleansing" })).toBeInTheDocument();
  });

  it("supports a distinct accessible name via ariaLabel while keeping the visible label", () => {
    render(
      <BookNowButton
        href="https://www.fresha.com/example"
        ariaLabel="Book Now – Colon Cleansing"
      />
    );
    const link = screen.getByRole("link", { name: "Book Now – Colon Cleansing" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("Book Now");
  });
});
