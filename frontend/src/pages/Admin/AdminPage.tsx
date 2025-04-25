import { ChangeEvent, useRef, useState } from "react";
import { categoriesName, colors } from "../../utils/categories";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch, Product } from "../../redux/types";
import { fetchAddNewProduct } from "../../redux/productSlice";
import axios from "axios";

export default function AdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const imgRef = useRef<HTMLInputElement | null>(null);
  const optionalImgRef = useRef<HTMLInputElement | null>(null);
  const [productData, setProductData] = useState<Product>({
    brand: "",
    model: "",
    price: 0,
    description: "",
    category: [],
    color: [],
    gender: "",
    material: [],
    rating: 0,
    img: "",
    discount: 0,
    optionalImg: [],
  });
  const handleChangeFile = async (e: any) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    const { data } = await axios.post("http://localhost:3000/upload", formData);

    setProductData((prev: any) => ({
      ...prev,
      img: data.image_url,
    }));
  };
  const handleChangeMultiplyFiles = async (e: any) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append("image", file);
    const { data } = await axios.post("http://localhost:3000/upload", formData);

    setProductData((prev: any) => ({
      ...prev,
      optionalImg: [...prev.optionalImg, data.image_url],
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setProductData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    dispatch(fetchAddNewProduct(productData));
  };

  return (
    <div className="py-8">
      <h1 className="text-4xl  text-center">Admin Page</h1>

      <div className="w-[50%] text-gray-500  block mx-auto rounded-md p-5">
        <form onSubmit={handleSubmitForm}>
          <h1 className="text-2xl mb-6 text-blue-600">Create new Product</h1>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label className="text-black">Brand</label>
              <input
                name="brand"
                value={productData.brand}
                type="text"
                onChange={handleInputChange}
                className="w-full rounded-md outline-none p-3 text-lg"
                placeholder="Enter brand"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Model</label>
              <input
                name="model"
                type="text"
                value={productData.model}
                onChange={handleInputChange}
                className="w-full rounded-md outline-none p-3 text-lg"
                placeholder="Enter model"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full rounded-md outline-none p-3 text-lg"
                placeholder="Enter price"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Discount</label>
              <input
                type="number"
                name="discount"
                value={productData.discount}
                onChange={handleInputChange}
                className="w-full rounded-md outline-none p-3 text-lg"
                placeholder="Enter price"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-black">Gender</label>
              <input
                type="text"
                name="gender"
                value={productData.gender}
                onChange={handleInputChange}
                className="rounded-md outline-none p-3 text-lg"
                placeholder="Enter gender"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Description</label>
              <input
                type="text"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="rounded-md outline-none p-3 text-lg"
                placeholder="Enter description"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Category</label>
              <select
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="border font-medium px-3 border-gray-300 text-gray-900 outline-none text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
              >
                Select category
                <option>Select category</option>
                {categoriesName.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex justify-between">
              <div>
                <input
                  ref={imgRef}
                  onChange={handleChangeFile}
                  className="hidden"
                  type="file"
                />
                <Button
                  onClick={() => imgRef.current?.click()}
                  variant="contained"
                >
                  Image
                </Button>
              </div>
              <img
                src={`http://localhost:3000/uploads/${productData.img}`}
                alt=""
              />
              <div>
                <input
                  ref={optionalImgRef}
                  multiple
                  onChange={handleChangeMultiplyFiles}
                  className="hidden"
                  type="file"
                />
                <Button
                  onClick={() => optionalImgRef.current?.click()}
                  variant="contained"
                >
                  Optional Images
                </Button>
                <img
                  src={`http://localhost:3000/uploads/${productData.optionalImg}`}
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label className="text-black">Color</label>
              <select
                name="color"
                value={productData.color}
                onChange={handleInputChange}
                className="border font-medium px-3 border-gray-300 text-gray-900 outline-none text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-white"
              >
                Select color
                <option>Select color</option>
                {colors.map((color) => {
                  return (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-black">Material</label>
              <input
                name="material"
                type="text"
                value={productData.material}
                onChange={handleInputChange}
                className="w-full rounded-md outline-none p-3 text-lg"
                placeholder="Enter material"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-black">Rating</label>
              <input
                name="rating"
                type="number"
                value={productData.rating}
                onChange={handleInputChange}
                className="w-full rounded-md outline-none p-3 text-lg"
                placeholder="Enter rating"
              />
            </div>
          </div>
          <Button type="submit" variant="contained">
            Create product
          </Button>
        </form>
      </div>
    </div>
  );
}
