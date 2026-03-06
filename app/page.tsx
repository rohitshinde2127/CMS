import Navbar from "@/components/Navbar"

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-24 px-6">

        <h1 className="text-5xl font-bold text-gray-800">
          Camp Management System
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Manage healthcare camps, patient registrations, and volunteer activities easily in one platform.
        </p>

        <div className="flex gap-4 mt-8">

          <a
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
          >
            Get Started
          </a>

          <a
            href="/signup"
            className="border border-gray-400 px-6 py-3 rounded-md hover:bg-gray-100"
          >
            Create Account
          </a>

        </div>

      </section>

    </main>
  )
}