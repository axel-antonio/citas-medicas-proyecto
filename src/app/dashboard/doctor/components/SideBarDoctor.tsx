"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { FiCalendar, FiUser, FiSettings } from "react-icons/fi"; // Íconos de react-icons

const menuItems = [
  { label: "Inicio", href: "/dashboard/doctor", icon: <FiUser /> },
  { label: "Mis Citas", href: "/dashboard/doctor/citas", icon: <FiCalendar /> },
  { label: "Calendario", href: "/dashboard/doctor/calendario", icon: <FiCalendar /> },
  { label: "Crear Paciente", href: "/dashboard/doctor/paciente", icon: <FiUser /> },
];

const SideBarDoctor = ({ initialSelected }) => {
  const [selectedMenu, setSelectedMenu] = useState(initialSelected || "Inicio");

  useEffect(() => {
    setSelectedMenu(initialSelected); // Actualiza la selección si `initialSelected` cambia
  }, [initialSelected]);

  return (
    // codigo para hacerlo responsive
    <aside className="w-64 bg-gray-800 p-6 text-white min-h-screen"> 
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
  );
};

export default SideBarDoctor;
