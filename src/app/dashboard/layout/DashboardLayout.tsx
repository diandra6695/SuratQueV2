"use client";
import useUser from "@/app/auth/hook/useUser";
import NavbarDashboard from "./components/NavbarDashboard";
import SidebarDashboard from "./components/SidebarDashboard";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import NextNProgress from "nextjs-progressbar";
import logoLoader from "../../../../public/assets/images/logo/logoLoader.svg";
import NextTopLoader from "nextjs-toploader";
import Image from "next/image";
import { Dialog } from "@/components/ui/dialog";

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
    <section className="w-full">
      {/* <NextTopLoader
        color="#025963"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      /> */}
      <div className="">
        <div className="flex">
          <Dialog>
            <SidebarDashboard data={data} />
            <div className="container min-h-screen mx-auto z-10 w-full bg-backgroudSecondary">
              {children}
            </div>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
