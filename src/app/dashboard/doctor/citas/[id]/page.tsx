"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EditarCitaProps {
  params: Promise<{ id: string }>;
}

export default function EditarCita({ params }: EditarCitaProps) {
  const router = useRouter();
  const [cita, setCita] = useState<any>(null);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    status: "",
  });
  const [id, setId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function obtenerId() {
      const resolvedParams = await params;
      setId(resolvedParams.id);
    }
    obtenerId();
  }, [params]);

  useEffect(() => {
    async function fetchCita() {
      if (!id) return;

      try {
        const response = await fetch(`/api/doctor/citas?id=${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setCita(data);
        setFormData({
          date: new Date(data.date).toISOString().split("T")[0],
          time: data.time,
          status: data.status,
        });
      } catch (error) {
        console.error("Error fetching cita:", error);
      }
    }

    fetchCita();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/doctor/citas?id=${id}`, {
        method: "PUT",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        router.push("/dashboard/doctor/citas");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar cita:", errorData.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al actualizar cita:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/doctor/citas?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/dashboard/doctor/citas");
      } else {
        const errorData = await response.json();
        console.error("Error al eliminar cita:", errorData.message || "Error desconocido");
      }
    } catch (error) {
      console.error("Error al eliminar cita:", error);
    }
  };

  const handleExit = () => {
    router.push("/dashboard/doctor/citas");
  };

  if (!cita) return <div>Cargando...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Editar Cita</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Hora</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Estado</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="border rounded px-3 py-2 w-full"
            required
          >
            <option value="PENDING">PENDING</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="CANCELED">CANCELED</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => setIsModalOpen(true)}
          >
            Eliminar Cita
          </button>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={handleExit}
          >
            Salir
          </button>
        </div>
      </form>

      {/* Modal de confirmación */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">¿Estás seguro?</h2>
            <p className="mb-4">¿Deseas eliminar esta cita de forma permanente?</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handleDelete();
                }}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
