import React from "react";
import { AuthProvider } from "./Auth/actions";
import { UserProvider } from "./User/actions";
export { useAuth } from "./Auth/actions";
export { useUser } from "./User/actions";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <AuthProvider>{children}</AuthProvider>
    </UserProvider>
  );
};
