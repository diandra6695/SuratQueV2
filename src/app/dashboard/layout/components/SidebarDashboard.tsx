import { Button } from "@/components/ui/button";
import { House, Plus, User } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const SidebarDashboard = () => {
  const year = new Date().getFullYear();
  return (
    <div className="w-[24rem]">
      <div className="w-[18rem] border-r border-borderCustom fixed z-20 h-screen bg-custom border p-5">
        <Link className="" href="/">
          <Image
            className="pointer-events-none mb-5 w-[8rem]"
            src="/assets/images/logo/logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="border-b border-borderCustom mb-4"></div>
        <div className="h-full flex flex-col justify-between">
          <div className="">
            <p className="text-sm text-neutral-400 p-2">General</p>
            <ul className="flex flex-col gap-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full bg-white text-primary font-semibold shadow-sm flex items-center gap-2 justify-start"
                >
                  <House size={20} weight="bold" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-2 justify-start"
                >
                  <User size={20} weight="bold" />
                  Akun
                </Button>
              </li>
            </ul>
          </div>
          <div className="pb-16">
            <p className="text-xs text-center font-light pointer-events-none text-neutral-400">
              &copy; {year} SuratQue Inc.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
