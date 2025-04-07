import { FC, ReactNode, useContext } from "react";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { ContextApi } from "../../components/context/ContextApi";
import { MobileMenu } from "../../components/Mobile/MobileMenu";
import { useLocation } from "react-router-dom";
interface LayoutProps {
  children: ReactNode;
}
export const Layout: FC<LayoutProps> = ({ children }) => {
  const { pathname } = useLocation();
  const {
    setOpenBrandDropDown,
    setInputValue,
    setIsOpenPriceModal,
    setIsOpenPopup,
    setOpenColorDropDown,
  } = useContext(ContextApi);
  const closeDropDown = () => {
    setOpenBrandDropDown(false);
    setOpenColorDropDown(false);
    setIsOpenPriceModal(false);
    setInputValue("");
    setIsOpenPopup(false);
  };

  return (
    <div className="relative" onClick={closeDropDown}>
      <Header />
      <div className="px-5 md:px-12 lg:px-36">{children}</div>
      {pathname === "/order-success" ? null : <Footer />}

      <div className="sticky w-full bottom-0 ">
        {pathname === "/order-success" ? null : <MobileMenu />}
      </div>
    </div>
  );
};
