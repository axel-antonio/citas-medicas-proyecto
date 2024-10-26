// src/app/dashboard/admin/page.tsx
import React from 'react';
import UserList from './components/UserList/page';
import AppointmentList from './components/AppointmentList/page';
import AdminStatistics from './components/AdminStatistics/page';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard flex min-h-screen bg-gray-900 text-white">
      <nav className="sidebar w-1/5 bg-gray-800 p-4">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
        <ul className="space-y-4">
          <li><a href="#users" className="hover:text-blue-400">Gestión de Usuarios</a></li>
          <li><a href="#appointments" className="hover:text-blue-400">Gestión de Citas</a></li>
          <li><a href="#statistics" className="hover:text-blue-400">Estadísticas Generales</a></li>
        </ul>
      </nav>
      <main className="content w-4/5 p-8">
        <section id="users" className="mb-12">
          <h2 className="text-xl font-semibold border-b-2 border-gray-600 pb-2 mb-4">Gestión de Usuarios</h2>
          <UserList />
        </section>
        <section id="appointments" className="mb-12">
          <h2 className="text-xl font-semibold border-b-2 border-gray-600 pb-2 mb-4">Gestión de Citas</h2>
          <AppointmentList />
        </section>
        <section id="statistics">
          <h2 className="text-xl font-semibold border-b-2 border-gray-600 pb-2 mb-4">Estadísticas Generales</h2>
          <AdminStatistics />
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;