import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener el historial médico de un cliente
export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json({ message: 'El ID del cliente es obligatorio' }, { status: 400 });
    }

    const medicalHistory = await prisma.medicalHistory.findMany({
      where: {
        patientId: parseInt(clientId),
      },
      include: {
        doctor: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    });

    if (medicalHistory.length === 0) {
      return NextResponse.json({ message: 'No se encontró historial médico para este cliente' }, { status: 404 });
    }

    return NextResponse.json(medicalHistory, { status: 200 });
  } catch (error) {
    console.error('Error al obtener historial médico del cliente:', error);
    return NextResponse.json({ message: 'Error al obtener historial médico' }, { status: 500 });
  }
}
