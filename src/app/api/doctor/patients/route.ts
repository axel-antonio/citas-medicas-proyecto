import { NextResponse } from 'next/server';
import db from '@/libs/db';

// GET /api/patients - Obtener todos los pacientes
export async function GET() {
  try {
    const patients = await db.patient.findMany();
    return NextResponse.json(patients, { status: 200 });
  } catch (error) {
    console.error('Error al obtener pacientes:', error);
    return NextResponse.json({ message: 'Error al obtener pacientes' }, { status: 500 });
  }
}

// POST /api/patients - Crear un nuevo paciente
export async function POST(req: Request) {
  try {
    const { name, email, phone, doctorId } = await req.json();

    if (!name || !email || !doctorId) {
      return NextResponse.json({ message: 'Nombre, email y doctorId son obligatorios' }, { status: 400 });
    }

    const newPatient = await db.patient.create({
      data: {
        name,
        email,
        phone,
        doctorId,
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error('Error al crear paciente:', error);
    return NextResponse.json({ message: 'Error al crear paciente' }, { status: 500 });
  }
}
