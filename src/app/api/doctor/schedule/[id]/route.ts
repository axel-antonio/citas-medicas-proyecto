// src/app/api/doctor/schedule/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../lib/prisma';

// Obtener el horario de una semana específica para un doctor
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const doctorId = parseInt(params.id);

    if (isNaN(doctorId)) {
      return NextResponse.json({ message: 'ID de doctor no válido' }, { status: 400 });
    }

    const weeklySchedule = await prisma.schedule.findUnique({
      where: { doctorId },
    });

    if (!weeklySchedule) {
      return NextResponse.json({ message: 'Horario no encontrado' }, { status: 404 });
    }

    return NextResponse.json(weeklySchedule, { status: 200 });
  } catch (error) {
    console.error('Error al obtener horario semanal:', error);
    return NextResponse.json({ message: 'Error al obtener horario' }, { status: 500 });
  }
}
