import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../lib/prisma';

// Obtener el detalle de una cita específica del doctor
export async function GET(req: NextRequest, { params }) {
  try {
    const { id } = params;
    const appointment = await prisma.appointment.findUnique({
      where: { id: parseInt(id) },
    });

    if (!appointment) {
      return NextResponse.json({ message: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json(appointment, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json({ message: "Error fetching appointment" }, { status: 500 });
  }
}

// Actualizar una cita específica
export async function PUT(req: NextRequest, { params }) {
  try {
    const { id } = params;
    const updateData = await req.json();

    const updatedAppointment = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return NextResponse.json(updatedAppointment, { status: 200 });
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json({ message: "Error updating appointment" }, { status: 500 });
  }
}

// Eliminar (o cancelar) una cita
export async function DELETE(req: NextRequest, { params }) {
  try {
    const { id } = params;

    await prisma.appointment.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: "Appointment deleted" }, { status: 204 });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    return NextResponse.json({ message: "Error deleting appointment" }, { status: 500 });
  }
}
