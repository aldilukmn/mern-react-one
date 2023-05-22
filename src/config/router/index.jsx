import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainApp } from "../../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainApp />}>
          <Route/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
