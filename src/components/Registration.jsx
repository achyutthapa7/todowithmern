import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Home from "./Home";
const Registration = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    userName: "",
    password: "",
    confirmPassword: "",
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
    const {
      firstName,
      lastName,
      emailAddress,
      userName,
      password,
      confirmPassword,
    } = formData;
    if (
      firstName != "" &&
      lastName != "" &&
      emailAddress != "" &&
      userName != "" &&
      password != "" &&
      confirmPassword != ""
    ) {
      if (password === confirmPassword) {
        if (password.length >= 8) {
          try {
            const response = await fetch(
              "http://localhost:4000/api/registration",
              {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify({
                  firstName,
                  lastName,
                  emailAddress,
                  userName,
                  password,
                  confirmPassword,
                }),
                credentials: "include",
              }
            );
            if (response.status === 400)
              toast.error(" try using different Email Address");
            if (response.status === 401)
              toast.error("try using another username");
            if (response.status === 200) {
              toast.success("You are registered successfully");
              navigate("/login");
            }
          } catch (error) {
            console.log("error is: " + error.message);
          }
        } else {
          toast.error("Password must be 8 character");
        }
      } else {
        toast.error("passwords don't match, please try again");
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
        <div className="w-full flex justify-center px-5">
          <form
            className="bg-white lg:w-3/4 md:w-3/4 w-full max-w-md rounded-lg p-6 shadow-md  z-50"
            onSubmit={handleSubmit}
          >
            <h1 className="text-center text-2xl mb-4">Registration</h1>
            <div className="mb-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.firstName}
                name="firstName"
                onChange={handleFormData}
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.lastName}
                name="lastName"
                onChange={handleFormData}
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.emailAddress}
                name="emailAddress"
                onChange={handleFormData}
              />
            </div>

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
                placeholder="Create a Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.password}
                name="password"
                onChange={handleFormData}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleFormData}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Register
            </button>

            <p className="mt-4 text-center text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-600">
                Login here
              </Link>
              .
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Registration;
