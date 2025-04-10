import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Product } from "../../redux/types";
import { FC } from "react";
import { Link } from "react-router-dom";
import { ProductCarousel } from "../../components/Products/ProductCarousel";
interface SimilarProductsProps {
  id: string | undefined;
  productName: string;
  product: Product;
}
export const SimilarProducts: FC<SimilarProductsProps> = ({
  id,
  product,
  productName,
}) => {
  const products = useSelector(
    (state: RootState) => state.item.products.data || []
  );

  const similarProducts = products?.filter(
    (item) => item._id !== id && item.brand === productName
  );

  const similarShoes = products
    ?.filter(
      (item) =>
        item._id !== id &&
        item.brand === productName &&
        item.category === product.category
    )
    .sort((a, b) => a.model.localeCompare(b.model));
  return (
    <>
      {similarProducts.length === 0 && similarShoes.length === 0 ? (
        ""
      ) : (
        <div
          className={`flex flex-col ${
            similarProducts.length === 0 || similarShoes.length === 0
              ? "gap-0"
              : "gap-24"
          }`}
        >
          <div>
            {similarProducts.length > 0 && (
              <>
                <h1 className="text-4xl mb-5 text-black">
                  You might also like
                </h1>
                <div className="flex overflow-scroll overflow-x-auto gap-4">
                  {similarProducts?.map((product: Product) => (
                    <div key={product._id}>
                      <Link to={`/products/${product._id}/${product.gender}`}>
                        <ProductCarousel {...product} />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {similarShoes.length > 0 && (
              <>
                <h1 className="text-4xl mb-5 text-black">
                  More {product?.category.toLowerCase()} of this brand
                </h1>
                <div className="flex overflow-scroll overflow-x-auto gap-4">
                  {similarShoes?.map((product: Product) => (
                    <div key={product._id}>
                      <Link to={`/products/${product._id}/${product.gender}`}>
                        <ProductCarousel {...product} />
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
