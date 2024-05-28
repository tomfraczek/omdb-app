import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useState, useEffect } from "react";
import { useSearchContext } from "../../context/searchContext";
import { useIsMobile } from "../../theme/styles";

interface ToggleFiltersProps {
  onFilterChange: (type: string) => void;
}

export const ToggleFilters = ({ onFilterChange }: ToggleFiltersProps) => {
  const isMobile = useIsMobile();
  const { type, setType } = useSearchContext();
  const [alignment, setAlignment] = useState(type || "all");

  useEffect(() => {
    setAlignment(type || "all");
  }, [type]);

  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    if (newAlignment !== null) {
      const newType = newAlignment === "all" ? "" : newAlignment;
      setAlignment(newAlignment);
      onFilterChange(newType);
      setType(newType);
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      orientation={isMobile ? "vertical" : "horizontal"}
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="movie">Movies</ToggleButton>
      <ToggleButton value="series">Series</ToggleButton>
      <ToggleButton value="episode">Episodes</ToggleButton>
    </ToggleButtonGroup>
  );
};
