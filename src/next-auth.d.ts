import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      role?: string | null; // Aseguramos que role es parte de user
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role?: string; // Añade el campo role a la interface de User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string; // Añade el campo role a la interface de JWT
  }
}
