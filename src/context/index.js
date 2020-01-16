import React from "react";
import { AuthProvider } from "./auth";
import { UserProvider } from "./user";
export { useAuth } from "./auth";
export { useUser } from "./user";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>{children}</AuthProvider>
    </UserProvider>
  );
};
