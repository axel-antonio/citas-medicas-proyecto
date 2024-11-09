import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Reprogramar una cita (cambiar fecha y hora)
export async function PATCH(req: NextRequest) {
  try {
    const { id, date, time } = await req.json();

    if (!id || !date || !time) {
      return NextResponse.json({ message: 'El ID de la cita, la nueva fecha y hora son obligatorios' }, { status: 400 });
    }

    const rescheduledAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        date: new Date(date),
        time,
      },
    });

    return NextResponse.json(rescheduledAppointment, { status: 200 });
  } catch (error) {
    console.error('Error al reprogramar cita:', error);
    return NextResponse.json({ message: 'Error al reprogramar la cita' }, { status: 500 });
  }
}
