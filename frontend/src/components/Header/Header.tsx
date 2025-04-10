import { useContext, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { SearchModal } from "./SearchModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogOut } from "../../redux/authSlice";
import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";

import { RootState } from "../../redux/store";
import { IoCloseCircleOutline } from "react-icons/io5";
import { ContextApi } from "../context/ContextApi";

import { IoIosHeartEmpty } from "react-icons/io";
import { AppDispatch } from "../../redux/types";

export default function Header() {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);
  const {
    inputValue,
    isOpenPopup,
    setIsOpenPopup,
    handleSearchInput,
    setInputValue,
  } = useContext(ContextApi);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.cartProducts.data);
  const products = useSelector((state: RootState) => state.item.products.data);
  const closeSearchModal = () => {
    setInputValue("");
  };

  const productsBySearch = products?.filter((product) =>
    product.brand.toLowerCase().includes(inputValue)
  );
  const userData = useSelector((state: any) => state.auth.user.data);

  const handleOpenPopup = () => {
    setIsOpenPopup(!isOpenPopup);
  };
  const handleOpenSearchModal = () => {
    setIsOpenSearchModal(true);
  };
  const handleCloseSearchModal = () => {
    setIsOpenSearchModal(false);
  };
  const handleInput = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };
  const handleLogOut = () => {
    dispatch(fetchLogOut());
    enqueueSnackbar("Log out successfully!", { variant: "success" });
  };

  return (
    <>
      <div className={`py-6 sticky w-full top-0 z-30 px-9  bg-white shadow-md`}>
        <div className="flex gap-3 items-center justify-between">
          <Link to="/">
            <h1 className="text-2xl font-medium cursor-pointer">Shop</h1>
          </Link>
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex relative items-center gap-6"
          >
            <input
              ref={ref}
              value={inputValue}
              onChange={handleSearchInput}
              placeholder="Search..."
              className="border-2 hidden md:block lg:w-[500px] w-[300px] border-gray-300 rounded-md py-2 px-5"
            />
            {inputValue.length > 0 && (
              <IoCloseCircleOutline
                onClick={() => setInputValue("")}
                size={25}
                className="absolute cursor-pointer right-16"
              />
            )}
            <IoIosSearch
              onClick={handleInput}
              className="cursor-pointer hidden md:block "
              size={30}
            />

            {inputValue && (
              <div className="bg-white rounded-md p-8 absolute w-full top-20">
                <div className="flex w-full gap-3 max-h-96 overflow-y-auto flex-col">
                  {productsBySearch?.length === 0 ? (
                    <h1>Products not found</h1>
                  ) : (
                    productsBySearch?.map((prod) => (
                      <div key={prod._id}>
                        <Link
                          onClick={closeSearchModal}
                          to={`/products/${prod._id}/${prod.gender}`}
                        >
                          <div className="flex hover:bg-gray-300 rounded-md justify-between items-center">
                            <div className="flex items-center gap-5">
                              <img
                                className="w-[100px]"
                                src={prod?.img}
                                alt=""
                              />
                              <p>{prod?.brand}</p>
                              <p>${prod?.price}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-6 items-center">
            <div onClick={handleOpenSearchModal}>
              <IoIosSearch
                onClick={handleInput}
                className="cursor-pointer block md:hidden"
                size={30}
              />
            </div>
            <div className="hidden md:block">
              <Link to={`${userData?.email ? "/wishlist" : "/auth/login"} `}>
                <IoIosHeartEmpty cursor="pointer" size={30} />
              </Link>
            </div>

            {userData?.email ? (
              <IoIosLogOut
                onClick={handleLogOut}
                cursor={"pointer"}
                size={30}
              />
            ) : (
              <Link to="/auth/register">
                <div>
                  <FaRegUser
                    onClick={handleOpenPopup}
                    onMouseEnter={handleOpenPopup}
                    className="cursor-pointer"
                    size={25}
                  />
                </div>
              </Link>
            )}
            <Link to="/cart">
              <div className="relative">
                <FiShoppingCart className="cursor-pointer" size={25} />
                <div className="absolute text-blue-500 font-semibold top-[-10px] right-[-20px] z-30">
                  {Array.isArray(cart)
                    ? cart.reduce((sum, item) => sum + item?.quantity, 0)
                    : ""}
                </div>
              </div>
            </Link>
            <div className="hidden">
              {userData?.email ? (
                <Button onClick={handleLogOut} variant="contained">
                  Log out
                </Button>
              ) : (
                "User not found"
              )}
            </div>
          </div>
        </div>
        {isOpenSearchModal && (
          <SearchModal
            closeSearchModal={closeSearchModal}
            productsBySearch={productsBySearch}
            onClose={handleCloseSearchModal}
          />
        )}
      </div>
    </>
  );
}
