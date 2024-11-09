// src/app/dashboard/admin/page.tsx
import React from 'react';
import UserList from './components/UserList/page';
import AppointmentList from './components/AppointmentList/page';
import AdminStatistics from './components/AdminStatistics/page';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
  {/* Sidebar de navegación */}
  <nav className="sidebar w-full md:w-1/5 h-auto md:h-full bg-gray-800 p-6 shadow-lg fixed md:relative z-10">
    <h2 className="text-2xl font-bold mb-8 text-blue-400">Admin Dashboard</h2>
    <ul className="space-y-4">
      <li>
        <a href="#users" className="block py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors">
          Gestión de Usuarios
        </a>
      </li>
      <li>
        <a href="#appointments" className="block py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors">
          Gestión de Citas
        </a>
      </li>
      <li>
        <a href="#statistics" className="block py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors">
          Estadísticas Generales
        </a>
      </li>
    </ul>
  </nav>

  {/* Contenido principal */}
  <main className="content w-full md:ml-[20%] p-6 md:p-10 mt-[60px] md:mt-0">
    <section id="users" className="mb-12">
      <h2 className="text-2xl font-semibold text-blue-300 border-b-2 border-blue-500 pb-2 mb-6">
        Gestión de Usuarios
      </h2>
      <UserList />
    </section>

    <section id="appointments" className="mb-12">
      <h2 className="text-2xl font-semibold text-blue-300 border-b-2 border-blue-500 pb-2 mb-6">
        Gestión de Citas
      </h2>
      <AppointmentList />
    </section>

    <section id="statistics">
      <h2 className="text-2xl font-semibold text-blue-300 border-b-2 border-blue-500 pb-2 mb-6">
        Estadísticas Generales
      </h2>
      <AdminStatistics />
    </section>
  </main>
</div>



  );
};

export default AdminDashboard;