import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/productSlice";
import { AppDispatch, Product } from "../../redux/types";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { ProductCarousel } from "../Products/ProductCarousel";

export const BestSellers = () => {
  const products = useSelector((state: any) => state.item.products.data);

  const productStatus = useSelector((state: any) => state.item.products.status);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (productStatus === "loading") {
    return (
      <div className="p-4">
        <Skeleton height={40} width={200} />
        <Skeleton height={20} width={150} />
        <Skeleton height={300} width={400} />
        <Skeleton height={20} width={"90%"} />
        <Skeleton height={20} width={"80%"} />
      </div>
    );
  }
  return (
    <div className="mt-10">
      <h1 className="text-4xl mb-5 text-black">Best sellers</h1>
      <div className="flex overflow-x-scroll overflow-hidden gap-3">
        {products &&
          products.length > 0 &&
          products?.map((product: Product) => (
            <div key={product._id}>
              <Link to={`/products/${product._id}/${product.gender}`}>
                <ProductCarousel {...product} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
