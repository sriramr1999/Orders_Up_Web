import { CircularProgress, Box } from "@mui/material";

export const AppLoader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
  >
    <CircularProgress />
  </Box>
);
