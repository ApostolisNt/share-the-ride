"use client";
import { useState } from "react";
import Login from "@components/Authentication/Login";
import SignUp from "@components/Authentication/SignUp";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="mt-20 flex flex-col items-center justify-center">
      <div className="mb-6 flex space-x-4">
        <button
          className={`rounded px-4 py-2 ${isLogin ? "bg-blue-500 text-white" : "border border-blue-500 bg-white text-blue-500"}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`rounded px-4 py-2 ${!isLogin ? "bg-blue-500 text-white" : "border border-blue-500 bg-white text-blue-500"}`}
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
      <div className="shadow-md w-full max-w-md rounded-lg bg-white p-8">
        {isLogin ? <Login /> : <SignUp />}
      </div>
    </div>
  );
}
