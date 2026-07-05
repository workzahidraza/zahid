import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const Register = () => {
  const [username, setUsername] = useState("");
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await handleRegister(username, useremail, password);
    setMessage(response.message);
    setIsSuccess(response.success);

    if (response.success) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };
  return (
    <>
      <main className="h-screen w-full bg-[#2E3532] flex flex-col gap-1 justify-center items-center">
        {message && (
          <p
            className={`mt-2 text-center font-medium ${
              isSuccess
                ? "text-green-400"
                : "text-red-300 "
            }`}
          >
            {message}
          </p>
        )}
        <div className="center max-h-[35vh] max-w-[75vw] bg-[#8B2635] rounded-xl  flex items-center justify-around flex-col px-3 py-5">
          <h1 className="text-4xl font-bold text-[#E0E2DB] mb-3">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-between items-center gap-3"
          >
            <input
              className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="enter your username"
              id="username"
              name="username"
            />
            <input
              className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
              type="email"
              value={useremail}
              onChange={(e) => {
                setUseremail(e.target.value);
              }}
              placeholder="enter your email"
              id="useremail"
              name="useremail"
            />
            <input
              className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="enter your password"
              id="userpassword"
              name="userpassword"
            />
            <button className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 text-[#8B2635] font-semibold text-md ">
              Register
            </button>
          </form>
          <h3 className="mt-4 w-full text-left text-[#E0E2DB]">
            if already registered?{" "}
            <Link
              className="text-[#FFD166] hover:text-[#FFE08A] font-semibold transition-colors duration-200"
              to="/login"
            >
              login
            </Link>
          </h3>
        </div>
      </main>
    </>
  );
};

export default Register;
