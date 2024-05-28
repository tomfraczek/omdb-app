import { useState } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";

interface YearSelectProps {
  onYearChange: (year: number) => void;
}

export const YearSelect = ({ onYearChange }: YearSelectProps) => {
  const [selectedYear, setSelectedYear] = useState<number>(0);

  const handleYearChange = (event: SelectChangeEvent<number>) => {
    const year = event.target.value as number;
    setSelectedYear(year);
    onYearChange(year);
  };

  const generateYearOptions = () => {
    const years = [
      <MenuItem key={0} value={0}>
        <em>None</em>
      </MenuItem>,
    ];
    for (let year = new Date().getFullYear(); year >= 1888; year--) {
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
