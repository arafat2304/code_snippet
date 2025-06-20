import React, { useState} from "react";
import AuthLayout from "../components/AuthLAyout.jsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e)=>{
     e.preventDefault();
    try{
      
      const response =await  axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/login`,{
        email,
        password
      })

      if(response.status==200){
        localStorage.setItem("token",response.data.token);
        navigate("/home");
      }

      

    }catch(err){
      err.response?.data?.msg ? setError(err.response.data.msg) : setError("Login failed");
    }
  }

  return (
    <AuthLayout title="Login to Your Account">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <span className="text-red-500 mt-5 text-lg text-center">
          {error} 
        </span>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded"
          
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        Don't have an account?{" "}
        <a href="/signup" className="text-indigo-600 hover:underline">
          Sign up
        </a>
      </p>
    </AuthLayout>
  );
};

export default LoginPage;
