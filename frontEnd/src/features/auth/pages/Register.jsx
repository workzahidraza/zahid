import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <>
      <main className="h-screen w-full bg-[#2E3532] flex justify-center items-center">
        <div className="center max-h-[35vh] max-w-[75vw] bg-[#8B2635] rounded-xl  flex items-center justify-around flex-col px-3 py-5">
          <h1 className="text-4xl font-bold text-[#E0E2DB] mb-3">Register</h1>
          <form className="flex flex-col justify-between items-center gap-3">
            <input
              className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
              type="text"
              placeholder="enter your username"
              id="username"
              name="username"
            />
            <input
              className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
              type="email"
              placeholder="enter your email"
              id="useremail"
              name="useremail"
            />
            <input
              className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
              type="password"
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
