import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useSearchContext } from "../../context/searchContext";

interface YearSelectProps {
  onYearChange: (year: number) => void;
}

export const YearSelect = ({ onYearChange }: YearSelectProps) => {
  const { year, setYear } = useSearchContext();
  const [selectedYear, setSelectedYear] = useState<number>(year || 0);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const newYear = event.target.value as number;
    setSelectedYear(newYear);
    onYearChange(newYear);
    setYear(newYear);
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [
      <MenuItem key={0} value={0}>
        <em>None</em>
      </MenuItem>,
    ];
    for (let year = currentYear; year >= 1888; year--) {
      years.push(
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      );
    }
    return years;
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="year-select-label">Year</InputLabel>
      <Select
        labelId="year-select-label"
        value={selectedYear}
        onChange={handleYearChange}
        label="Year"
      >
        {generateYearOptions()}
      </Select>
    </FormControl>
  );
};
