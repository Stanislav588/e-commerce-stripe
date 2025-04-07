import { Link } from "react-router-dom";

import { Genders, genders } from "../../utils/categories";

export const GenderCategories = () => {
  return (
    <div className="flex select-none mt-16 gap-2 justify-center flex-wrap">
      {genders.map((category: Genders) => {
        return (
          <div
            key={category?.id}
            className="w-[400px]  overflow-hidden  relative cursor-pointer h-[500px] group"
          >
            <Link to={`/products/gender/${category.name}`}>
              <img
                className="w-full  h-full  object-cover transition-transform group-hover:-translate-y-2  rounded-lg"
                src={category?.imgUrl}
                alt={category?.name}
              />

              <div className="absolute  top-0 left-0 rounded-lg w-full h-full  bg-black bg-opacity-50   duration-300 flex items-center justify-center opacity-100">
                <h1 className="text-white text-xl font-medium">
                  {category?.name}
                </h1>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
