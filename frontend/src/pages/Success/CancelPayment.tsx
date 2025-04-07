import { Box, Button } from "@mui/material";
import { MdOutlineCancel } from "react-icons/md";
import { Link } from "react-router-dom";

export const CancelPayment = () => {
  return (
    <div className="flex flex-col gap-4 text-center py-20">
      <MdOutlineCancel className="text-red-500 block mx-auto" size={100} />
      <h1 className="text-4xl">Payment cancelled </h1>
      <p>Your payment has been canceled</p>
      <Link to="/">
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained">Homepage</Button>
        </Box>
      </Link>
    </div>
  );
};
