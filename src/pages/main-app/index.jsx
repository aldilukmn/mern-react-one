import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components";
import { Home } from "../index";

const MainApp = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [exp, setExp] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getUser();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/v1/auth/token");
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      setUsername(decoded.username);
      setExp(decoded.exp);
      setIsLoggedIn(true);
    } catch (err) {
      if (err.response) {
        navigate("/login");
      }
    }
  };

  const axiosJwt = axios.create();

  axiosJwt.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      const conversion = exp * 1000;
      if (conversion < currentDate.getTime()) {
        const response = await axios.get("http://localhost:3001/v1/auth/token");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setUsername(decoded.username);
        setExp(decoded.exp);
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const getUser = async () => {
    try {
      const response = await axiosJwt.get("http://localhost:3001/v1/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
    } catch (err) {}
  };

  if (!isLoggedIn) {
    return <Link to="/login" />;
  }

  return (
    <div className="d-flex flex-column vh-100">
      <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home getUser={getUser} username={username} users={users} />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default MainApp;
