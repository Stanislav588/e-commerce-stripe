import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import { AppDispatch, Product } from "../../redux/types";
import { fetchProductFromWishList } from "../../redux/wishListSlice";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
export const WishList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const wishlist = useSelector(
    (state: RootState) => state.wishlist.product.data
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductFromWishList());
  }, [dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h1 className="mb-14 mt-8 text-3xl">WishList</h1>
      {!wishlist?.length && (
        <div className="text-center text-lg">
          Here you can add your favorite products
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist &&
          wishlist.length > 0 &&
          wishlist?.map((product: Product) => {
            const { model, discount, rating, price, img, brand, _id, gender } =
              product?.product;
            return (
              <div className="w-full" key={product._id}>
                <Link to={`/products/${_id}/${gender}`}>
                  <div className="w-full select-none cursor-pointer relative group">
                    <img
                      loading="lazy"
                      className="w-full h-[230px] sm:h-[350px] object-cover"
                      src={img}
                    />
                    <div className="px-2 md:hidden ">
                      <div>
                        <p className="font-semibold text-lg">{brand}</p>
                        <p>{model}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        {discount > 0 ? (
                          <p className="text-lg text-red-500">
                            $ {price - discount}
                          </p>
                        ) : (
                          <p className="text-lg">$ {price}</p>
                        )}
                      </div>
                    </div>
                    <div className="absolute hidden md:flex bottom-0 items-center justify-between left-0 w-full bg-white bg-opacity-80 p-2 opacity-100 md:opacity-0 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div>
                        <p className="font-semibold text-lg">{brand}</p>
                        <p>{model}</p>
                      </div>
                      {discount > 0 && (
                        <p className="text-lg text-red-500">
                          $ {price - discount}
                        </p>
                      )}
                      {
                        <p
                          className={`text-lg ${
                            discount > 0 ? "line-through" : ""
                          }`}
                        >
                          $ {price}
                        </p>
                      }
                    </div>
                    {rating >= 4 ? (
                      <div className="absolute px-3 py-1 text-white rounded-tr-lg rounded-r-lg top-5 bg-blue-500">
                        Highly rated
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </motion.div>
  );
};
