import React, { FC, createContext, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ContextType {
  selectedBrand: string;
  setSelectedBrand: (value: string) => void;
  handleSelectBrand: (label: string, selected: string) => void;
  brandLabel: string;
  openBrandDropDown: boolean;
  setOpenBrandDropDown: (value: boolean) => void;
  selectedColor: string[];
  setSelectedColor: (value: string[]) => void;
  handleSelectColor: (label: string, selected: string) => void;
  colorLabel: string;
  openColorDropDown: boolean;
  setOpenColorDropDown: (value: boolean) => void;
  handleResetBrand: () => void;
  handleResetColor: () => void;
  handleResetAll: () => void;
  setIsOpenSearchModal: (value: boolean) => void;
  isOpenSearchModal: boolean;
  inputValue: string;
  selectedFrom: number | null;
  selectedTo: number | null;
  handleSelectPrice: (from: number, to: number) => void;
  setSelectedFrom: (value: number) => void;
  setSelectedTo: (value: number) => void;
  setInputValue: (value: string) => void;
  handleSearchInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isOpenPopup: boolean;
  handleResetPrice: () => void;
  isOpenPriceModal: boolean;
  setIsOpenPriceModal: (value: boolean) => void;
  setIsOpenPopup: (value: boolean) => void;
  onClosePopUp: () => void;
}
export const ContextApi = createContext<ContextType>({} as ContextType);
export const ShopContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openBrandDropDown, setOpenBrandDropDown] = useState<boolean>(false);

  const [selectedBrand, setSelectedBrand] = useState<string>("");
  const [selectedFrom, setSelectedFrom] = useState<number | null>(null);
  const [selectedTo, setSelectedTo] = useState<number | null>(null);
  const [brandLabel, setBrandLabel] = useState<string>("");
  const [openColorDropDown, setOpenColorDropDown] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string[]>([]);
  const [colorLabel, setColorLabel] = useState<string>("");
  const [isOpenSearchModal, setIsOpenSearchModal] = useState<boolean>(false);
  const [isOpenPriceModal, setIsOpenPriceModal] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const products = useSelector((state: RootState) => state.item.products.data);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const event = e.target.value.toLowerCase();
    setInputValue(event);
    if (event.length > 0) {
      products?.filter((product) =>
        product.brand.includes(event.toLowerCase())
      );
    }
  };
  const onClosePopUp = () => {
    setIsOpenPopup(false);
  };
  const handleSelectBrand = (selected: string, label: string) => {
    setSelectedBrand(selected);
    setBrandLabel(label);
    localStorage.setItem(
      "brand",
      JSON.stringify({ selectedBrand: selected, label: label })
    );
  };
  const handleSelectPrice = (from: number, to: number) => {
    setSelectedFrom(from);
    setSelectedTo(to);
    localStorage.setItem("price", JSON.stringify({ from: from, to: to }));
  };
  const handleSelectColor = (selected: string, label: string) => {
    setSelectedColor([selected]);
    setColorLabel(label);
    localStorage.setItem(
      "color",
      JSON.stringify({ selectedColor: selected, label: label })
    );
  };

  const handleResetBrand = () => {
    localStorage.removeItem("brand");
    setSelectedBrand("");
    setBrandLabel("");
  };
  const handleResetPrice = () => {
    localStorage.removeItem("price");
    setSelectedFrom(null);
    setSelectedTo(null);
  };

  const handleResetColor = () => {
    localStorage.removeItem("color");
    setSelectedColor([]);
    setColorLabel("");
  };
  const handleResetAll = () => {
    setSelectedColor([]);
    localStorage.removeItem("color");
    localStorage.removeItem("brand");
    localStorage.removeItem("price");
    setSelectedFrom(null);
    setSelectedTo(null);
    setColorLabel("");
    setSelectedBrand("");
    setBrandLabel("");
    setOpenBrandDropDown(false);
    setOpenColorDropDown(false);
  };
  return (
    <ContextApi.Provider
      value={{
        selectedFrom,
        selectedTo,
        handleResetPrice,
        setSelectedFrom,
        setSelectedTo,
        isOpenPriceModal,
        setIsOpenPriceModal,
        handleSelectPrice,
        onClosePopUp,
        setIsOpenPopup,
        isOpenPopup,
        handleSearchInput,
        inputValue,
        setInputValue,
        setIsOpenSearchModal,
        isOpenSearchModal,
        handleResetAll,
        handleResetBrand,
        handleResetColor,
        openBrandDropDown,
        setOpenBrandDropDown,
        setSelectedColor,
        handleSelectBrand,
        openColorDropDown,
        colorLabel,
        selectedColor,
        brandLabel,
        setOpenColorDropDown,
        handleSelectColor,
        selectedBrand,
        setSelectedBrand,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};
