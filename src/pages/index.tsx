import { Route, Routes as DomRoutes, Navigate } from "react-router-dom";
import { Home } from "./Home";
import { PageNotFound } from "./PageNotFound";
import { Menu } from "./Menu";
import { Layout } from "../pages/Layout";
import { Cart } from "../pages/Cart ";
import { OrderStatus } from "../pages/OrderStatus";

export const Routes = () => {
  return (
    <DomRoutes>
      <Route path="/" element={<Layout />}>
        {/* Redirect root path to /stores */}
        <Route index element={<Navigate to="/stores" />} />

        {/* Public Routes */}
        <Route path="cart" element={<Cart />} />
        <Route path="orderStatus" element={<OrderStatus />} />
        <Route path="stores">
          <Route index element={<Home />} />
          <Route path=":storeId/menu" element={<Menu />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </DomRoutes>
  );
};
