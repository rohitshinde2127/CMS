'use client';

import { useState } from "react";
import Link from "next/link";

export default function Signup() {

  const [data, setData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {

      const res = await fetch(
        "https://cams-backend-6rzs.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            role: data.role,
            password: data.password
          })
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Signup failed");
        return;
      }

      alert("Account created successfully");

      setData({
        name: "",
        email: "",
        role: "",
        password: "",
        confirmPassword: ""
      });

    } catch (error) {

      console.error("Signup error:", error);
      alert("Server connection error. Please check backend.");

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
            src="/medical-technology.jpg"
            className="h-full w-full object-cover"
            alt="medical"
          />
        </div>

        {/* Form */}
        <div className="p-10">

          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Create Account
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>

            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={data.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={data.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Role</label>
              <select
                name="role"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={data.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="doctor">Doctor</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            <div>
              <label>Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={data.password}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg"
                value={data.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold"
            >
              {loading ? "Creating..." : "Sign Up"}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?
              <Link href="/login" className="text-blue-600 font-semibold ml-1">
                Login
              </Link>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}