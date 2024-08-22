import { Route, Routes as DomRoutes } from "react-router-dom";
import { Home } from "./Home";
import { PageNotFound } from "./PageNotFound";
import { Menu } from "./Menu";

export const Routes = () => {
  return (
    <DomRoutes>
      {/* Public Routes */}
      <Route path="*" element={<PageNotFound />} />
      <Route path="/home" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
    </DomRoutes>
  );
};
