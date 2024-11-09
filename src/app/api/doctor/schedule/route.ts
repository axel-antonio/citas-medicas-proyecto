// src/app/api/doctor/schedule/route.ts
import { NextRequest, NextResponse } from 'next/server';

import prisma from '../../../../../lib/prisma';




// Obtener el calendario completo del doctor
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get('doctorId');

    if (!doctorId) {
      return NextResponse.json({ message: 'Falta el ID del doctor' }, { status: 400 });
    }

    const schedule = await prisma.schedule.findMany({
      where: { doctorId: parseInt(doctorId) },
    });
    return NextResponse.json(schedule, { status: 200 });
  } catch (error) {
    console.error('Error al obtener el calendario del doctor:', error);
    return NextResponse.json({ message: 'Error al obtener el calendario' }, { status: 500 });
  }
}

// Crear o actualizar la disponibilidad del doctor
export async function POST(req: NextRequest) {
  try {
    const { doctorId, availableDays, startTime, endTime } = await req.json();

    if (!doctorId || !availableDays || !startTime || !endTime) {
      return NextResponse.json({ message: 'Todos los campos son requeridos' }, { status: 400 });
    }

    const schedule = await prisma.schedule.upsert({
      where: { doctorId: parseInt(doctorId) },
      update: {
        availableDays,
        startTime,
        endTime,
      },
      create: {
        doctorId: parseInt(doctorId),
        availableDays,
        startTime,
        endTime,
      },
    });

    return NextResponse.json(schedule, { status: 201 });
  } catch (error) {
    console.error('Error al crear o actualizar disponibilidad:', error);
    return NextResponse.json({ message: 'Error al crear o actualizar disponibilidad' }, { status: 500 });
  }
}
