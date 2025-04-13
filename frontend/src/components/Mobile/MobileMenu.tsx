import { IoHomeOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { IoIosHeartEmpty } from "react-icons/io";
import { GrUserAdmin } from "react-icons/gr";

export const MobileMenu = () => {
  const userData = useSelector((state: any) => state.auth.user.data);

  return (
    <div className={"py-5 block md:hidden bg-white"}>
      <div className="flex items-center justify-around">
        <Link to="/">
          <IoHomeOutline className="text-black" size={35} />
        </Link>
        <Link to={`${userData?.email ? "/wishlist" : "/auth/login"} `}>
          <IoIosHeartEmpty className="text-black" cursor="pointer" size={35} />
        </Link>

        {userData?.email === "stason@gmail.com" ? (
          <Link to="/admin">
            <GrUserAdmin className="text-black" size={25} cursor="pointer" />
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
