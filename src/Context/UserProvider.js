import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const getUserFromToken = async () => {
    const localToken = JSON.parse(localStorage.getItem("userInfo"));
    if (!token) {
      if (localToken) {
        setToken(localToken);
      }
      else {
        navigate("/");
        return;
      }
    }
    const data = {
      jwt: localToken
    };
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/checkToken`, data);
    setUser(response.data.user);
  };

  useEffect(() => {
    const localToken = JSON.parse(localStorage.getItem("userInfo"));
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        setToken,
        getUserFromToken
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
};

export default UserProvider;
