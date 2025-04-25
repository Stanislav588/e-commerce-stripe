import { IoMdCheckmark } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/types";
import { fetchCleanCart } from "../../redux/cartSlice";

export default function SuccessPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [sum, setSum] = useState<number>(0);
  const productsForPayment = useSelector(
    (state: RootState) => state.cart.cartProducts.data
  );
  const handleCleanCart = () => {
    dispatch(fetchCleanCart());
  };
  console.log(productsForPayment);
  useEffect(() => {
    const cartSum = productsForPayment?.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    setSum(cartSum as number);
  }, [productsForPayment]);
  return (
    <div className="py-20">
      <div className="flex flex-col gap-3 items-center text-center">
        <IoMdCheckmark className="bg-blue-500 w-14 h-14 lg:w-28 lg:h-28 rounded-full text-white" />
        <h1 className="text-4xl">Thank you for your purchase</h1>
        <p>We've received your order will ship in 5-7 business days.</p>
      </div>

      <div className="bg-white block mx-auto sm:max-w-[90%]  md:max-w-[60%] lg:max-w-[50%] mt-8 p-5">
        <h1 className="text-2xl mb-2 ">Order Summary</h1>
        <div className="flex  flex-col gap-3">
          {productsForPayment &&
            productsForPayment.length > 0 &&
            productsForPayment?.map((product) => {
              return (
                <div key={product._id}>
                  <>
                    <div className="grid grid-cols-3 items-center lg:grid-cols-4 gap-6 ">
                      <img
                        className="w-full h-full"
                        src={product?.product?.img}
                      />
                      <div>
                        <p>{product?.product.brand}</p>
                        <p>{product?.product.model}</p>
                      </div>

                      <p>$ {product?.product.price}</p>
                    </div>
                    <hr className="border-b-2 border-b-gray-100" />
                  </>
                </div>
              );
            })}
          <div className="flex justify-between text-xl">
            <h1>Total amount</h1>
            <p className="font-semibold">$ {sum}</p>
          </div>
        </div>
      </div>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
      >
        <Link to="/">
          <Button onClick={handleCleanCart} variant="contained">
            Back to home
          </Button>
        </Link>
      </Box>
    </div>
  );
}
