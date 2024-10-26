"use client";

import { useState } from "react";
import Link from "next/link";
import { FiCalendar, FiUser, FiSettings } from "react-icons/fi"; // Íconos de react-icons (puedes instalarlos con npm install react-icons)

const menuItems = [
  { label: "Inicio", href: "/dashboard/doctor", icon: <FiUser /> },
  { label: "Mis Citas", href: "/dashboard/doctor/citas", icon: <FiCalendar /> },
  { label: "Calendario", href: "/dashboard/doctor/calendario", icon: <FiCalendar /> },
  { label: "Disponibilidad", href: "/dashboard/doctor/disponibilidad", icon: <FiSettings /> },
  { label: "Mi Perfil", href: "/dashboard/doctor/perfil", icon: <FiUser /> },
];

export default function DoctorDashboard(): JSX.Element {
  const [selectedMenu, setSelectedMenu] = useState("Inicio");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 p-6 text-white">
        <h2 className="text-2xl font-bold mb-8">Doctor Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block py-2 px-4 rounded hover:bg-gray-700 ${
                    selectedMenu === item.label ? "bg-gray-700" : ""
                  }`}
                  onClick={() => setSelectedMenu(item.label)}
                >
                  <span className="flex items-center gap-x-2">
                    {item.icon}
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">{selectedMenu}</h1>
          <button className="bg-red-500 text-white py-2 px-4 rounded">Cerrar sesión</button>
        </header>

        <div>
          {/* Aquí va el contenido específico según la selección del menú */}
          {selectedMenu === "Inicio" && (
            <p className="text-lg text-gray-700">
              Aquí podrás gestionar tus citas, ver tu calendario y ajustar tu disponibilidad.
            </p>
          )}
          {selectedMenu === "Mis Citas" && <p>Gestión de citas pendientes.</p>}
          {selectedMenu === "Calendario" && <p>Vista de calendario.</p>}
          {selectedMenu === "Disponibilidad" && <p>Ajusta tu disponibilidad.</p>}
          {selectedMenu === "Mi Perfil" && <p>Configura tu perfil.</p>}
        </div>
      </main>
    </div>
  );
}
