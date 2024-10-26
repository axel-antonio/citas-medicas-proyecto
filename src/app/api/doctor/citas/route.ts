import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/db";

// Obtener una cita específica o todas las citas
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    try {
      const citaId = parseInt(id);
      if (isNaN(citaId)) {
        return NextResponse.json({ error: "ID de cita inválido" }, { status: 400 });
      }

      const cita = await prisma.appointment.findUnique({
        where: { id: citaId },
        include: {
          user: true,
          doctor: true,
        },
      });

      if (!cita) {
        return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
      }

      return NextResponse.json(cita);
    } catch (error) {
      console.error("Error al obtener la cita:", error);
      return NextResponse.json({ error: "Error al obtener la cita" }, { status: 500 });
    }
  } else {
    try {
      const citas = await prisma.appointment.findMany({
        include: {
          user: true,
          doctor: true,
        },
      });
      return NextResponse.json(citas);
    } catch (error) {
      console.error("Error al obtener citas:", error);
      return NextResponse.json({ error: "Error al obtener citas" }, { status: 500 });
    }
  }
}

// Editar una cita específica
export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID de cita es requerido" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { date, time, status } = body;

    const updatedCita = await prisma.appointment.update({
      where: { id: parseInt(id) },
      data: {
        date: new Date(date),
        time,
        status,
      },
    });

    return NextResponse.json(updatedCita);
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    return NextResponse.json({ error: "Error al actualizar la cita" }, { status: 500 });
  }
}

// Cancelar una cita (actualizar el estado a "CANCELED")
export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID de cita es requerido" }, { status: 400 });
  }

  try {
    const citaId = parseInt(id);
    if (isNaN(citaId)) {
      console.error("ID de cita inválido");
      return NextResponse.json({ error: "ID de cita inválido" }, { status: 400 });
    }

    const updatedCita = await prisma.appointment.update({
      where: { id: citaId },
      data: {
        status: "CANCELED",
      },
    });

    return NextResponse.json(updatedCita);
  } catch (error) {
    console.error("Error al cancelar la cita:", error);
    return NextResponse.json({ error: "Error al cancelar la cita" }, { status: 500 });
  }
}

// Eliminar una cita completamente
export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID de cita es requerido" }, { status: 400 });
  }

  try {
    const citaId = parseInt(id);
    if (isNaN(citaId)) {
      return NextResponse.json({ error: "ID de cita inválido" }, { status: 400 });
    }

    await prisma.appointment.delete({
      where: { id: citaId },
    });

    return NextResponse.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    return NextResponse.json({ error: "Error al eliminar la cita" }, { status: 500 });
  }
}
