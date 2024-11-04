import { NextResponse } from 'next/server';
import db from '@/libs/db';

// GET /api/patients/:id - Obtener un paciente por ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const patientId = parseInt(params.id);
    if (isNaN(patientId)) {
      return NextResponse.json({ message: 'ID de paciente no válido' }, { status: 400 });
    }

    const patient = await db.patient.findUnique({
      where: { id: patientId },
    });

    if (!patient) {
      return NextResponse.json({ message: 'Paciente no encontrado' }, { status: 404 });
    }

    return NextResponse.json(patient, { status: 200 });
  } catch (error) {
    console.error('Error al obtener paciente:', error);
    return NextResponse.json({ message: 'Error al obtener paciente' }, { status: 500 });
  }
}

// PUT /api/patients/:id - Actualizar un paciente
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const patientId = parseInt(params.id);
    if (isNaN(patientId)) {
      return NextResponse.json({ message: 'ID de paciente no válido' }, { status: 400 });
    }

    const { name, email, phone, doctorId } = await req.json();

    const updatedPatient = await db.patient.update({
      where: { id: patientId },
      data: {
        name,
        email,
        phone,
        doctorId,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(updatedPatient, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    return NextResponse.json({ message: 'Error al actualizar paciente' }, { status: 500 });
  }
}

// DELETE /api/patients/:id - Eliminar un paciente
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const patientId = parseInt(params.id);
    if (isNaN(patientId)) {
      return NextResponse.json({ message: 'ID de paciente no válido' }, { status: 400 });
    }

    await db.patient.delete({
      where: { id: patientId },
    });

    return NextResponse.json({ message: 'Paciente eliminado correctamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al eliminar paciente:', error);
    return NextResponse.json({ message: 'Error al eliminar paciente' }, { status: 500 });
  }
}
