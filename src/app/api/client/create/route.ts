import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Crear una nueva cita
export async function POST(req: NextRequest) {
  try {
    const { userId, doctorId, date, time, status } = await req.json();

    if (!userId || !doctorId || !date || !time || !status) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        userId,
        doctorId,
        date: new Date(date),
        time,
        status,
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error('Error al crear cita:', error);
    return NextResponse.json({ message: 'Error al crear la cita' }, { status: 500 });
  }
}
