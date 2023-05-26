import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login, MainApp, Register } from "../../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainApp />}>
          <Route/>
        </Route>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
