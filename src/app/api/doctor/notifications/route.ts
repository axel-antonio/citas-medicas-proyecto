// src/app/api/doctor/notifications/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener todas las notificaciones del doctor
export async function GET(req: NextRequest) {
  const doctorId = req.nextUrl.searchParams.get('doctorId');
  
  if (!doctorId) {
    return NextResponse.json({ message: 'Falta el ID del doctor' }, { status: 400 });
  }

  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: parseInt(doctorId) },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    console.error('Error al obtener notificaciones:', error);
    return NextResponse.json({ message: 'Error al obtener notificaciones' }, { status: 500 });
  }
}

// Crear una nueva notificación para un doctor
export async function POST(req: NextRequest) {
  try {
    const { userId, message } = await req.json();

    if (!userId || !message) {
      return NextResponse.json({ message: 'El ID del usuario y el mensaje son obligatorios' }, { status: 400 });
    }

    const newNotification = await prisma.notification.create({
      data: {
        userId,
        message,
        read: false, // La notificación se marca como no leída inicialmente
      },
    });

    return NextResponse.json(newNotification, { status: 201 });
  } catch (error) {
    console.error('Error al crear notificación:', error);
    return NextResponse.json({ message: 'Error al crear notificación' }, { status: 500 });
  }
}
