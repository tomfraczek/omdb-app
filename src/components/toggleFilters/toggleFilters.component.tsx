import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState } from "react";

interface ToggleFiltersProps {
  onFilterChange: (type: string) => void;
}

export const ToggleFilters = ({ onFilterChange }: ToggleFiltersProps) => {
  const [alignment, setAlignment] = useState("all");

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      const type = newAlignment === "all" ? "" : newAlignment;
      setAlignment(newAlignment);
      onFilterChange(type);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="">All</ToggleButton>
      <ToggleButton value="movie">Movies</ToggleButton>
      <ToggleButton value="series">Series</ToggleButton>
      <ToggleButton value="episode">Episodes</ToggleButton>
    </ToggleButtonGroup>
  );
};
