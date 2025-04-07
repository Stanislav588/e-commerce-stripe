import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Layout } from "./layouts/Layout/Layout";
import Home from "./pages/Home/Home";
import { Details } from "./pages/Details/Details";
import { Cart } from "./pages/Cart/Cart";
import { Gender } from "./components/Gender/Gender";
import { ProductsByCategory } from "./components/Products/ProductsByCategory";
import { AdminPage } from "./pages/Admin/AdminPage";
import { ProductsByBrand } from "./components/Products/ProductsByBrand";
import { WishList } from "./pages/WishList/WishList";
import { SuccessPage } from "./pages/Success/SuccessPage";
import { CancelPayment } from "./pages/Success/CancelPayment";

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/products/brand/:brand" element={<ProductsByBrand />} />
          <Route path="/products/:_id/:gender" element={<Details />} />
          <Route path="/products/gender/:gender" element={<Gender />} />
          <Route
            path="/all/category/:category/gender/:gender"
            element={<ProductsByCategory />}
          />

          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/auth/register" element={<Register />} />

          <Route path="/order-success" element={<SuccessPage />} />
          <Route path="/cancel" element={<CancelPayment />} />
        </Routes>
      </Layout>
    </>
  );
}
