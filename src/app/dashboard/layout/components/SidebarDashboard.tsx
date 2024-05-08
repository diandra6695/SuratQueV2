import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabaseBrowser } from "@/lib/supabase/browser";
import {
  Buildings,
  CaretUpDown,
  Check,
  House,
  Plus,
  User,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SidebarDashboard = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.push("/");
  };
  const year = new Date().getFullYear();
  return (
    <div className="w-[24rem]">
      <div className="w-[18rem] border-r border-borderCustom fixed z-20 h-screen bg-white border p-5">
        <Link className="" href="/">
          <Image
            className="pointer-events-none mb-5 w-[8rem]"
            src="/assets/images/logo/logo.svg"
            alt="logo"
            width={100}
            height={100}
          />
        </Link>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-5">
            <ul className="flex flex-col gap-2">
              <li>
                <Button
                  variant="ghost"
                  className="w-full p-0 bg-white text-primary font-semibold flex items-center gap-2 justify-start "
                >
                  <div className="bg-colorSecondary p-2 rounded-xl">
                    <House size={20} weight="bold" />
                  </div>
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                >
                  <div className="p-2 rounded-xl">
                    <User size={20} weight="bold" />
                  </div>
                  Akun
                </Button>
              </li>
            </ul>
          </div>
          <div className="pb-16 flex flex-col gap-3">
            <div className="profile">
              <Card className="p-2 bg-customSecondary border-0">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={data.image_url} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="text-sm">
                    <p className="font-medium">{data.display_name}</p>
                    <button
                      className="p-0 hover:text-primary transition-all m-0 text-xs"
                      onClick={handleLogout}
                    >
                      <p>Sign out</p>
                    </button>
                  </div>
                </div>
              </Card>
            </div>
            <div className="">
              <Popover>
                <PopoverTrigger className="w-full text-sm ">
                  <div className="flex items-center p-2 border bg-customSecondary rounded-3xl justify-between">
                    <div className="flex gap-3 items-center">
                      <Buildings size={15} />
                      <p>Select Organization</p>
                    </div>
                    <CaretUpDown size={15} />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="border-0 shadow-md bg-backgroudSecondary">
                  <h3 className="p-3">Select Organization</h3>
                  <div className=" flex flex-col gap-2 items-center">
                    <Button
                      variant="ghost"
                      className="w-full text-primary flex justify-between bg-colorSecondary rounded-3xl"
                    >
                      <p>SMK Negeri 1 Bangsri</p>
                      <Check size={15} />
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full flex justify-between rounded-3xl"
                    >
                      <p>init</p>
                    </Button>
                    <div className="">
                      <Button className="rounded-full p-2.5">
                        <Plus size={20} />
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
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
