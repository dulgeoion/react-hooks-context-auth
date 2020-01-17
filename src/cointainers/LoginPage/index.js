import React, { useState } from "react";
import { Input } from "../../components/Input";
import { useAuth } from "../../context";
import "./styles.scss";

export const LoginPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <div className="login-page">
      <span>Email</span>
      <Input value={email} type="email" onChange={e => setEmail(e.target.value)} />
      <span>Passowrd</span>
      <Input value={password} type="password" onChange={e => setPassword(e.target.value)} />
      <Input
        type="submit"
        onClick={() => {
          setError("");
          return signIn(email, password).catch(e => setError(e.message));
        }}
      />
      <span className="login-page__error">{error}</span>
    </div>
  );
};
