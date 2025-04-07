import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useParams } from "react-router-dom";
import { Product } from "../../redux/types";
import { ProductItem } from "./ProductItem";
import { ProductsFilter } from "../ProductsFilter/ProductsFilter";
import { useContext } from "react";
import { ContextApi } from "../context/ContextApi";

export const ProductsByCategory = () => {
  const { selectedBrand, selectedColor, selectedFrom, selectedTo } =
    useContext(ContextApi);
  const { category, gender } = useParams();
  window.scrollTo(0, 0);
  const categoryProduct = useSelector(
    (state: RootState) => state.item.productGenreAndCategory.data
  );

  let filteredProducts = categoryProduct?.filter(
    (item) => item.category === category && item.gender === gender
  );

  if (selectedFrom && selectedTo) {
    filteredProducts = filteredProducts?.filter(
      (item) =>
        (selectedFrom === null || item.price >= selectedFrom) &&
        (selectedTo === null || item.price <= selectedTo)
    );
  }
  if (selectedBrand) {
    filteredProducts = filteredProducts?.filter(
      (item) => item.brand === selectedBrand
    );
  }

  if (selectedColor.length) {
    filteredProducts = filteredProducts?.filter((item) =>
      item.color.some((color) => selectedColor.includes(color))
    );
  }

  return (
    <div className="py-12">
      <h1 className="text-3xl mb-10">
        {category} for {gender}
      </h1>

      <ProductsFilter />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts?.map((product: Product) => (
          <div key={product._id}>
            <Link to={`/products/${product._id}/${product.gender}`}>
              <ProductItem {...product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
