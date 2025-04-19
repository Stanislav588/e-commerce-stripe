import { FC } from "react";
import { Product } from "../../redux/types";

export const ProductItem: FC<Product> = ({
  img,
  price,
  rating,
  discount,
  brand,
  model,
}) => {
  return (
    <div className="w-full h-full select-none cursor-pointer relative group">
      <img loading="lazy" className="w-full h-full object-cover" src={img} />

      <div className="absolute hidden md:flex bottom-0 items-center justify-between  left-0 w-full bg-white bg-opacity-80 p-2 opacity-100 md:opacity-0 sm:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div>
          <p className="font-semibold text-lg">{brand}</p>
          <p>{model}</p>
        </div>
        {discount > 0 ? (
          <p className="text-lg text-red-500">$ {price - discount}</p>
        ) : (
          <p className="text-lg">$ {price}</p>
        )}
      </div>
      {rating >= 4 ? (
        <div className="absolute px-3 py-1 text-white rounded-tr-lg rounded-r-lg top-5 bg-blue-500">
          Highly rated
        </div>
      ) : (
        ""
      )}
      <div className="px-2 absolute bottom-0 md:hidden ">
        <div>
          <p className="font-semibold text-lg">{brand}</p>
          <p>{model}</p>
        </div>

        <div className="flex items-center gap-4">
          {discount > 0 ? (
            <p className="text-lg text-red-500">$ {price - discount}</p>
          ) : (
            <p className="text-lg">$ {price}</p>
          )}
        </div>
      </div>
    </div>
  );
};
