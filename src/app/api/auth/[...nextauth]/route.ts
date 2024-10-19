import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from '@/libs/db';
import bcrypt from 'bcrypt';
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { Role } from "@prisma/client"; // Enum del rol desde Prisma

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password", placeholder: "*****" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email or password not provided");
        }

        // Encuentra el usuario en la base de datos
        const userFound = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!userFound) throw new Error("No user found");

        // Verifica la contraseña
        const matchPassword = await bcrypt.compare(credentials.password, userFound.password);

        if (!matchPassword) throw new Error("Wrong password");

        // Retorna el usuario con el id convertido a string
        return {
          id: userFound.id.toString(),
          name: userFound.username,
          email: userFound.email,
          role: userFound.role as Role,  // Tipo explícito del rol
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.role = user.role; // Almacena el rol en el token JWT
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token.role) {
        session.user.role = token.role ?? 'USER';  // Asigna un rol por defecto
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
