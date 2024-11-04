// src/app/api/admin/appointments/route.ts
<<<<<<< HEAD
import { NextResponse } from 'next/server';
=======
import { NextRequest, NextResponse } from 'next/server';
>>>>>>> 27b90e5 (Configuracion de APIs)
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
<<<<<<< HEAD
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
=======
    return NextResponse.json({ message: 'Error al obtener citas' }, { status: 500 });
  }
}

// Crear una nueva cita
export async function POST(req: NextRequest) {
  try {
    const { userId, doctorId, date, time, status } = await req.json();

    if (!userId || !doctorId || !date || !time || !status) {
      return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 });
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
    console.error('Error en la API de citas (POST):', error);
    return NextResponse.json({ message: `Error al crear cita: ${error.message}` }, { status: 500 });
>>>>>>> 27b90e5 (Configuracion de APIs)
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
<<<<<<< HEAD
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
=======
    return NextResponse.json({ message: 'Error al actualizar cita' }, { status: 500 });
>>>>>>> 27b90e5 (Configuracion de APIs)
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
<<<<<<< HEAD
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
=======
    return NextResponse.json({ message: 'Error al eliminar cita' }, { status: 500 });
>>>>>>> 27b90e5 (Configuracion de APIs)
  }
}
