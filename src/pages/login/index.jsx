import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const message = (icon, title) => {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    }).fire({
      icon: icon,
      title: title
    });
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/v1/auth/login", { username, password });
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userId", response.data.userId);
      const responseData = response.data;
      message("success", responseData.message);
      navigate("/");
    } catch (err) {
      if (err.response) {
        const errData = err.response.data;
        message("error", errData.message);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <div className="container-fluid mt-5">
      <div className="border rounded p-4 shadow-sm mx-auto w-25">
        <h4 className="mb-3 text-center">Login</h4>
        <form onSubmit={onSubmit} method="post">
          <input type="text" className="form-control mb-3" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
          <input type="password" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
