import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener las prescripciones de un cliente
export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json({ message: 'El ID del cliente es obligatorio' }, { status: 400 });
    }

    const prescriptions = await prisma.prescription.findMany({
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

    if (prescriptions.length === 0) {
      return NextResponse.json({ message: 'No se encontraron prescripciones para este cliente' }, { status: 404 });
    }

    return NextResponse.json(prescriptions, { status: 200 });
  } catch (error) {
    console.error('Error al obtener prescripciones del cliente:', error);
    return NextResponse.json({ message: 'Error al obtener las prescripciones' }, { status: 500 });
  }
}
