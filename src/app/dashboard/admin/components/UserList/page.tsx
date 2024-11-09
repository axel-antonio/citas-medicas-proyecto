// src/app/dashboard/admin/components/UserList/page.tsx
"use client";
import React, { useEffect, useState } from 'react';

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filterRole, setFilterRole] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = filterRole ? users.filter(user => user.role === filterRole) : users;

  return (
   <div className="p-6 bg-white rounded-lg shadow-md">
  <h3 className="text-2xl font-semibold mb-4 text-gray-800">Usuarios</h3>

  {/* Botones para Filtrar Usuarios por Rol */}
  <div className="flex space-x-4 mb-4">
    <button
      onClick={() => setFilterRole(null)}
      className="bg-gray-300 text-gray-700 py-1 px-4 rounded hover:bg-gray-400 transition-colors"
    >
      Todos
    </button>
    <button
      onClick={() => setFilterRole('DOCTOR')}
      className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600 transition-colors"
    >
      Doctores
    </button>
    <button
      onClick={() => setFilterRole('CLIENT')}
      className="bg-green-500 text-white py-1 px-4 rounded hover:bg-green-600 transition-colors"
    >
      Clientes
    </button>
    <button
      onClick={() => setFilterRole('ADMIN')}
      className="bg-purple-500 text-white py-1 px-4 rounded hover:bg-purple-600 transition-colors"
    >
      Administradores
    </button>
  </div>

  {/* Lista de Usuarios Filtrada */}
  <ul className="divide-y divide-gray-200">
    {filteredUsers.map((user) => (
      <li key={user.id} className="py-4 flex justify-between items-center">
        <div className="text-gray-700 font-medium">
          {user.username} <span className="text-sm text-gray-500">({user.role})</span>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => handleDelete(user.id)}
            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
          >
            Eliminar
          </button>
          <button
            onClick={() => handleEditRole(user.id, user.role === 'CLIENT' ? 'DOCTOR' : 'CLIENT')}
            className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition-colors"
          >
            Cambiar Rol
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>


  );

  async function handleDelete(id: number) {
    try {
      const response = await fetch(`/api/admin/users?id=${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete user');
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }

  async function handleEditRole(id: number, newRole: string) {
    try {
      const response = await fetch(`/api/admin/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, role: newRole }),
      });
      if (!response.ok) throw new Error('Failed to update role');
      const updatedUser = await response.json();
      setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }
};

export default UserList;
