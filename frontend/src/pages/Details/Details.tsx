import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/productSlice";
import { AppDispatch, Product } from "../../redux/types";
import { Box, Button, Skeleton } from "@mui/material";
import { GoPlus } from "react-icons/go";
import { fetchAddToCart } from "../../redux/cartSlice";
import { clothSize, sizes } from "../../utils/sizes";
import { RootState } from "../../redux/store";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { SimilarProducts } from "./SimilarProducts";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";

import "./Details.css";
import {
  fetchAddProductToWishList,
  fetchRemoveFromWishList,
} from "../../redux/wishListSlice";
import { enqueueSnackbar } from "notistack";
export const Details = () => {
  const product = useSelector(
    (state: RootState) => state.item.productDetails.data as Product
  );
  const productStatus = useSelector(
    (state: RootState) => state.item.productDetails.status
  );

  const dispatch = useDispatch<AppDispatch>();
  const filteredSize = product?.category === "Shoes" ? sizes : clothSize;
  const [error, setError] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [openMaterial, setOpenMaterial] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<number>(0);
  const cartStatus = useSelector(
    (state: RootState) => state.cart.cartProducts.status
  );
  const wishList = useSelector(
    (state: RootState) => state.wishlist.product.data
  );
  const authUser = useSelector((state: RootState) => state.auth.user.data);

  const isLoading = cartStatus === "loading";
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();
  const handleAddToWishList = () => {
    dispatch(fetchAddProductToWishList({ productId: _id }));
    if (authUser?.fullName) {
      return enqueueSnackbar("Product added to wishlist", {
        variant: "success",
      });
    } else {
      return enqueueSnackbar("Log into your account", {
        variant: "error",
      });
    }
  };
  const handleRemoveFromWishList = () => {
    dispatch(fetchRemoveFromWishList(_id));
    return enqueueSnackbar("Product removed from wishlist", {
      variant: "success",
    });
  };
  const handleAddToCart = () => {
    if (!selectedSize) {
      return setError("Please select size");
    }

    setError(null);
    dispatch(
      fetchAddToCart({
        productId: _id,
        size: selectedSize,
        navigate,
      })
    );
  };

  const handleSelectImg = (selected: number) => {
    setSelectedImg(selected);
  };
  const handleOnChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchProductDetails(_id));
  }, [dispatch, _id]);
  const handleScrollRight = () => {
    setSelectedImg((prev) =>
      prev < product?.optionalImg.length - 1 ? prev + 1 : 0
    );
  };
  const handleScrollLeft = () => {
    setSelectedImg((prev) =>
      prev > 0 ? prev - 1 : product?.optionalImg.length - 1
    );
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="py-20"
      >
        <div className="details-container flex gap-8 justify-around">
          <div className="flex gap-4">
            <div className="md:flex hidden flex-col gap-2">
              {product?.optionalImg?.map((img: any) => (
                <img
                  key={img}
                  onMouseEnter={() => handleSelectImg(img)}
                  onClick={() => handleSelectImg(img)}
                  className="w-[100px] cursor-pointer hover:border hover:border-black h-[120px] min-w-[100px] min-h-[120px]"
                  src={img}
                />
              ))}
            </div>

            <div className="w-full select-none lg:w-[800px] relative lg:max-w-[600px] md:w-[600px] lg:h-[700px]">
              <FaArrowLeft
                size={40}
                onClick={handleScrollLeft}
                className="absolute block cursor-pointer  bg-gray-300 p-2 bottom-10"
              />
              {productStatus === "loading" ? (
                <Skeleton className="rounded-md w-[30%]" />
              ) : (
                <img
                  className="w-full object-cover rounded-md h-full"
                  src={String(
                    product?.optionalImg?.[selectedImg] || selectedImg
                  )}
                />
              )}
              {product?.rating >= 4 ? (
                <div className="absolute px-3 py-1 text-white rounded-tr-lg rounded-r-lg top-5 bg-blue-500">
                  Highly rated
                </div>
              ) : (
                ""
              )}

              <FaArrowRight
                onClick={handleScrollRight}
                size={40}
                className="absolute block cursor-pointer bg-gray-300 right-0 p-2 bottom-10"
              />
            </div>
          </div>

          <div className="w-full mt-8 lg:mt-0 lg:w-[85%]">
            <div className="flex flex-col gap-4">
              <div>
                <h1 className="text-2xl font-medium">{product?.brand}</h1>
                <p className="text-2xl">{product?.model}</p>
                <p className="text-gray-600">
                  {product?.gender}'s {product?.category}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <p
                  className={`text-lg ${
                    product?.discount ? "line-through" : ""
                  }`}
                >
                  $ {product?.price}
                </p>
                {product?.discount > 0 && (
                  <p className="text-lg text-red-500">
                    $ {product?.price - product?.discount}
                  </p>
                )}

                {product?.discount && product?.discount > 0 ? (
                  <h1 className="text-lg">Discount {product?.discount} %</h1>
                ) : (
                  ""
                )}
              </div>
            </div>
            <h1 className="text-gray-600">
              Color:
              {product?.color.map((col: string, index: any) => (
                <span key={index} className="pl-2">
                  {col}
                  {index < product?.color.length - 1 ? " /" : ""}
                </span>
              ))}{" "}
            </h1>

            <div className="flex flex-col gap-4">
              <div className="min-w-[30%] md:min-w-[350px] mt-3">
                <select
                  onChange={handleOnChange}
                  id="countries"
                  value={selectedSize}
                  className="border font-medium px-3 border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white  "
                >
                  <option selected>Select a size</option>

                  {filteredSize.map((item: number | string) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              {error && <h1 className="text-red-500 text-center">{error}</h1>}

              {wishList?.some((prod) => prod?.product?._id === product?._id) ? (
                <div
                  onClick={handleRemoveFromWishList}
                  className="gap-2 group  hover:border-gray-500 hover:text-black cursor-pointer border w-[100%] py-1 px-2  bg-white flex rounded-lg justify-between items-center"
                >
                  <button>Remove from wishlist</button>
                  <MdDelete
                    className="transition-all duration-300 stroke-black group-hover:fill-blue-500"
                    size={35}
                  />
                </div>
              ) : (
                <div
                  onClick={handleAddToWishList}
                  className="gap-2 group  hover:border-gray-500 hover:text-black cursor-pointer border w-[100%] py-1 px-2  bg-white flex rounded-lg justify-between items-center"
                >
                  <button>Add to wishlist</button>
                  <GoPlus
                    className="transition-all duration-300 stroke-black group-hover:fill-blue-500"
                    size={35}
                  />
                </div>
              )}

              <Box>
                <Button
                  onClick={handleAddToCart}
                  sx={{ width: "100%", py: "10px" }}
                  variant="contained"
                >
                  {isLoading ? "Loading..." : "Add to cart"}
                </Button>
              </Box>
            </div>

            <div className="mt-12">
              <h1 className="text-gray-600 text-2xl mb-4">Description</h1>
              {product?.description ? (
                <div className="text-lg">{product?.description}</div>
              ) : (
                <h1 className="text-center text-lg text-gray-600 ">
                  No description for this product
                </h1>
              )}
            </div>
            <div
              onClick={() => setOpenMaterial(true)}
              className="flex mt-8 cursor-pointer justify-between"
            >
              <h1 className="text-gray-600 text-2xl">Material</h1>
              {openMaterial ? (
                <button>
                  <IoIosArrowUp size={20} />
                </button>
              ) : (
                <button>
                  <IoIosArrowDown size={20} />
                </button>
              )}
            </div>
            <ul className="mt-5">
              {openMaterial &&
                product?.material.map((item: string) => (
                  <li
                    key={item}
                    onClick={() => setOpenMaterial(!openMaterial)}
                    className="text-gray-600 text-lg"
                  >
                    - {item}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </motion.div>
      <SimilarProducts productName={product?.brand} id={_id} />
    </>
  );
};
