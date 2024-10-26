// src/app/api/admin/appointments/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener todas las citas
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        user: true,
        doctor: true,
      },
    });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error('Error en la API de citas (GET):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Actualizar una cita
export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'Falta el ID de la cita para actualizar.' }, { status: 400 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: updateData,
    });
    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error('Error en la API de citas (PUT):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// Cancelar una cita
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const appointmentId = searchParams.get('appointmentId');

    if (!appointmentId) {
      return NextResponse.json({ message: 'Falta el ID de la cita para eliminar.' }, { status: 400 });
    }

    await prisma.appointment.delete({
      where: { id: parseInt(appointmentId) },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error('Error en la API de citas (DELETE):', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
