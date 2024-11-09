import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/db';

// Crear una nueva tarea
export async function POST(req: NextRequest) {
  try {
    const { doctorId, description, completed, dueDate } = await req.json();

    // Verificar los campos requeridos
    if (!doctorId || !description || typeof completed !== 'boolean' || !dueDate) {
      return NextResponse.json({ message: 'Todos los campos son obligatorios' }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        doctorId,
        description,
        completed,
        dueDate: new Date(dueDate),
      },
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    return NextResponse.json({ message: 'Error al crear la tarea' }, { status: 500 });
  }
}

// Modificar una tarea existente
export async function PUT(req: NextRequest) {
  try {
    const { id, description, completed, dueDate } = await req.json();

    // Verificar que el ID esté presente
    if (!id) {
      return NextResponse.json({ message: 'El ID de la tarea es obligatorio' }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        description,
        completed,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
    });

    return NextResponse.json(updatedTask, { status: 200 });
  } catch (error) {
    console.error('Error al modificar la tarea:', error);
    return NextResponse.json({ message: 'Error al modificar la tarea' }, { status: 500 });
  }
}

// Eliminar una tarea existente
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get('id');

    // Verificar que el ID esté presente
    if (!taskId) {
      return NextResponse.json({ message: 'El ID de la tarea es obligatorio' }, { status: 400 });
    }

    await prisma.task.delete({
      where: { id: parseInt(taskId) },
    });

    return NextResponse.json({ message: 'Tarea eliminada correctamente' }, { status: 204 });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    return NextResponse.json({ message: 'Error al eliminar la tarea' }, { status: 500 });
  }
}

// Obtener todas las tareas de un doctor específico
export async function GET(req: NextRequest) {
  try {
    const doctorId = req.nextUrl.searchParams.get('doctorId');

    if (!doctorId) {
      return NextResponse.json({ message: 'El ID del doctor es requerido' }, { status: 400 });
    }

    const tasks = await prisma.task.findMany({
      where: {
        doctorId: parseInt(doctorId, 10),
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error('Error al obtener las tareas del doctor:', error);
    return NextResponse.json({ message: 'Error al obtener las tareas del doctor' }, { status: 500 });
  }
}
