import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import { YearSelect } from "./";
import { useSearchContext } from "../../context/searchContext";
import "@testing-library/jest-dom/vitest";

// Mock useSearchContext
vi.mock("../../context/searchContext", () => ({
  useSearchContext: vi.fn(),
}));

describe("YearSelect Component", () => {
  const mockSetYear = vi.fn();
  const mockOnYearChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchContext as jest.Mock).mockReturnValue({
      year: 0,
      setYear: mockSetYear,
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderComponent = () =>
    render(<YearSelect onYearChange={mockOnYearChange} />);

  it("should render YearSelect component with default 'None' selected", () => {
    renderComponent();
    expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
    expect(screen.getByText(/None/i)).toBeInTheDocument();
  });
});
