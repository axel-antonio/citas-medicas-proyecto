import { NextRequest, NextResponse } from 'next/server';


// Obtener todas las citas del doctor
export async function GET(req: NextRequest) {
  try {
    const doctorId = req.nextUrl.searchParams.get("doctorId");
    if (!doctorId) {
      return NextResponse.json({ message: "Doctor ID is required" }, { status: 400 });
    }

    const appointments = await prisma.appointment.findMany({
      where: { doctorId: parseInt(doctorId) },
    });
    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ message: "Error fetching appointments" }, { status: 500 });
  }
}

// Crear una nueva cita
export async function POST(req: NextRequest) {
  try {
    const { userId, doctorId, date, time, status } = await req.json();

    if (!userId || !doctorId || !date || !time || !status) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        userId,
        doctorId,
        date: new Date(date),
        time,
        status,
      },
    });

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json({ message: "Error creating appointment" }, { status: 500 });
  }
}
