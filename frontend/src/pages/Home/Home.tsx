import { BestSellers } from "../../components/BestSellers/BestSellers";
import { GenderCategories } from "../../components/Gender/GenderCategories";
import { HighlyRatedProducts } from "../../components/Products/HighlyRatedProducts";
import { ProductsForKids } from "../../components/Products/ProductsForKids";
import { Sales } from "../../components/Products/Sales";

export const Home = () => {
  return (
    <>
      <GenderCategories />
      <div className="flex flex-col gap-32">
        <BestSellers />
        <HighlyRatedProducts />
        <ProductsForKids />
        <Sales />
      </div>
    </>
  );
};

export default Home;
