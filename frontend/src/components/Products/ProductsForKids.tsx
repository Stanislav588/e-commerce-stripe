import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";
import { ProductCarousel } from "./ProductCarousel";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";

export const ProductsForKids = () => {
  const products = useSelector((state: RootState) => state.item.products.data);
  const productStatus = useSelector((state: any) => state.item.products.status);

  const kidsProducts = products?.filter((product) => product.gender === "Kids");
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
    <div>
      <h1 className="text-4xl mb-5 text-black">Products for Kids</h1>

      <div className="flex overflow-x-scroll overflow-hidden gap-3">
        {kidsProducts &&
          kidsProducts.length > 0 &&
          kidsProducts?.slice(2).map((prod) => (
            <div key={prod._id}>
              <Link to={`/products/${prod._id}/${prod.gender}`}>
                <ProductCarousel {...prod} />
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};
