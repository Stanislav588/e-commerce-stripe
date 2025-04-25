import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CSSProperties, Suspense, lazy } from "react";
import { MoonLoader } from "react-spinners";
import { Layout } from "./layouts/Layout/Layout";

const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Home = lazy(() => import("./pages/Home/Home"));
const Details = lazy(() => import("./pages/Details/Details"));
const Cart = lazy(() => import("./pages/Cart/Cart"));
const Gender = lazy(() => import("./components/Gender/Gender"));
const ProductsByCategory = lazy(
  () => import("./components/Products/ProductsByCategory")
);
const AdminPage = lazy(() => import("./pages/Admin/AdminPage"));
const ProductsByBrand = lazy(
  () => import("./components/Products/ProductsByBrand")
);
const WishList = lazy(() => import("./pages/WishList/WishList"));
const SuccessPage = lazy(() => import("./pages/Success/SuccessPage"));
const CancelPayment = lazy(() => import("./pages/Success/CancelPayment"));
export default function App() {
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
  };
  return (
    <>
      <Layout>
        <Suspense
          fallback={
            <div className="mt-32">
              <MoonLoader
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>
          }
        >
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route
              path="/products/brand/:brand"
              element={<ProductsByBrand />}
            />
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
        </Suspense>
      </Layout>
    </>
  );
}
