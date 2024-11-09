import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import db from "@/libs/db";
import { Role } from "@prisma/client"; // Importa el enum Role de Prisma

interface RequestData {
  email: string;
  username: string;
  password: string;
  role: Role; // Ajusta el tipo de role para usar el enum de Prisma
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data: RequestData = await request.json();

    const userFound = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userFound) {
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    const usernameFound = await db.user.findUnique({
      where: {
        username: data.username,
      },
    });

    if (usernameFound) {
      return NextResponse.json(
        {
          message: "Username already exists",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await db.user.create({
      data: {
        username: data.username,
        email: data.email,
        password: hashedPassword,
        role: data.role as Role, // Asegúrate de tipar correctamente el rol como Role
      },
    });

    // Excluye la contraseña del objeto de respuesta
    const { password: _, ...user } = newUser;

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
