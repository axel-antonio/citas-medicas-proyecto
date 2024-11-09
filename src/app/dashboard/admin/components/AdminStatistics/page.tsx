"use client";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminStatistics = () => {
  const [statistics, setStatistics] = useState<{ totalUsers: number; totalAppointments: number }>({
    totalUsers: 0,
    totalAppointments: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await fetch('/api/admin/statistics');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setStatistics(data);
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    fetchStatistics();
  }, []);

  // Configuración de datos para el gráfico de barras
  const data = {
    labels: ['Usuarios', 'Citas'],
    datasets: [
      {
        label: 'Total',
        data: [statistics.totalUsers, statistics.totalAppointments],
        backgroundColor: ['#4F46E5', '#10B981'],
      },
    ],
  };

  // Opciones de configuración para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="p-6 bg-gray-800 rounded-md shadow-md text-white">
      <h3 className="text-2xl font-semibold mb-6 text-center">Estadísticas Generales</h3>

      {/* Gráfico de Barras */}
      <div className="mb-6">
        <Bar data={data} options={options} />
      </div>

      {/* Estadísticas Totales */}
      <div className="flex justify-between">
        <div className="bg-gray-700 p-4 rounded-lg w-1/2 mr-2 text-center">
          <p className="text-lg font-semibold">Total de Usuarios</p>
          <p className="text-3xl font-bold text-blue-400">{statistics.totalUsers}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg w-1/2 ml-2 text-center">
          <p className="text-lg font-semibold">Total de Citas</p>
          <p className="text-3xl font-bold text-green-400">{statistics.totalAppointments}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminStatistics;
