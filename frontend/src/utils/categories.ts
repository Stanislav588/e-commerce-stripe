import menImg from "../images/men-clothing.jpeg";
import womenImg from "../images/woman-clothing.avif";
import babyImg from "../images/baby-clothing.avif";
import shoesImg from "../images/shoes-men.jpg";
import pantsImg from "../images/pants-men.jpg";
import shirtImg from "../images/shirts-men.webp";
import tshirtImg from "../images/tshirt-man.webp";
import jacketImg from "../images/jackets-men.jpg";
import womenPants from "../images/pants-women.webp";
import womenShirt from "../images/shirts-women.webp";
import womenTshirt from "../images/t-shirts-women.webp";
import womenJacket from "../images/jacket-women.webp";
import womenDress from "../images/dress-women.avif";
import womenShoes from "../images/shoes-women.webp";
import kidsShoes from "../images/shoes-kids.avif";
import kidsTshirt from "../images/tshirts-kids.webp";
import kidsPants from "../images/pants-kids.avif";

export interface Genders {
  id: number;
  path: string;
  name: string;
  imgUrl: string;
}
export interface Categories {
  id: number;
  title: string;
  icon: string | undefined;
}

export const genders: Genders[] = [
  {
    id: 1,
    path: "/mens",
    name: "Men",
    imgUrl: menImg,
  },
  {
    id: 2,
    path: "/women",
    name: "Women",
    imgUrl: womenImg,
  },
  {
    id: 3,
    path: "/kids",
    name: "Kids",
    imgUrl: babyImg,
  },
];

export const categoriesName: string[] = [
  "T-Shirts",
  "Jackets",
  "Shoes",
  "Shirts",
  "Pants",
  "Dresses",
];

export const colors: string[] = [
  "White",
  "Black",
  "Yellow",
  "Blue",
  "Red",
  "Alpine Snow",
  "Sand Drift",
  "Brown",
  "Green",
  "Gray",
  "Pink",
  "Lime",
  "Apple Red",
  "Mink Brown",
  "Orange",
  "Laser Orange",
  "Asphalt Gray",
  "Rose",
  "Latte",
  "Brown Mushroom",
  "Sky Blue",
  "Deep Royal Blue / Noble Red",
  "Reflect Silver",
  "Foton Dust / Black",
  "Deep Royal Blue",
];

export const menProductCategories: Categories[] = [
  {
    id: 1,
    icon: shoesImg,
    title: "Shoes",
  },
  {
    id: 2,
    icon: tshirtImg,
    title: "T-Shirts",
  },

  {
    id: 4,
    icon: jacketImg,
    title: "Jackets",
  },
  {
    id: 5,
    icon: shirtImg,
    title: "Shirts",
  },
  {
    id: 6,
    icon: pantsImg,
    title: "Pants",
  },
];
export const womenProductCategories: Categories[] = [
  {
    id: 1,
    icon: womenShoes,
    title: "Shoes",
  },
  {
    id: 2,
    icon: womenTshirt,
    title: "T-Shirts",
  },

  {
    id: 4,
    icon: womenJacket,
    title: "Jackets",
  },
  {
    id: 5,
    icon: womenShirt,
    title: "Shirts",
  },
  {
    id: 6,
    icon: womenPants,
    title: "Pants",
  },
  {
    id: 7,
    icon: womenDress,
    title: "Dresses",
  },
];
export const kidsProductCategories: Categories[] = [
  {
    id: 1,
    icon: kidsShoes,
    title: "Shoes",
  },
  {
    id: 2,
    icon: kidsTshirt,
    title: "T-Shirts",
  },

  {
    id: 6,
    icon: kidsPants,
    title: "Pants",
  },
];

export const popularBrands: string[] = [
  "Adidas",
  "Nike",
  "Calvin Klein",
  "Puma",
  "New Balance",
  "Polo",
  "The North Face",
  "Levi's®",
  "Guess",
  "Tommy Hilfiger",
];

export const prices: { from: number | null; to: number | null }[] = [
  {
    from: 55,
    to: 120,
  },
  {
    from: 120,
    to: 320,
  },
  {
    from: 320,
    to: 1000,
  },
];
