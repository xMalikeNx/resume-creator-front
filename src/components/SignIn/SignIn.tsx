import React, { FC, FormEvent, useCallback, useState } from "react";
import { useStores } from "../../mst/rootStoreContext";

export const SignIn: FC = () => {
  const { auth } = useStores();
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const handleChange = useCallback(
    (evt: FormEvent) => {
      const { name, value } = evt.target as HTMLInputElement;
      setForm({ ...form, [name]: value });
    },
    [setForm, form]
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      auth.login(form.login, form.password);
    },
    [form, auth]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="login"
          type="text"
          value={form.login}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        <button>submit</button>
      </form>
    </div>
  );
};
