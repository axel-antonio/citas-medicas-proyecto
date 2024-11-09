import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Obtener todas las citas de un cliente
export async function GET(req: NextRequest) {
  try {
    const clientId = req.nextUrl.searchParams.get('clientId');

    if (!clientId) {
      return NextResponse.json({ message: 'El ID del cliente es obligatorio' }, { status: 400 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: parseInt(clientId),
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

    if (appointments.length === 0) {
      return NextResponse.json({ message: 'No se encontraron citas para este cliente' }, { status: 404 });
    }

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error('Error al obtener citas del cliente:', error);
    return NextResponse.json({ message: 'Error al obtener citas' }, { status: 500 });
  }
}
