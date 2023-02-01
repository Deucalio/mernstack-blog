import React from "react";
import { useEffect, useRef, useState } from "react";

const Login = ({ closeForm, setAdminLoggedIn }) => {
  const form = useRef(null);
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    if (formData.username === "") {
      return usernameInput.current.focus();
    } else if (formData.password === "") {
      return passwordInput.current.focus();
    }

    const req = await fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    const res = await req.json();
    if (res.status === "ok") {
      setAdminLoggedIn(true);
    } else {
      return alert("Incorrect Username Or Password");
    }
  };

  useEffect(() => {
    let anim;
    anim = setTimeout(() => {
      form.current.classList.remove("opacity-0");
      document.body.classList.add("overflow-y-hidden");

      form.current.classList.add("translate-y-6");
    }, 200);

    return () => {
      clearTimeout(anim);
    };
  });

  return (
    <div
      ref={form}
      className="opacity-0 transition-all duration-700 absolute inset-0 top-36 z-50 mx-auto flex h-80 w-72 flex-col gap-4 rounded-sm border-2 border-[#0f0e0e] bg-[#0f0e0e] p-8 shadow-lg sm:left-1/4 md:left-1/3 md:mx-0 md:w-96 md:-translate-x-6 lg:h-[50vh] xl:left-1/4 xl:translate-x-1/2"
    >
      <div className="flex flex-wrap items-center justify-between">
        <p className="text-2xl font-normal">Login</p>
        <p onClick={closeForm} className="text-4xl font-light cursor-pointer">
          &times;
        </p>
      </div>
      <input
        ref={usernameInput}
        onChange={handleChange}
        className="mt-6 w-52 rounded-sm border-0 bg-[#1f2424] p-1 text-base tracking-wide placeholder:text-base placeholder:text-[#ECECEC]/30 sm:w-auto lg:w-80 2xl:text-lg"
        type="text"
        placeholder="Username: "
        name="username"
      />
      <input
        ref={passwordInput}
        onChange={handleChange}
        className="w-52 rounded-sm border-0 bg-[#1f2424] p-1 text-base tracking-wide placeholder:text-base placeholder:text-[#ECECEC]/30 sm:w-auto lg:w-80 2xl:text-lg"
        type="password"
        placeholder="Password: "
        name="password"
      />
      <button
        onClick={handleLogin}
        className="my-6 ml-3 w-32 cursor-pointer rounded-sm border-2 border-[#ECECEC] p-1 text-center shadow-xl transition-all duration-1000 hover:bg-[#ECECEC]/25"
      >
        Login
      </button>
    </div>
  );
};

export default Login;
