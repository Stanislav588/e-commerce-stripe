import { store } from "./store";

export type AppDispatch = typeof store.dispatch;

export interface Product {
  product: {
    _id: string;
    brand: string;
    description: string;
    category: string[];
    price: number;
    optionalImg: string[];
    discount: number;
    images: string[];
    color: string[];
    size: string[];
    material: string[];
    gender: string;
    reviews: number;
    img: string;
    model: string;
    rating: number;
    stock: number;
    createdAt: number;
    quantity: number;
    updatedAt: number;
  };
  _id: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  optionalImg: string[];
  discount: number;
  images: string[];
  color: string[];
  size: string[];
  material: string[];
  gender: string;
  reviews: number;
  img: string;
  model: string;
  rating: number;
  stock: number;
  createdAt: number;
  quantity: number;
  updatedAt: number;
}
export interface ProductData {
  _id: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  images: string[];
  optionalImg?: string[];
  color: string[];
  size: string[];
  material: string[];
  gender: string;
  reviews: number;
  img: string;
  model: string;
  rating: number;
  stock: number;
  createdAt: number;
  quantity: number;
  updatedAt: number;
}
export interface CartProductDetails {
  quantity: number;
  _id: string;
  product: {
    _id: string;
    brand: string;
    description: string;
    category: number[];
    price: number;
    discount: number;
    images: string[];
    color: string[];
    size: string[] | number;
    material: string[];
    gender: string;
    reviews: number;
    img: string;
    model: string;
    rating: number;
    stock: number;
    createdAt: number;
    updatedAt: number;
  };
  size: string[];
}
export interface ProductState {
  data: Product[] | null;
  status: "idle" | "succeeded" | "loading" | "failed";
  error: null | string;
}

export interface CartProduct {
  cartProducts: {
    data: Product[];
  };
}
