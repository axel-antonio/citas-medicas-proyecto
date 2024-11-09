import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Crear una nueva prescripción médica
export async function POST(req: NextRequest) {
  try {
    const { patientId, doctorId, medication, dosage, date } = await req.json();

    if (!patientId || !doctorId || !medication || !dosage || !date) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const newPrescription = await prisma.prescription.create({
      data: {
        patientId,
        doctorId,
        medication,
        dosage,
        date: new Date(date),
      },
    });

    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error) {
    console.error('Error al crear prescripción:', error);
    return NextResponse.json({ message: 'Error al crear la prescripción' }, { status: 500 });
  }
}

// Modificar una prescripción existente
export async function PUT(req: NextRequest) {
  try {
    const { id, medication, dosage, date } = await req.json();

    if (!id) {
      return NextResponse.json({ message: 'El ID de la prescripción es obligatorio' }, { status: 400 });
    }

    const updatedPrescription = await prisma.prescription.update({
      where: { id: parseInt(id) },
      data: {
        medication,
        dosage,
        date: date ? new Date(date) : undefined,
      },
    });

    return NextResponse.json(updatedPrescription, { status: 200 });
  } catch (error) {
    console.error('Error al modificar prescripción:', error);
    return NextResponse.json({ message: 'Error al modificar la prescripción' }, { status: 500 });
  }
}

// Eliminar una prescripción existente
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const prescriptionId = searchParams.get('id');

    if (!prescriptionId) {
      return NextResponse.json({ message: 'El ID de la prescripción es obligatorio' }, { status: 400 });
    }

    await prisma.prescription.delete({
      where: { id: parseInt(prescriptionId) },
    });

    return NextResponse.json({ message: 'Prescripción eliminada correctamente' }, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar prescripción:', error);
    return NextResponse.json({ message: 'Error al eliminar la prescripción' }, { status: 500 });
  }
}
