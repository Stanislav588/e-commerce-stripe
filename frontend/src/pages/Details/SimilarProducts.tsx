import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Product } from "../../redux/types";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductCarousel } from "../../components/Products/ProductCarousel";
interface SimilarProductsProps {
  id: string | undefined;
  productName: string;
}
export const SimilarProducts: FC<SimilarProductsProps> = ({
  id,
  productName,
}) => {
  const shoes = useSelector(
    (state: RootState) => state.item.products.data || []
  );

  const similarProducts = shoes?.filter(
    (item) => item._id !== id && item.brand === productName
  );
  return (
    <div>
      <h1 className="text-4xl mb-5 text-black">You might also like</h1>
      <div className="flex overflow-scroll overflow-x-auto gap-4">
        {similarProducts?.map((product: Product) => (
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
