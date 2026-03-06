import Link from "next/link"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-blue-600"> CampCare </h1>
      <div className="flex items-center gap-6">

        <Link href="/" className="text-gray-600 hover:text-blue-600">
          Home
        </Link>

        <Link href="/login" className="text-gray-600 hover:text-blue-600">
          Login
        </Link>

        <Link href="/signup">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default Navbar