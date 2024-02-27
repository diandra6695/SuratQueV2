"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const router = useRouter();
  const login = async () => {
    try {
      let { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: "hexcon117@gmail.com",
        password: "test123",
      });
      if (dataUser) {
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <div className="flex flex-col gap-5 p-5 rounded-lg border">
        <div className="grid">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={data?.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid">
          <label htmlFor="email">Password</label>
          <input
            type="email"
            name="password"
            value={data?.password}
            onChange={handleChange}
          />
        </div>
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
};

export default Login;
