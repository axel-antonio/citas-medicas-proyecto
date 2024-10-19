"use client"; // Esto marca el componente como Client Component

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface ClientSessionProviderProps {
  children: ReactNode;
}

export default function ClientSessionProvider({ children }: ClientSessionProviderProps): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}