import { it, expect, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import { Spinner } from "./";
import "@testing-library/jest-dom/vitest";

describe("Spinner Component", () => {
  it("should render a CircularProgress component", () => {
    render(<Spinner />);
    const circularProgress = screen.getByRole("progressbar");
    expect(circularProgress).toBeInTheDocument();
  });
});
