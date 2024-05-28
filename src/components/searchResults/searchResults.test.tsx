import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { SearchResults } from "./searchResults.component";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

// Mock movie data
const mockResults = {
  Search: [
    {
      Title: "Inception",
      Year: "2010",
      imdbID: "tt1375666",
      Type: "movie",
      Poster: "https://example.com/inception.jpg",
    },
    {
      Title: "Interstellar",
      Year: "2014",
      imdbID: "tt0816692",
      Type: "movie",
      Poster: "N/A",
    },
  ],
  totalResults: "20",
};

const mockHandleChangePage = vi.fn();

const defaultProps = {
  results: mockResults,
  handleChangePage: mockHandleChangePage,
  page: 1,
  query: "Inception",
};

describe("SearchResults Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render movie results in a table", () => {
    render(
      <BrowserRouter>
        <SearchResults {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Inception")).toBeInTheDocument();
    expect(screen.getByText("Interstellar")).toBeInTheDocument();
    expect(screen.getByText("2010")).toBeInTheDocument();
    expect(screen.getByText("2014")).toBeInTheDocument();
  });

  it("should display placeholder image when poster is not available", () => {
    render(
      <BrowserRouter>
        <SearchResults {...defaultProps} />
      </BrowserRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images[1]).toHaveAttribute(
      "src",
      "/src/images/icons/clapperboard.png"
    );
  });

  it("should call handleChangePage on pagination change", () => {
    render(
      <BrowserRouter>
        <SearchResults {...defaultProps} />
      </BrowserRouter>
    );

    const pagination = screen.getByRole("navigation");

    // Ensure the pagination renders with buttons
    expect(pagination).toBeInTheDocument();

    // Log pagination inner HTML for debugging
    console.log(pagination.innerHTML);

    // Find the next page button using aria-label
    const nextPageButton = screen.getByRole("button", {
      name: /go to page 2/i,
    });

    // Assert the next page button is in the document
    expect(nextPageButton).toBeInTheDocument();

    // Click the next page button
    fireEvent.click(nextPageButton);

    // Assert the handleChangePage function has been called
    expect(mockHandleChangePage).toHaveBeenCalled();
  });
});
