import { Route, Routes as DomRoutes } from "react-router-dom";
import { Home } from "./Home";
import { PageNotFound } from "./PageNotFound";
import { Menu } from "./Menu";
import { Layout } from "./Layout";

export const Routes = () => {
  return (
    <DomRoutes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route path="*" element={<PageNotFound />} />

        <Route path="stores">
          <Route index element={<Home />} />
          <Route path=":storeId/menu" element={<Menu />} />
        </Route>
      </Route>
    </DomRoutes>
  );
};
