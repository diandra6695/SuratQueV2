import { Button } from "@/components/ui/button";
import { House, Plus, User } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

const SidebarDashboard = () => {
  return (
    <div className="lg:w-[25rem] xl:w-[18rem]">
      <div className="w-[18rem] fixed z-20 h-screen bg-white border p-5">
        <Link href="/">
          <Image
            className="pointer-events-none mb-5 w-[8rem]"
            src="/assets/images/logo/logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <Button className="w-full flex gap-2 mb-5">
          <Plus size={20} weight="bold" />
          <h3>Surat Baru</h3>
        </Button>
        <div className="">
          <ul className="flex flex-col gap-2">
            <li>
              <Button
                variant="ghost"
                className="w-full flex items-center gap-2 justify-start"
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
      </div>
    </div>
  );
};

export default SidebarDashboard;
