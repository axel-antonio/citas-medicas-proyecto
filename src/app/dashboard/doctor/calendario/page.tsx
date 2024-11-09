"use client";

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import SideBarDoctor from "../components/SideBarDoctor";

interface Appointment {
  id: number;
  userId: number;
  doctorId: number;
  date: string; // ISO format date (yyyy-mm-dd)
  time: string; // Time as text (e.g., "12:00")
  status: string;
}

const CalendarioPage = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [occupiedTimes, setOccupiedTimes] = useState<string[]>([]); // Horas ocupadas para la fecha seleccionada

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/admin/appointments"); // Ajusta el endpoint según sea necesario
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error al obtener citas:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const dateString = date.toISOString().split("T")[0];

    // Filtrar citas confirmadas para la fecha seleccionada
    const appointmentsForDate = appointments
      .filter((appointment) => appointment.date.startsWith(dateString) && appointment.status === "CONFIRMED")
      .map((appointment) => appointment.time);

      console.log("Citas confirmadas para", dateString, ":", appointmentsForDate);


    // Definir todas las horas posibles
    const allTimes = [
      "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
    ];

    // Definir horas disponibles y ocupadas
    const availableTimes = allTimes.filter((time) => !appointmentsForDate.includes(time));
    setAvailableTimes(availableTimes);
    setOccupiedTimes(appointmentsForDate); // Guardar horas ocupadas
  };

  const tileClassName = ({ date }: { date: Date }) => {
    const dateString = date.toISOString().split("T")[0];
    return appointments.some(
      (appointment) => appointment.date.startsWith(dateString) && appointment.status === "CONFIRMED"
    )
      ? "highlight"
      : null;
  };

  return (
    <div className="flex bg-white">
    {/* Sidebar */}
    <SideBarDoctor initialSelected="Calendario" />
    
    {/* Contenido principal */}
    <div className="p-6 w-full max-w-4xl mx-auto min-h-screen flex flex-col items-center bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Calendario de Disponibilidad</h1>
    
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {/* Calendario */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/2">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
            tileClassName={tileClassName}
          />
        </div>
    
        {/* Horas Disponibles/Ocupadas */}
        <div className="flex-1 bg-white p-6 shadow-lg rounded-lg w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
            {selectedDate ? `Horas para ${selectedDate.toLocaleDateString()}` : "Seleccione una fecha"}
          </h2>
          <ul className="space-y-2">
            {availableTimes.length > 0 || occupiedTimes.length > 0 ? (
              ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                <li
                  key={time}
                  className={`p-2 rounded-lg text-center cursor-pointer ${
                    occupiedTimes.includes(time) ? "bg-red-200 text-red-700" : "bg-gray-50 text-gray-700 hover:bg-green-100"
                  }`}
                >
                  {time} {occupiedTimes.includes(time) && "(Ocupado)"}
                </li>
              ))
            ) : (
              <p className="text-red-500 text-center">No hay horas disponibles para esta fecha.</p>
            )}
          </ul>
        </div>
      </div>
    
      {/* Estilos personalizados */}
      <style jsx>{`
        .highlight {
          background: #ff6666;
          color: white !important;
          border-radius: 50%;
        }
      `}</style>
    </div>
  </div>
  

  );
};

export default CalendarioPage;
