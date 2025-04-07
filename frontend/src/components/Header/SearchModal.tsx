import { FC, useContext, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { ContextApi } from "../context/ContextApi";
import { Link } from "react-router-dom";
import { Product } from "../../redux/types";

interface ModalProps {
  onClose: () => void;
  productsBySearch: Product[] | undefined;
  closeSearchModal: () => void;
}

export const SearchModal: FC<ModalProps> = ({ productsBySearch, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { inputValue, handleSearchInput } = useContext(ContextApi);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      className={`bg-white p-5 block md:hidden  inset-0 transition-transform duration-300 ease-in-out absolute min-h-screen w-full z-50 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      <div className="flex mb-3 justify-end">
        <MdOutlineClose
          onClick={onClose}
          className="hover:text-blue-500 hover:opacity-100 opacity-35 transition-all cursor-pointer"
          size={35}
        />
      </div>
      <input
        value={inputValue}
        onChange={handleSearchInput}
        placeholder="Search..."
        className="border-2 w-[100%] border-gray-300 rounded-md py-2 px-5"
      />
      {inputValue && (
        <div className="bg-white  rounded-md p-8 absolute w-full">
          <div className="flex w-full gap-3 h-[600px] overflow-y-auto flex-col">
            {productsBySearch?.length === 0 ? (
              <h1>Products not found</h1>
            ) : (
              productsBySearch?.map((prod) => (
                <div key={prod._id}>
                  <Link
                    onClick={onClose}
                    to={`/products/${prod._id}/${prod.gender}`}
                  >
                    <div className="flex hover:bg-gray-300 rounded-md justify-between items-center">
                      <div className="flex items-center gap-5">
                        <img className="w-[100px]" src={prod?.img} alt="" />
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
  );
};
