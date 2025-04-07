import { Button } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../../redux/authSlice";
import { AppDispatch } from "../../redux/types";

interface PopupProps {
  setIsOpenPopup: (value: boolean) => void;
}
export const SmallPopUp: FC<PopupProps> = ({ setIsOpenPopup }) => {
  const userData = useSelector((state: any) => state.auth.user.data);
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const handleLogOut = () => {
    dispatch(logOut());
    setIsOpenPopup(false);
  };

  const onClose = () => {
    setIsOpenPopup(false);
  };
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setIsVisible(true);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`bg-white hidden px-5 lg:block border rounded-md border-black p-2 absolute duration-300 ease-in-out top-20 h-[200px] min-w-[300px] right-16 z-50`}
    >
      {userData ? (
        <p>
          Logged in as{" "}
          <span className="text-blue-500">{userData?.fullName}</span>
        </p>
      ) : (
        <p>You logged out</p>
      )}
      <div className="flex mb-3 justify-end">
        <MdOutlineClose
          onClick={onClose}
          className="hover:text-blue-500 hover:opacity-100 opacity-35 transition-all cursor-pointer"
          size={35}
        />
      </div>
      <Link onClick={onClose} to="/cart">
        <p className="text-lg hover:bg-gray-100 px-4 py-1">Cart</p>
      </Link>
      <hr className="border-b border-b-gray-200" />
      <h1 className="text-center text-2xl">
        {userData?.email ? `Welcome ${userData?.fullName}` : ""}
      </h1>
      <Link to="auth/register">
        <div className="flex mt-8 justify-center">
          {userData?.email ? (
            <Button
              onClick={handleLogOut}
              sx={{ width: "50%" }}
              variant="contained"
            >
              Log Out
            </Button>
          ) : (
            <Button onClick={onClose} sx={{ width: "50%" }} variant="contained">
              Register
            </Button>
          )}
        </div>
      </Link>
    </div>
  );
};
