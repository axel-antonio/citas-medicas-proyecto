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
    <div>
      <h3>Usuarios</h3>
      {/* Botones para Filtrar Usuarios por Rol */}
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setFilterRole(null)}>Todos</button>
        <button onClick={() => setFilterRole('DOCTOR')}>Doctores</button>
        <button onClick={() => setFilterRole('CLIENT')}>Clientes</button>
        <button onClick={() => setFilterRole('ADMIN')}>Administradores</button>
      </div>
      {/* Lista de Usuarios Filtrada */}
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.username} ({user.role})
            <button onClick={() => handleDelete(user.id)}>Eliminar</button>
            <button onClick={() => handleEditRole(user.id, user.role === 'CLIENT' ? 'DOCTOR' : 'CLIENT')}>
              Cambiar Rol
            </button>
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
