"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useUser from "./auth/hook/useUser";

export default function Home() {
  const { data } = useUser();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-5 justify-center items-center flex-col">
        <h3 className="text-3xl font-semibold">Under Construction</h3>
        <Link href="/auth">
          <Button className="col-6" variant="default">
            {data?.email ? "dashboard" : "login"}
          </Button>
        </Link>
      </div>
      <div className="col-6 auth-widget"></div>
    </div>
  );
}
