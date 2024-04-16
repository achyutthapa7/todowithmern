import React, { useEffect, useState } from "react";
import Registration from "./components/Registration";
import Nav from "./components/Nav";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
const App = () => {
  const [isLoggedIn, setIsLogged] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const auth = async () => {
      const res = await fetch("http://localhost:4000/api/authentication", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      setUserName(data.users.userName);
      setIsLogged(true);
    };
    auth();
  });
  return (
    <div className="bg-blue-700 w-full h-screen">
      <Nav
        userName={userName}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLogged}
      />
      <Routes>
        <Route
          path={"/"}
          element={<Home userName={userName} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path={"/registration"}
          element={
            <Registration setIsLoggedIn={setIsLogged} isLoggedIn={isLoggedIn} />
          }
        />
        <Route
          path={"/login"}
          element={
            <Login setIsLoggedIn={setIsLogged} isLoggedIn={isLoggedIn} />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
