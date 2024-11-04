import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Crear un nuevo historial médico
export async function POST(req: NextRequest) {
  try {
    const { patientId, doctorId, notes, date } = await req.json();

    if (!patientId || !doctorId || !notes || !date) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const newMedicalHistory = await prisma.medicalHistory.create({
      data: {
        patientId,
        doctorId,
        notes,
        date: new Date(date),
      },
    });

    return NextResponse.json(newMedicalHistory, { status: 201 });
  } catch (error) {
    console.error('Error al crear historial médico:', error);
    return NextResponse.json({ message: 'Error al crear el historial médico' }, { status: 500 });
  }
}

// Modificar un historial médico existente
export async function PUT(req: NextRequest) {
  try {
    const { id, notes, date } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'El ID del historial médico es obligatorio' }, { status: 400 });
    }

    const updatedMedicalHistory = await prisma.medicalHistory.update({
      where: { id: parseInt(id) },
      data: {
        notes,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(updatedMedicalHistory, { status: 200 });
  } catch (error) {
    console.error('Error al modificar historial médico:', error);
    return NextResponse.json({ message: 'Error al modificar el historial médico' }, { status: 500 });
  }
}

// Eliminar un historial médico existente
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const historyId = searchParams.get('id');

    if (!historyId) {
      return NextResponse.json({ message: 'El ID del historial médico es obligatorio' }, { status: 400 });
    }

    await prisma.medicalHistory.delete({
      where: { id: parseInt(historyId) },
    });

    return NextResponse.json({ message: 'Historial médico eliminado correctamente' }, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar historial médico:', error);
    return NextResponse.json({ message: 'Error al eliminar el historial médico' }, { status: 500 });
  }
}
