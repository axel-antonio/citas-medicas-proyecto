"use client"; // Añadir al principio del archivo para que sea un componente del cliente

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-12 py-4 shadow-lg">
  <h1 className="text-2xl font-bold tracking-wide text-blue-400">NextAuth</h1>

  <ul className="flex gap-4">
    {!session ? (
      <>
        <li>
          <Link href="/" className="text-white hover:text-blue-400 transition-colors">
            Home
          </Link>
        </li>
        <li>
          <button onClick={() => signIn()} className="text-white hover:text-blue-400 transition-colors">
            Login
          </button>
        </li>
        <li>
          <Link href="/auth/register" className="text-white hover:text-blue-400 transition-colors">
            Register
          </Link>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link
            href="/dashboard"
            className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition-colors shadow-md"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <button
            onClick={() => signOut()}
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition-colors shadow-md"
          >
            Logout
          </button>
        </li>
      </>
    )}
  </ul>
</nav>

  );
}

export default Navbar;
