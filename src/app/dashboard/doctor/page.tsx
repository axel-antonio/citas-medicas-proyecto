"use client";

import { useState } from "react";
import AppointmentForm from "./components/AppointmentForm";
import SideBarDoctor from "./components/SideBarDoctor";


export default function DoctorDashboard(): JSX.Element {
  const [selectedMenu, setSelectedMenu] = useState("Inicio");

  return (
    <div className="flex flex-col md:flex-row h-screen">
  {/* Sidebar */}
  <SideBarDoctor initialSelected="Inicio" />

  {/* Main Content */}
  <main className="flex-1 bg-gray-100 p-6">
    <header className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">{selectedMenu}</h1>
    </header>

    <div>
      {/* Aquí va el contenido específico según la selección del menú */}
      {selectedMenu === "Inicio" && (
        <>
          <p className="text-lg text-gray-700">
            Aquí podrás gestionar tus citas, ver tu calendario y ajustar tu disponibilidad.
          </p>
          <AppointmentForm />
        </>
      )}
    </div>
  </main>
</div>

  );
}
