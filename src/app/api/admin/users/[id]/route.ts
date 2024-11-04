import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';
import db from '@/libs/db';

// GET /api/admin/users/:id - Obtener detalles de un usuario específico
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ message: 'Error fetching user' }, { status: 500 });
  }
}

// PUT /api/admin/users/:id - Actualizar información de un usuario
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const { email, username, password, role } = await req.json();

    const updatedData: any = {};
    if (email) updatedData.email = email;
    if (username) updatedData.username = username;
    if (role) updatedData.role = role;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    const updatedUser = await db.user.update({
      where: { id: userId },
      data: updatedData,
    });

    const { password: _, ...userWithoutPassword } = updatedUser;
    return NextResponse.json(userWithoutPassword, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}

// DELETE /api/admin/users/:id - Eliminar un usuario
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const userId = parseInt(params.id);
    if (isNaN(userId)) {
      return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await db.user.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}
