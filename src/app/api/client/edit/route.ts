import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Editar una cita existente
export async function PUT(req: NextRequest) {
  try {
    const { id, ...updateData } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'El ID de la cita es obligatorio para la actualización' }, { status: 400 });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    return NextResponse.json({ message: 'Error al actualizar la cita' }, { status: 500 });
  }
}
