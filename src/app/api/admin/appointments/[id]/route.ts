// src/app/api/admin/appointments/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener una cita específica por ID
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const appointmentId = parseInt(params.id);

    if (isNaN(appointmentId)) {
      return NextResponse.json({ message: 'ID de cita no válido' }, { status: 400 });
    }

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        user: true,
        doctor: true,
      },
    });

    if (!appointment) {
      return NextResponse.json({ message: 'Cita no encontrada' }, { status: 404 });
    }

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.error('Error al obtener cita por ID:', error);
    return NextResponse.json({ message: 'Error al obtener la cita' }, { status: 500 });
  }
}
