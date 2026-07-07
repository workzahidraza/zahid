import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handlelogin } = useAuth();
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await handlelogin(username, password);
    setMessage(response.message);
    setIsSuccess(response.success);

    if (response.success) {
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };

  return (
    <main className="h-screen w-full bg-[#F3EFE4] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-70 text-center mb-6">
        <h1
          className="text-2xl font-semibold text-[#2F4A3C]"
          style={{ fontFamily: "'Source Serif 4', serif" }}
        >
          CollegeGram
        </h1>
        <p className="text-xs text-[#8C8479] mt-1">Welcome back</p>
      </div>

      {message && (
        <div
          className={`w-full max-w-70 text-center text-xs font-medium rounded-lg px-3 py-2 mb-3 ${
            isSuccess
              ? "bg-[#E4EBE3] text-[#2F4A3C]"
              : "bg-[#F7C1C1] text-[#791F1F]"
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full max-w-70 bg-[#FAF9F5] rounded-2xl px-5 py-6">
        <h2 className="text-center text-sm font-medium text-[#2A2A28] mb-5">
          Log in
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="username"
              className="block text-xs text-[#8C8479] mb-1"
            >
              Username
            </label>
            <input
              className="bg-[#F3EFE4] text-[#2A2A28] placeholder-[#8C8479] w-full rounded-lg px-3 py-2.5 border-none outline-none text-sm focus:ring-2 focus:ring-[#2F4A3C]/30"
              type="text"
              placeholder="your username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              name="username"
              required
            />
          </div>

          <div>
            <label
              htmlFor="userpassword"
              className="block text-xs text-[#8C8479] mb-1"
            >
              Password
            </label>
            <input
              className="bg-[#F3EFE4] text-[#2A2A28] placeholder-[#8C8479] w-full rounded-lg px-3 py-2.5 border-none outline-none text-sm focus:ring-2 focus:ring-[#2F4A3C]/30"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="your password"
              id="userpassword"
              name="userpassword"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#2F4A3C] w-full rounded-lg py-2.5 text-[#FAF9F5] font-medium text-sm mt-1 hover:bg-[#28402F] transition-colors disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>

      <p className="text-xs text-[#8C8479] mt-5">
        New here?{" "}
        <Link
          className="text-[#C97B4A] font-medium hover:text-[#b5693c] transition-colors"
          to="/register"
        >
          Create an account
        </Link>
      </p>
    </main>
  );
};

export default Login;
