import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Obtener una notificación específica para un doctor
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const notificationId = parseInt(params.id);
    if (isNaN(notificationId)) {
      return NextResponse.json({ message: 'ID de notificación no válido' }, { status: 400 });
    }

    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });

    if (!notification) {
      return NextResponse.json({ message: 'Notificación no encontrada' }, { status: 404 });
    }

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.error('Error al obtener notificación:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}

// Eliminar (o marcar como leída) una notificación específica para un doctor
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const notificationId = parseInt(params.id);
    if (isNaN(notificationId)) {
      return NextResponse.json({ message: 'ID de notificación no válido' }, { status: 400 });
    }

    await prisma.notification.delete({
      where: { id: notificationId },
    });

    return NextResponse.json({ message: 'Notificación eliminada correctamente' }, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar notificación:', error);
    return NextResponse.json({ message: 'Error interno del servidor' }, { status: 500 });
  }
}
