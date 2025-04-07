import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch, CartProductDetails } from "../../redux/types";
import { useEffect, useState } from "react";
import { fetchCartProduct, fetchDeleteProduct } from "../../redux/cartSlice";
import { RiCloseFill } from "react-icons/ri";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { RootState } from "../../redux/store";
import { fetchAddPayment } from "../../redux/paymentSlice";
export const Cart = () => {
  const [sum, setSum] = useState<number>(0);

  window.scrollTo(0, 0);

  const dispatch = useDispatch<AppDispatch>();

  const cart: CartProductDetails[] = useSelector(
    (state: RootState) => state.cart.cartProducts.data
  );

  const handlePayment = async () => {
    dispatch(fetchAddPayment({ products: cart }));
  };

  useEffect(() => {
    const cartSum = cart?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setSum(cartSum);
  }, [cart]);
  useEffect(() => {
    const getCart = async () => {
      const res = await dispatch(fetchCartProduct());
      console.log(res);
    };
    getCart();
  }, [dispatch]);

  const removeProduct = (cartItem: string) => {
    if (window.confirm("Are you sure you want to delete the product?"))
      dispatch(fetchDeleteProduct(cartItem));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6"
    >
      <h1 className="text-center mb-14 lg:mb-28 text-xl">
        <Link to="/">
          <span className="text-red-500">Home</span> /
        </Link>
        <Link to="/cart">
          <span className="text-blue-500 font-semibold"> Cart</span>
        </Link>
      </h1>
      {!cart?.length ? (
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-xl">Your cart is empty</h1>
          <Link to="/">
            <Button variant="contained">Go to shop</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-20 lg:gap-2 lg:grid lg:grid-cols-[60%_40%]">
          <div className="flex gap-4 flex-col">
            {cart?.length > 0 &&
              cart?.map((cartProduct, index: number) => {
                return (
                  <div key={index} className="grid grid-cols-3">
                    <Link
                      to={`/products/${cartProduct.product._id}/${cartProduct.product.gender}`}
                    >
                      <div className="w-[70%]">
                        <img
                          className="w-full"
                          src={cartProduct?.product?.img}
                          alt={cartProduct?.product?.model}
                        />
                      </div>
                    </Link>
                    <div>
                      <div className="flex flex-col gap-1 md:gap-3 min-w-[150px]">
                        <div>
                          <p className="text-lg">
                            {cartProduct?.product?.brand}
                          </p>
                          <p className="text-md font-semibold">
                            {cartProduct?.product?.model}
                          </p>
                        </div>
                        <p className="text-xl font-semibold">
                          {cartProduct?.product?.price} $
                        </p>
                        <div>
                          Color:
                          {cartProduct?.product?.color.map(
                            (col: string, index: any) => (
                              <span key={index} className="pl-2">
                                {col}
                                {index < cartProduct?.product?.color.length - 1
                                  ? " /"
                                  : ""}
                              </span>
                            )
                          )}
                        </div>
                        Size: {cartProduct?.size}
                      </div>
                      <p>
                        Quantity :{" "}
                        <span className="font-semibold">
                          {cartProduct?.quantity}
                        </span>
                      </p>
                    </div>
                    <p>
                      <RiCloseFill
                        onClick={() => removeProduct(cartProduct?._id)}
                        className="hover:bg-slate-300 ml-4 rounded-md cursor-pointer"
                        size={45}
                      />
                    </p>
                  </div>
                );
              })}
          </div>

          <div className="bg-white py-7 flex flex-col max-h-[530px]">
            <div className="p-7">
              <h1 className="text-3xl">Order Summary</h1>
              <hr className="border-b mt-9 border-b-gray-300" />
              <h1 className="my-3 text-xl">
                Items: <span>{cart?.length}</span>
              </h1>
              {/* <form>
                <div className="flex border justify-between w-full py-1 rounded-md border-gray-300">
                  <input
                    className="border-none w-full px-5 outline-none bg-none"
                    placeholder="Promo code"
                  />
                  <Button
                    type="submit"
                    sx={{ width: "40%" }}
                    variant="contained"
                  >
                    Submit
                  </Button>
                </div>
              </form> */}
              <div>
                <div className="flex mt-6 justify-between">
                  <h1 className="font-semibold">Subtotal</h1>
                  <span className="text-lg">$ {sum}</span>
                </div>
                <div className="flex  justify-between">
                  <h1 className="font-semibold">Sales Tax</h1>
                  <span className="text-lg">$ 0</span>
                </div>
                <div className="flex  justify-between">
                  {/* <h1 className="font-semibold">Coupon Code</h1> */}
                  {/* <span className="text-lg">None</span> */}
                </div>
                <div className="flex items-center mt-7 justify-between">
                  <h1 className="font-semibold">Grand Total</h1>
                  <span className="text-3xl font-light">$ {sum}</span>
                </div>
              </div>
            </div>

            <Button
              onClick={handlePayment}
              sx={{
                marginTop: "30px",
                width: "80%",
                py: "10px",
                display: "block",
                margin: "0 auto",
              }}
              variant="contained"
            >
              Check out
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
