import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProductsByGenreAndCategory } from "../../redux/productSlice";
import { Link, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/types";
import {
  kidsProductCategories,
  menProductCategories,
  womenProductCategories,
} from "../../utils/categories";
import "./Gender.css";
export const Gender = () => {
  const { gender, category } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  window.scrollTo(0, 0);
  const selectedGender =
    gender === "Women"
      ? womenProductCategories
      : gender === "Kids"
      ? kidsProductCategories
      : menProductCategories;
  useEffect(() => {
    if (gender || category) {
      dispatch(fetchProductsByGenreAndCategory({ gender, category }));
    }
  }, [dispatch, gender, category]);

  return (
    <div>
      <div className="flex justify-center flex-wrap mt-12 gap-6">
        {selectedGender.map((prod) => {
          return (
            <div key={prod.id}>
              <Link to={`/all/category/${prod.title}/gender/${gender}`}>
                <div className="p-2 text-center cursor-pointer">
                  <div className="gender block w-[350px] h-[400px] relative mx-auto">
                    <img
                      src={prod.icon}
                      className="text-9xl w-full h-full object-cover "
                    />
                    <div className="w-full h-full flex items-center justify-center absolute bg-black top-0 bg-opacity-55">
                      <h1 className="text-white text-xl">{prod.title}</h1>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
