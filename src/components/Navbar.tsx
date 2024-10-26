"use client"; // Añadir al principio del archivo para que sea un componente del cliente

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar(): JSX.Element {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Cargando...</div>;
  }

  return (
    <nav className="flex justify-between items-center bg-gray-950 text-white px-24 py-3">
      <h1 className="text-xl font-bold">NextAuth</h1>

      <ul className="flex gap-x-2">
        {!session ? (
          <>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <button onClick={() => signIn()} className="text-white">
                Login
              </button>
            </li>
            <li>
              <Link href="/auth/register">Register</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={() => signOut()} className="text-white">
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
