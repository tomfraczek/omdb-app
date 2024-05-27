import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Spinner = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
      <CircularProgress />
    </Box>
  );
};
