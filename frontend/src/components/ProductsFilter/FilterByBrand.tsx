import { useContext, useEffect } from "react";
import { popularBrands } from "../../utils/categories";
import { ContextApi } from "../context/ContextApi";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

export const FilterByBrand = () => {
  const {
    selectedBrand,
    setOpenBrandDropDown,
    setIsOpenPriceModal,
    setOpenColorDropDown,
    handleResetBrand,
    openBrandDropDown,
    handleSelectBrand,
    brandLabel,
  } = useContext(ContextApi);
  const handleOpenClose = () => {
    setOpenBrandDropDown(!openBrandDropDown);
    setOpenColorDropDown(false);
    setIsOpenPriceModal(false);
  };
  useEffect(() => {
    try {
      const storedBrand = localStorage.getItem("brand");
      if (storedBrand) {
        const parsedBrand = JSON.parse(storedBrand);
        if (parsedBrand?.selectedBrand) {
          handleSelectBrand(parsedBrand.selectedBrand, parsedBrand.label);
        }
      }
    } catch (error: any) {
      return error.message;
    }
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative min-w-[200px]"
    >
      <div
        onClick={handleOpenClose}
        className="flex  p-2 bg-white min-w-[200px] cursor-pointer justify-between items-center"
      >
        <div>{brandLabel || "Brand"}</div>
        {openBrandDropDown ? (
          <div className="text-xl">
            <MdOutlineKeyboardArrowUp />
          </div>
        ) : (
          <div className="text-xl">
            <MdOutlineKeyboardArrowDown />
          </div>
        )}
      </div>
      {openBrandDropDown && (
        <div className="bg-white overflow-y-auto max-h-60 min-w-[200px] top-12 z-30 absolute">
          <div className="relative">
            <ul>
              {popularBrands?.map((brand) => (
                <div
                  key={brand}
                  onClick={() => handleSelectBrand(brand, brand)}
                  className="border  flex justify-between p-2 cursor-pointer hover:bg-gray-200 border-y-gray-200"
                >
                  <li value={brand} key={brand}>
                    {brand}
                  </li>
                  {brand === selectedBrand && <IoMdCheckmark />}
                </div>
              ))}
            </ul>

            <button
              onClick={handleResetBrand}
              className="bg-blue-600 bottom-0 p-2 w-full sticky text-white"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
