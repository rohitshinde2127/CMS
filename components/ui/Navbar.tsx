import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-between p-4 bg-blue-500 text-white">
    <h1 className="text-xl font-bold">Camp</h1>

    <div className="space-x-4">
    <Link href="/" className="font-bold">Home</Link>
    <Link href="/login" className="font-bold">Login</Link>
    </div>
    </nav>
  );
}