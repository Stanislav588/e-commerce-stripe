import { IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IoIosHeartEmpty } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";
import { useEffect, useState } from "react";
export const MobileMenu = () => {
  const userData = useSelector((state: any) => state.auth.user.data);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleChangeColor = () => {
      if (window.scrollY < 3650) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleChangeColor);

    return () => {
      window.removeEventListener("scroll", handleChangeColor);
    };
  }, [window.screenY]);

  return (
    <div
      className={`py-5 block md:hidden ${
        scrolled ? "bg-blue-500" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-around">
        <Link to="/">
          <IoHomeOutline
            className={`${!scrolled ? "text-black" : "text-white"}`}
            size={35}
          />
        </Link>
        <Link to={`${userData?.email ? "/wishlist" : "/auth/login"} `}>
          <IoIosHeartEmpty
            className={`${!scrolled ? "text-black" : "text-white"}`}
            cursor="pointer"
            size={35}
          />
        </Link>

        {userData?.email === "stason@gmail.com" ? (
          <Link to="/admin">
            <GrUserAdmin
              className={`${!scrolled ? "text-black" : "text-white"}`}
              size={25}
              cursor="pointer"
            />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
