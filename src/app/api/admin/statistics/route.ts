// src/app/api/admin/statistics/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener estadísticas
export async function GET() {
  try {
    const totalUsers = await prisma.user.count();
    const totalAppointments = await prisma.appointment.count();

    return NextResponse.json({ totalUsers, totalAppointments }, { status: 200 });
  } catch (error) {
    console.error('Error en la API de estadísticas (GET):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
