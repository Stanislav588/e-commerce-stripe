import { Link } from "react-router-dom";
import {
  kidsProductCategories,
  menProductCategories,
  popularBrands,
  womenProductCategories,
} from "../../utils/categories";
import { motion } from "framer-motion";
export const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="px-20 mt-36 py-12 bg-blue-500 text-white"
    >
      <div className="flex flex-col md:flex-row gap-10 justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-8">
            Most Popular Brands on our site
          </h1>
          <div className="flex flex-col gap-3">
            {popularBrands.map((brand) => (
              <div key={brand}>
                <Link to={`/products/brand/${brand}`}>
                  <p className="cursor-pointer hover:underline">{brand}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-semibold mb-8">
            Top categories in clothing and shoes
          </h1>
          <div className="flex flex-wrap gap-14">
            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-semibold">Women clothes</h1>
              {womenProductCategories.map((category) => (
                <div key={category.id}>
                  <Link
                    to={`/products/category/${category.title}/gender/Women`}
                  >
                    <p className="cursor-pointer hover:underline">
                      {category.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-semibold">Men clothes</h1>
              {menProductCategories.map((category) => (
                <div key={category.id}>
                  <Link to={`/products/category/${category.title}/gender/Men`}>
                    <p className="cursor-pointer hover:underline">
                      {category.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="text-lg font-semibold">Kids clothes</h1>
              {kidsProductCategories.map((category) => (
                <div key={category.id}>
                  <Link to={`/products/category/${category.title}/gender/Kids`}>
                    <p className="cursor-pointer hover:underline">
                      {category.title}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
