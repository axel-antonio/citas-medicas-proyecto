"use client";
import React, { useEffect, useState } from 'react';

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

  return (
    <div className="p-6 bg-gray-800 rounded-md shadow-md">
      <h3 className="text-lg font-semibold mb-4 border-b-2 border-gray-600 pb-2">Estadísticas Generales</h3>
      <div className="space-y-2">
        <p className="text-base">
          <strong>Total de Usuarios:</strong> {statistics.totalUsers}
        </p>
        <p className="text-base">
          <strong>Total de Citas:</strong> {statistics.totalAppointments}
        </p>
      </div>
    </div>
  );
};

export default AdminStatistics;
