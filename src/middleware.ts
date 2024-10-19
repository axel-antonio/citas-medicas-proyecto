import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt"; // Importar JWT correctamente

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req }); // Obtener el token JWT
    const url = req.nextUrl.clone();

    // Redirigir según el rol
    if (url.pathname.startsWith("/dashboard")) {
      if (token?.role === "DOCTOR") {
        url.pathname = "/dashboard/doctor";
      } else if (token?.role === "CLIENT") {
        url.pathname = "/dashboard/client";
      } else if (token?.role === "ADMIN") {
        url.pathname = "/dashboard/admin";
      } else {
        url.pathname = "/auth/login"; // Si no hay rol válido, redirige al login
      }
      return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Si no es ruta protegida, continuar normalmente
  },
  {
    callbacks: {
      authorized: ({ token }: { token: JWT | null }) => {
        // Solo autorizar si hay un token válido
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], // Aplicar el middleware a las rutas de dashboard
};
