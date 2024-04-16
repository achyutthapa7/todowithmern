import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home";

const Login = ({ isLoggedIn, setIsLoggedIn = () => {} }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
  };

  const sendRequest = async () => {
    const { userName, password } = formData;
    if (userName != "" && password != "") {
      try {
        const response = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ userName, password }),
          credentials: "include",
        });
        if (response.status === 404) toast.error("User is not found");
        if (response.status === 400) toast.error("Invalid Credentials");
        if (response.status === 200) {
          const data = await response.json();
          toast.success(`You Logged in as: ${data.user.userName}`);
          setIsLoggedIn(true);
          navigate("/");
        }
      } catch (error) {
        console.log("error is: " + error.message);
      }
    } else {
      toast.error("All fields are required");
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <Home />
      ) : (
        <div className="w-full flex justify-center items-center px-5">
          <form
            className="bg-white lg:w-3/4 md:w-3/4 w-full max-w-md rounded-lg p-6 shadow-md z-50 mt-20"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-2xl mb-4">Login</h1>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.userName}
                name="userName"
                onChange={handleFormData}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.password}
                name="password"
                onChange={handleFormData}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Login
            </button>

            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link to={"/registration"} className="text-blue-600">
                Register here
              </Link>
              .
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
