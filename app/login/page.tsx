'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
    role: ""
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await fetch("http://172.31.69.168:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      if (result.role === "admin") {
        router.push("/admin");
      }
      else if (result.role === "doctor") {
        router.push("/doctor");
      }
      else if (result.role === "user") {
        router.push("/user");
      }
      else {
        alert("Invalid login");
      }
    } catch (error) {
      setResponse("Something went wrong");
      console.error(error);
    }
  };
  return (
     
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-blue-400 to-teal-200 p-6">

      <div className="bg-white shadow-2xl rounded-xl grid md:grid-cols-2 max-w-4xl w-full overflow-hidden">

        {/* Image Section */}
        <div className="hidden md:block">
          <img src="/medical-login.jpg"
            className="h-full w-full object-cover" />
        </div>

        {/* Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* Email */}
            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={data.email}
                onChange={handleChange} />
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              Login
            </button>

            {/* Response Message */}
            {response && (
              <p className="text-center text-sm text-green-600">
                {response}
              </p>
            )}

            {/* Signup Link */}
            <p className="text-center text-sm mt-4">
              If you don't have an account?
              <Link href="/signup" className="text-blue-600 ml-1 font-semibold">
                SignUp
              </Link>
            </p>

          </form>

        </div>
      </div>
    </div>
  );
}