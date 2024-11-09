// src/app/dashboard/admin/components/AppointmentList/page.tsx
"use client";
import React, { useEffect, useState } from 'react';

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

const AppointmentList = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch('/api/admin/appointments');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Citas</h3>

  {/* Lista de Citas */}
  <ul className="space-y-4">
    {appointments.map((appointment) => (
      <li
        key={appointment.id}
        className="p-4 bg-gray-100 rounded-lg shadow flex justify-between items-center"
      >
        <div className="text-gray-700">
          <p className="font-semibold">
            {appointment.user.username} con {appointment.doctor.username}
          </p>
          <p className="text-sm text-gray-500">
            {appointment.date} a las {appointment.time}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            appointment.status === "CONFIRMED"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {appointment.status}
        </span>
      </li>
    ))}
  </ul>
</div>

  );
};

export default AppointmentList;
