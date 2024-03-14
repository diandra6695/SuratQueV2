"use client";
import useUser from "@/app/auth/hook/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { House, Plus, User } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

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
        <nav className="h-[4rem] flex items-center px-10 justify-end w-full border fixed gap-5 z-20 bg-white">
          <h3>Halo, {data?.display_name}</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="after:border-0 focus:border-0">
              <Avatar>
                <AvatarImage src={data?.image_url || ""} />
                <AvatarFallback>{data?.email[0]}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="">Akun</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="bg-red-50">
                <Link href="" className=" text-red-500">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="flex bg-violet-50">
          <div className="w-[25rem] ">
            <div className="w-[18rem] fixed z-20 h-screen bg-white border p-5">
              <Image
                className="pointer-events-none mb-5 w-[8rem]"
                src="/assets/images/logo/logo.svg"
                alt="logo"
                width={100}
                height={100}
              />
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
          <div className="mt-24 container min-h-screen mx-auto z-10 w-full">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
