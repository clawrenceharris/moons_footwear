import { Routes, Route, useLocation } from "react-router-dom";
import { CartToast, Layout } from "./components";
import {
  Checkout,
  Search,
  SizeGuide,
  Product,
  Home,
  Shop,
  Cart,
  Favorites,
  NotFound,
} from "./pages";
import { useEffect } from "react";
import { AdminPanel, EditProduct } from "./pages/admin";
import AuthPage from "./pages/AuthPage";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute/AdminRoute";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top every time the path changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div>
      <CartToast />
      <Routes>
        <Route element={<Layout />}>
          <Route index path="/" element={<Home />} />
          {/* <Route path="/new-arrivals" element={<NewArrivals />} /> */}
          <Route path="/product/:id" element={<Product />} />
          <Route path="/size-guide" element={<SizeGuide />} />
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/favorites" element={<Favorites />} />
          </Route>
          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/product/:id" element={<EditProduct />} />

            <Route path="/admin/search/:query?" element={<Search />} />
          </Route>
          <Route path="/search/:query?" element={<Search />} />
          <Route path="/auth/:authType" element={<AuthPage />} />

          <Route path="/cart" element={<Cart />} />

          <Route
            path="/shop/category/:category/:subcategory?"
            element={<Shop />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
