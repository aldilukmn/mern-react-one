import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login, Register } from "../index";
import { Footer, Header } from "../../components";

const MainApp = () => {
  return (
    <div className="d-flex flex-column vh-100">
        <Header />
      <div className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
        <Footer/>
    </div>
  );
};

export default MainApp;
