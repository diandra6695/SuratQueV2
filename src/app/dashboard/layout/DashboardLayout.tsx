"use client";
import useUser from "@/app/auth/hook/useUser";
import NavbarDashboard from "./components/NavbarDashboard";
import SidebarDashboard from "./components/SidebarDashboard";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import NextNProgress from "nextjs-progressbar";
import logoLoader from "../../../../public/assets/images/logo/logoLoader.svg";
import Image from "next/image";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { isFetching, data } = useUser();

  if (isFetching)
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Image
          width={70}
          src={logoLoader}
          alt="logoLoader"
          className="animated-image"
        />
      </div>
    );

  return (
    <section className="">
      <NextNProgress options={{ showSpinner: false }} />
      <div className="">
        <div className="flex">
          <SidebarDashboard data={data} />
          <div className="container min-h-screen mx-auto z-10 w-full bg-backgroudSecondary">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
