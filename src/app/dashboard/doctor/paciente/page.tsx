"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SideBarDoctor from '../components/SideBarDoctor';

const NewPaciente = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [doctors, setDoctors] = useState([]); // Lista de doctores
  const [error, setError] = useState('');
  const router = useRouter();

  // Fetch de los doctores al montar el componente
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('/api/admin/users');
        const data = await response.json();
        // Filtrar usuarios con el rol 'DOCTOR'
        const doctorsOnly = data.filter((user) => user.role === 'DOCTOR');
        setDoctors(doctorsOnly);
      } catch (error) {
        console.error('Error al obtener doctores:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/patients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          phone, 
          doctorId: Number(doctorId) 
        }),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok) {
        router.push('/dashboard/doctor');
      } else {
        setError(data.message || 'Error al crear paciente');
      }
    } catch (error) {
      console.error('Error al crear paciente:', error);
      setError('Error al crear paciente');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
  {/* Sidebar */}
  <SideBarDoctor initialSelected="Crear Paciente" />

  {/* Contenido principal */}
  <div className="flex flex-col items-center justify-center w-full p-6">
    <h1 className="text-2xl font-bold mb-4">Crear Nuevo Paciente</h1>
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700">Nombre</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Teléfono</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Doctor</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Selecciona un doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.username}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Crear Paciente
      </button>
    </form>
  </div>
</div>

  );
};

export default NewPaciente;
