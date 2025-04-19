import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "../src/components/Footer/Footer";
import { popularBrands } from "../src/utils/categories";

describe("Render the component", () => {
  test("should render Footer", () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    popularBrands.forEach((brand) => {
      expect(screen.getByText(brand)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/Top categories in clothing and shoes/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Women clothes/i)).toBeInTheDocument();
    expect(screen.getByText(/Kids clothes/i)).toBeInTheDocument();
  });
});
