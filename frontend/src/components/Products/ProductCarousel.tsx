import { FC } from "react";
import { Product } from "../../redux/types";

export const ProductCarousel: FC<Product> = ({
  img,
  price,
  rating,
  brand,
  discount,
  model,
}) => {
  return (
    <>
      <div className="w-[200px] h-[240px]  md:w-[350px] select-none md:h-[450px] cursor-pointer relative group">
        <img loading="lazy" className="w-full h-full object-cover" src={img} />

        {rating >= 4 ? (
          <div className="absolute px-3 py-1 text-white rounded-tr-lg rounded-r-lg top-5 bg-blue-500">
            Highly rated
          </div>
        ) : (
          ""
        )}
        <div className="absolute hidden bottom-0 items-center justify-between md:flex left-0 w-full bg-white bg-opacity-80 p-2 opacity-100 md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div>
            <p className="font-semibold text-lg">{brand}</p>
            <p>{model}</p>
          </div>

          <div className="flex gap-4">
            <p className={`${discount > 0 ? "line-through" : ""} text-lg`}>
              $ {price}
            </p>

            {discount > 0 && (
              <p className="text-lg text-red-500">$ {price - discount}</p>
            )}
          </div>
        </div>
        {rating >= 4 ? (
          <div className="absolute px-3 py-1 text-white rounded-tr-lg rounded-r-lg top-5 bg-blue-500">
            Highly rated
          </div>
        ) : (
          ""
        )}
      </div>
      <div className=" px-2 md:hidden gap-3 ">
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
    </>
  );
};
