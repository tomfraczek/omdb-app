import CircularProgress from "@mui/material/CircularProgress";
import { SpinnerContainer } from "./spinner.styles";

export const Spinner = () => {
  return (
    <SpinnerContainer>
      <CircularProgress />
    </SpinnerContainer>
  );
};
