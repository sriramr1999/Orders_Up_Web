import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./queryClient";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./pages";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { lightTheme } from "./theme/foodhub";

/**
 *
 */
const theme = createTheme({
  // Customize your theme here
});

/**
 * Application
 */
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
