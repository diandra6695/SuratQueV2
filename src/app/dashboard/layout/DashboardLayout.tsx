"use client";
import useUser from "@/app/auth/hook/useUser";
import NavbarDashboard from "./components/NavbarDashboard";
import SidebarDashboard from "./components/SidebarDashboard";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { isFetching, data } = useUser();

  if (isFetching)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );

  return (
    <section>
      <div className="sidebar">
        <NavbarDashboard data={data} />
        <div className="flex bg-violet-50">
          <SidebarDashboard />
          <div className="mt-24 container min-h-screen mx-auto z-10 w-full">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
