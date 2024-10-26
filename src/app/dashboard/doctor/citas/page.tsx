"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MisCitas() {
  const [citas, setCitas] = useState<any[]>([]); // Para almacenar las citas
  const router = useRouter(); // Necesario para redirigir

  useEffect(() => {
    async function fetchCitas() {
      try {
        const response = await fetch("/api/doctor/citas");
        if (!response.ok) {
          throw new Error("Error al obtener las citas");
        }
        const data = await response.json();
        setCitas(data); // Guardamos las citas en el estado
      } catch (error) {
        console.error("Error fetching citas:", error);
      }
    }

    fetchCitas(); // Llamamos a la API al cargar el componente
  }, []);

  // Función para redirigir a la página de edición
  const handleEdit = (id: number) => {
    router.push(`/dashboard/doctor/citas/${id}`); // Redirige a la ruta de edición con el ID de la cita
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Mis Citas</h1>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Paciente</th>
            <th className="py-2 px-4 border-b text-center">Fecha</th>
            <th className="py-2 px-4 border-b text-center">Hora</th>
            <th className="py-2 px-4 border-b text-center">Estado</th>
            <th className="py-2 px-4 border-b text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {citas.map((cita) => (
            <tr key={cita.id}>
              <td className="py-2 px-4 border-b text-center">{cita.user?.name}</td>
              <td className="py-2 px-4 border-b text-center">
                {new Date(cita.date).toLocaleDateString()}
              </td>
              <td className="py-2 px-4 border-b text-center">{cita.time}</td>
              <td
                className={`py-2 px-4 border-b text-center ${
                  cita.status === "CONFIRMED" ? "text-green-600" : "text-yellow-600"
                }`}
              >
                {cita.status}
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(cita.id)}
                  className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
