import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/v1/auth/register", { username, password });
      const responseData = response.data;
      alert(responseData.message);
      navigate("/login");
    } catch (err) {
      if (err.response) {
        const errData = err.response.data;
        alert(errData.message);
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
        <input type="text" className="form-control mb-3" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} />
        <input type="text" className="form-control mb-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <button className="btn btn-primary w-100" type="submit" onClick={onSubmit} disabled={isFormEmpty}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
