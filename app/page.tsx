import Navbar from "@/components/ui/Navbar"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="text-center py-20 bg-gray-100">
        <h1 className="text-5xl font-bold text-blue-600">
          Camp Management System </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Manage medical camps and patient records digitally.
        </p>

        <div className="mt-6">
          <Link href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            Get Started
            </Link>
        </div>
        </div>

    </>
  )
}