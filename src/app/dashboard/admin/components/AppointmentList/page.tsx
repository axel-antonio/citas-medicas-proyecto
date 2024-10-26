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
    <div>
      <h3>Citas</h3>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id}>
            {appointment.user.username} con {appointment.doctor.username} - {appointment.date} a las {appointment.time} ({appointment.status})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
