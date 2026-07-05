// import React from "react";
// import { Link } from "react-router-dom";
// const Login = () => {
//   return (
//     <>
//       <main className="h-screen w-full bg-[#2E3532] flex justify-center items-center">
//         <div className="center max-h-[35vh] max-w-[75vw] bg-[#8B2635] rounded-xl  flex items-center justify-around flex-col px-3 py-5">
//           <h1 className="text-4xl font-bold text-[#E0E2DB] mb-3">Login</h1>
//           <form className="flex flex-col justify-between items-center gap-3">
//             <input
//               className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
//               type="text"
//               placeholder="enter your username"
//               id="username"
//               name="username"
//             />
//             {/* <input
//               className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
//               type="email"
//               placeholder="enter your email"
//               id="useremail"
//               name="useremail"
//             /> */}
//             <input
//               className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 border-none outline-none"
//               type="password"
//               placeholder="enter your password"
//               id="userpassword"
//               name="userpassword"
//             />
//             <button className="bg-[#E0E2DB]  w-full rounded-md px-1.5 py-1 text-[#8B2635] font-semibold text-md ">
//               Login
//             </button>
//           </form>
//           <h3 className="mt-4 w-full text-left text-[#E0E2DB]">
//             if not registered?{" "}
//             <Link
//               className="text-[#FFD166] hover:text-[#FFE08A] font-semibold transition-colors duration-200"
//               to="/Register"
//             >
//               Register
//             </Link>
//           </h3>
//         </div>
//       </main>
//     </>
//   );
// };

// export default Login;

//update
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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

      <div className="w-full max-w-70 bg-[#FAF9F5] rounded-2xl px-5 py-6">
        <h2 className="text-center text-sm font-medium text-[#2A2A28] mb-5">
          Log in
        </h2>

        <form className="flex flex-col gap-4">
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
              name="username"
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
              placeholder="your password"
              id="userpassword"
              name="userpassword"
            />
          </div>

          <button className="bg-[#2F4A3C] w-full rounded-lg py-2.5 text-[#FAF9F5] font-medium text-sm mt-1 hover:bg-[#28402F] transition-colors">
            Log in
          </button>
        </form>
      </div>

      <p className="text-xs text-[#8C8479] mt-5">
        New here?{" "}
        <Link
          className="text-[#C97B4A] font-medium hover:text-[#b5693c] transition-colors"
          to="/Register"
        >
          Create an account
        </Link>
      </p>
    </main>
  );
};

export default Login;
