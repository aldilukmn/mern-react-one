import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const message = (icon, title) => {
    Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).fire({
      icon: icon,
      title: title,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/v1/auth/register", { username, email, password });
      const responseData = response.data;
      message("success", responseData.message);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        const errData = err.response.data;
        message("error", errData.message);
      } else {
        console.log(err);
      }
    }
  };

  const isFormEmpty = username === "" || password === "";

  return (
    <div className="container-fluid mt-5">
      <div className="border rounded p-4 shadow-sm mx-auto w-25">
        <h4 className="mb-3 text-center">Register</h4>
        <form onSubmit={onSubmit}>
          <input type="text" className="form-control mb-3" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
          <input type="text" className="form-control mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
          <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <button className="btn btn-primary w-100" type="submit" disabled={isFormEmpty}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
