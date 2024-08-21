import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./queryClient";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./pages";

/**
 *
 */

/**
 * Application
 */
export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </QueryClientProvider>
  );
};
