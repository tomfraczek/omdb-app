import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { ToggleFilters } from "./";
import { useSearchContext } from "../../context/searchContext";
import "@testing-library/jest-dom/vitest";

// Mock useSearchContext
vi.mock("../../context/searchContext", () => ({
  useSearchContext: vi.fn(),
}));

describe("ToggleFilters Component", () => {
  const mockSetType = vi.fn();
  const mockOnFilterChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useSearchContext as jest.Mock).mockReturnValue({
      type: "",
      setType: mockSetType,
    });
  });

  afterEach(() => {
    cleanup();
  });

  const renderComponent = () =>
    render(<ToggleFilters onFilterChange={mockOnFilterChange} />);

  it("should render ToggleFilters component", () => {
    renderComponent();
    expect(screen.getByLabelText(/Platform/i)).toBeInTheDocument();
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Movies/i)).toBeInTheDocument();
    expect(screen.getByText(/Series/i)).toBeInTheDocument();
    expect(screen.getByText(/Episodes/i)).toBeInTheDocument();
  });

  it("should call onFilterChange and setType when 'Movies' is selected", () => {
    renderComponent();
    const moviesButton = screen.getByText(/Movies/i);
    fireEvent.click(moviesButton);
    expect(mockSetType).toHaveBeenCalledWith("movie");
    expect(mockOnFilterChange).toHaveBeenCalledWith("movie");
  });

  it("should call onFilterChange and setType when 'Series' is selected", () => {
    renderComponent();
    const seriesButton = screen.getByText(/Series/i);
    fireEvent.click(seriesButton);
    expect(mockSetType).toHaveBeenCalledWith("series");
    expect(mockOnFilterChange).toHaveBeenCalledWith("series");
  });

  it("should call onFilterChange and setType when 'Episodes' is selected", () => {
    renderComponent();
    const episodesButton = screen.getByText(/Episodes/i);
    fireEvent.click(episodesButton);
    expect(mockSetType).toHaveBeenCalledWith("episode");
    expect(mockOnFilterChange).toHaveBeenCalledWith("episode");
  });

  it("should call onFilterChange and setType when 'All' is selected", () => {
    (useSearchContext as jest.Mock).mockReturnValue({
      type: "movie", // Set initial type to something other than 'all'
      setType: mockSetType,
    });

    renderComponent();
    const allButton = screen.getByText(/All/i);
    fireEvent.click(allButton);
    expect(mockSetType).toHaveBeenCalledWith("");
    expect(mockOnFilterChange).toHaveBeenCalledWith("");
  });

  it("should use type from context on initial render", () => {
    (useSearchContext as jest.Mock).mockReturnValue({
      type: "series",
      setType: mockSetType,
    });

    renderComponent();
    const seriesButton = screen.getByText(/Series/i);
    expect(seriesButton).toHaveAttribute("aria-pressed", "true");
  });
});
