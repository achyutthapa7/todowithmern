import React from "react";
import { Link } from "react-router-dom";
const Nav = ({ userName, isLoggedIn, setIsLoggedIn }) => {
  const logout = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/logout", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      if (res.ok) setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full flex justify-around  py-5 ">
      <Link to={"/"}>
        <div>{userName}</div>
      </Link>
      {isLoggedIn ? (
        <Link onClick={logout}>
          <button className="px-7 py-2 text-white hover:bg-red-800 active:bg-green-700 rounded-lg">
            Logout
          </button>
        </Link>
      ) : (
        <div className="flex ">
          <Link to={"/login"}>
            <button className="px-7 py-2 text-white hover:bg-green-600 active:bg-green-500 rounded-lg">
              Login
            </button>
          </Link>
          <Link to={"/registration"}>
            <button className="px-7 py-2 text-white hover:bg-green-600 active:bg-green-500 rounded-lg">
              SignUp
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
