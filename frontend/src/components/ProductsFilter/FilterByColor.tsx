import { useContext, useEffect } from "react";

import { ContextApi } from "../context/ContextApi";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

import { colors } from "../../utils/categories";

export const FilterByColor = () => {
  const {
    colorLabel,
    selectedColor,
    setOpenColorDropDown,
    setOpenBrandDropDown,
    openColorDropDown,
    handleResetColor,
    setIsOpenPriceModal,
    handleSelectColor,
  } = useContext(ContextApi);
  const handleOpenClose = () => {
    setOpenBrandDropDown(false);
    setOpenColorDropDown(!openColorDropDown);
    setIsOpenPriceModal(false);
  };
  useEffect(() => {
    try {
      const storedColor = localStorage.getItem("color");
      if (storedColor) {
        const parsedColor = JSON.parse(storedColor);
        if (parsedColor?.selectedColor) {
          handleSelectColor(parsedColor.selectedColor, parsedColor.label);
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
        className="flex p-2 bg-white min-w-[200px] cursor-pointer justify-between items-center"
      >
        <div>{colorLabel || "Color"}</div>
        {openColorDropDown ? (
          <div className="text-xl">
            <MdOutlineKeyboardArrowUp />
          </div>
        ) : (
          <div className="text-xl">
            <MdOutlineKeyboardArrowDown />
          </div>
        )}
      </div>
      {openColorDropDown && (
        <div className="bg-white overflow-y-auto max-h-60 top-12 z-30 absolute">
          <div>
            <ul>
              {colors?.map((color) => (
                <div
                  key={color}
                  onClick={() => handleSelectColor(color, color)}
                  className="border flex justify-between p-3 cursor-pointer hover:bg-gray-200 border-y-gray-200"
                >
                  <li value={color} key={color}>
                    {color}
                  </li>
                  {selectedColor.includes(color) && <IoMdCheckmark />}
                </div>
              ))}
            </ul>

            <button
              onClick={handleResetColor}
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
