import { breakpoints } from "./breakpoints";
import { useMediaQuery } from "@mui/material";

export const media = {
  tablet: `@media (min-width: ${breakpoints.tablet})px`,
  laptop: `@media (min-width: ${breakpoints.laptop})px`,
  desktop: `@media (min-width: ${breakpoints.desktop})px`,
};

export const useIsMobile = () => {
  return useMediaQuery("(max-width:425px)");
};
