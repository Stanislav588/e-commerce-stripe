import { useContext, useEffect } from "react";

import { ContextApi } from "../context/ContextApi";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import { prices } from "../../utils/categories";

export const FilterByPrice = () => {
  const {
    setOpenColorDropDown,
    setOpenBrandDropDown,
    selectedFrom,
    handleResetPrice,
    handleSelectPrice,
    selectedTo,
    setIsOpenPriceModal,
    isOpenPriceModal,
  } = useContext(ContextApi);
  const handleOpenClose = () => {
    setOpenColorDropDown(false);
    setOpenBrandDropDown(false);
    setIsOpenPriceModal(!isOpenPriceModal);
  };
  useEffect(() => {
    try {
      const storedPrice = localStorage.getItem("price");
      if (storedPrice) {
        const parsedPrice = JSON.parse(storedPrice);
        if (parsedPrice.from && parsedPrice.to) {
          handleSelectPrice(parsedPrice.from, parsedPrice.to);
        }
      }
    } catch (error: any) {
      return error.message;
    }
  }, []);
  console.log(selectedFrom, selectedTo);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative min-w-[200px]"
    >
      <div
        onClick={handleOpenClose}
        className="flex p-2 bg-white min-w-[200px] cursor-pointer justify-between items-center"
      >
        <div>
          {`${
            selectedFrom !== null && selectedTo !== null
              ? `$ ${selectedFrom} - $ ${selectedTo}`
              : "Price"
          }`}
        </div>
        {isOpenPriceModal ? (
          <div className="text-xl">
            <MdOutlineKeyboardArrowUp />
          </div>
        ) : (
          <div className="text-xl">
            <MdOutlineKeyboardArrowDown />
          </div>
        )}
      </div>
      {isOpenPriceModal && (
        <div className="bg-white min-w-[200px] overflow-y-auto max-h-60 top-12 z-30 absolute">
          <div>
            <ul>
              {prices?.map((price) => (
                <div
                  onClick={() => handleSelectPrice(price.from, price.to)}
                  key={price.from}
                  className="border flex items-center justify-between p-3 cursor-pointer hover:bg-gray-200 border-y-gray-200"
                >
                  <li>
                    $ {price.from} - $ {price.to}
                  </li>
                  {selectedFrom === price.from && price.to && <IoMdCheckmark />}
                </div>
              ))}
            </ul>

            <button
              onClick={handleResetPrice}
              className="bg-blue-500 bottom-0 p-2 w-full sticky text-white"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
