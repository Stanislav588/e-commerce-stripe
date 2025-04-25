import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { ProductItem } from "./ProductItem";
import { Product } from "../../redux/types";

export default function ProductsByBrand() {
  const { brand } = useParams();
  const products = useSelector((state: RootState) => state.item.products.data);
  window.scrollTo(0, 0);
  const productsByBrand = products?.filter(
    (product) => product.brand === brand
  );
  return (
    <div className="py-12">
      <h1 className="text-2xl mb-10">{brand} Catalog</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsByBrand?.map((prod: Product) => {
          return (
            <div key={prod._id}>
              <Link to={`/products/${prod._id}/${prod.gender}`}>
                <ProductItem {...prod} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
