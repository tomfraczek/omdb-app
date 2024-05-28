import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Search } from "./search.component";
import "@testing-library/jest-dom/vitest";

describe("Search Component", () => {
  const mockHandleKeyDown = vi.fn();
  const mockSetSearch = vi.fn();
  const mockResetSearch = vi.fn();

  const defaultProps = {
    handleKeyDown: mockHandleKeyDown,
    setSearch: mockSetSearch,
    resetSearch: mockResetSearch,
    value: "",
    displayReset: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render search input", () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search");
    expect(input).toBeInTheDocument();
  });

  it("should call setSearch on input change", () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.change(input, { target: { value: "Inception" } });
    expect(mockSetSearch).toHaveBeenCalledWith("Inception");
  });

  it("should call handleKeyDown on input key down", () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    expect(mockHandleKeyDown).toHaveBeenCalled();
  });

  it("should render reset icon when displayReset is true", () => {
    render(<Search {...defaultProps} displayReset={true} />);
    expect(
      screen.getByRole("img", { name: /reset icon/i })
    ).toBeInTheDocument();
  });

  it("should call resetSearch on reset icon click", () => {
    render(<Search {...defaultProps} displayReset={true} />);
    const resetIcon = screen.getByRole("img", { name: /reset icon/i });
    fireEvent.click(resetIcon);
    expect(mockResetSearch).toHaveBeenCalled();
  });
});
