'use client';
import { useState } from "react";
import Link from "next/link";

export default function Login(){

  const [data, setData] = useState({
    email: "",
    password: ""
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
      const createUser = await fetch("http://172.31.69.168:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const result = await createUser.json();

      // show message from API
      setResponse(result.message || "User registered successfully");

    } catch (error) {
      setResponse("Something went wrong");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">

      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login 
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full mt-1 px-4 text-black ounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={data.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="w-full mt-14 text-black  rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              value={data.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition duration-300"
          >
            LOGIN
          </button>

          {/* Response Message */}
          {response && (
            <p className="text-green-600 text-center font-medium">
              {response}
            </p>
          )}

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Not Have Account ,Register?
            <span className="text-purple-600 font-semibold cursor-pointer ml-1">

            <Link href={'/'}> SignUp</Link>
            </span>
          </p>

        </form>
      </div>

    </div>
  );
}