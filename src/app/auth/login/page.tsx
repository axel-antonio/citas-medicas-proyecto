"use client";

import ClientSessionProvider from "@/components/ClientSessionProvider"; // Importa el nuevo componente
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react"; // Asegúrate de tener este import

interface FormData {
  email: string;
  password: string;
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);

    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    console.log(res);

    if (res?.error) {
      setError(res.error);
    } else {
      const session = await getSession(); // Obtiene la sesión actualizada
      console.log("Session after login:", session); // Verifica la sesión actualizada

      // Redirige según el rol del usuario
      if (session?.user?.role === "DOCTOR") {
        router.push("/dashboard/doctor");
      } else if (session?.user?.role === "PACIENTE") {
        router.push("/dashboard/client");
      } else if (session?.user?.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard");
      }
      router.refresh();
    }
  };

  return (
    <ClientSessionProvider> {/* Envuelve la página de Login */}
      <div className="h-[calc(100vh-7rem)] flex justify-center items-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/4">
          {error && (
            <p className="bg-red-500 text-lg text-white p-3 rounded mb-2">{error}</p>
          )}

          <h1 className="text-slate-200 font-bold text-4xl mb-4">Login</h1>

          <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
            Email:
          </label>
          <input
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="usuario@email.com"
          />

          {errors.email && (
            <span className="text-red-500 text-xs">{errors.email.message}</span>
          )}

          <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
            Password:
          </label>
          <input
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
            })}
            className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
            placeholder="******"
          />

          {errors.password && (
            <span className="text-red-500 text-xs">{errors.password.message}</span>
          )}

          <button className="w-full bg-blue-500 text-white p-3 rounded-lg mt-2">
            Login
          </button>
        </form>
      </div>
    </ClientSessionProvider>
  );
}

export default LoginPage;

