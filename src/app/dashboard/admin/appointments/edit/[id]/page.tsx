// src/app/dashboard/admin/appointments/edit/[id]/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Appointment {
  id: number;
  date: string;
  time: string;
  status: string;
  user: {
    username: string;
  };
  doctor: {
    username: string;
  };
}

const EditAppointment = ({ params }: { params: { id: string } }) => {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('PENDING');
  const router = useRouter();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`/api/admin/appointments?id=${params.id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAppointment(data);
        setDate(data.date);
        setTime(data.time);
        setStatus(data.status);
      } catch (error) {
        console.error('Error fetching appointment:', error);
      }
    };

    fetchAppointment();
  }, [params.id]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/appointments`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: appointment?.id, date, time, status }),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      router.push('/dashboard/admin#appointments');
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard/admin#appointments');
  };

  if (!appointment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-800 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-4">Editar Cita</h3>
      <div className="mb-4">
        <label className="block mb-2">Fecha:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Hora:</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Estado:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 rounded-md bg-gray-700 border border-gray-600"
        >
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Guardar Cambios
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditAppointment;
