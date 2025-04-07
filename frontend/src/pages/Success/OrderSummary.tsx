import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/types";
import { fetchSuccessPayment } from "../../redux/paymentSlice";

export const OrderSummary = () => {
  // const dispatch = useDispatch<AppDispatch>();

  // useEffect(() => {
  //   dispatch(fetchSuccessPayment());
  // }, [dispatch]);
  return <div>Hello</div>;
};
