'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);
    setResponse("");

    try {

      const res = await fetch(
        "https://cams-backend-6rzs.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );

      const result = await res.json();

      if (!res.ok) {
        setResponse(result.message || "Invalid email or password");
        return;
      }

      setResponse("Login successful");
const role = result.user.role;

if (role === "admin") {
 router.push("/admin");
}
else if (role === "doctor") {
 router.push("/doctor");
}
else if (role === "volunteer") {
 router.push("/volunteer");
}
      else {
        setResponse("Invalid role returned from server");
      }

    } catch (error) {

      console.error("Login error:", error);
      setResponse("Server connection error");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-teal-200 p-6">

      <div className="bg-white shadow-2xl rounded-xl grid md:grid-cols-2 max-w-4xl w-full overflow-hidden">

        {/* Image */}
        <div className="hidden md:block">
          <img
            src="/medical-login.jpg"
            className="h-full w-full object-cover"
            alt="login"
          />
        </div>

        {/* Form */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Login
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label className="text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {response && (
              <p className="text-center text-sm text-red-600">
                {response}
              </p>
            )}

            <p className="text-center text-sm mt-4">
              If you don't have an account?
              <Link href="/signup" className="text-blue-600 ml-1 font-semibold">
                Sign Up
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}