import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

export default withAuth(
  async function middleware(req: NextRequest) {
    const token = await getToken({ req });
    const url = req.nextUrl.clone();

    // Solo aplicar lógica de redirección si hay un token válido
    if (token) {
      const userRole = token.role;
      const pathname = url.pathname;

      // Define la ruta correcta para cada rol
      const roleToPath: Record<string, string> = {
        DOCTOR: "/dashboard/doctor",
        CLIENT: "/dashboard/client",
        ADMIN: "/dashboard/admin",
      };

      // Verifica si el usuario tiene un rol válido antes de intentar acceder a roleToPath
      if (!userRole || !(userRole in roleToPath)) {
        // Si no tiene un rol válido o el rol no existe en roleToPath, redirigir al login
        return NextResponse.redirect("/auth/login");
      }

      // Verifica si el usuario está intentando acceder a una ruta de dashboard genérica
      if (pathname === "/dashboard" || pathname === "/dashboard/") {
        const targetPath = roleToPath[userRole];

        // Si la ruta a la que debe ir es diferente, redirige
        if (targetPath !== pathname) {
          url.pathname = targetPath;
          return NextResponse.redirect(url);
        }
      }

      // Verifica si el usuario está en la ruta incorrecta para su rol
      for (const [role, path] of Object.entries(roleToPath)) {
        // Si el rol del usuario no coincide con la ruta en la que se encuentra
        if (userRole === role && !pathname.startsWith(path)) {
          url.pathname = path; // Redirige a la ruta correcta
          return NextResponse.redirect(url);
        }
      }
    }

    // Si no está en una ruta protegida o no tiene un token válido, continuar normalmente
    return NextResponse.next();
  },
  {
    callbacks: {
      // Autoriza solo si hay un token
      authorized: ({ token }: { token: JWT | null }) => {
        return !!token; // Solo autorizar si el token es válido
      },
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"], // Aplica el middleware a todas las rutas de dashboard
};
