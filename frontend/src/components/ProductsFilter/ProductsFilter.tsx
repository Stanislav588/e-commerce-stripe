import { Button } from "@mui/material";
import { FilterByBrand } from "./FilterByBrand";
import { FilterByColor } from "./FilterByColor";
import { useContext } from "react";
import { ContextApi } from "../context/ContextApi";
import { FilterByPrice } from "./FilterByPrice";

export const ProductsFilter = () => {
  const { handleResetAll } = useContext(ContextApi);
  return (
    <div className="flex justify-center md:justify-start flex-wrap mb-6 gap-3">
      <FilterByBrand />
      <FilterByColor />
      <FilterByPrice />
      <Button onClick={handleResetAll} variant="contained">
        Reset All
      </Button>
    </div>
  );
};
