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
  ArrowCircleLeft,
  ArrowCircleRight,
  Building,
  Buildings,
  CaretUpDown,
  Check,
  EnvelopeSimple,
  House,
  Plus,
  User,
  UserCircle,
} from "@phosphor-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarDashboard = ({ data }: { data: any }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathName = usePathname();

  const [isDashboard, setIsDashboard] = useState(false);
  const [isCreateSurat, setIsCreateSurat] = useState(false);
  const [isSuratMasuk, setIsSuratMasuk] = useState(false);
  const [isSuratKeluar, setIsSuratKeluar] = useState(false);
  const [isOrganization, setIsOrganization] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  useEffect(() => {
    if (pathName === "/dashboard") {
      setIsDashboard(true);
      setIsCreateSurat(false);
      setIsSuratMasuk(false);
      setIsSuratKeluar(false);
      setIsOrganization(false);
      setIsProfile(false);
    } else if (pathName === "/surat/create") {
      setIsDashboard(false);
      setIsCreateSurat(true);
      setIsSuratMasuk(false);
      setIsSuratKeluar(false);
      setIsOrganization(false);
      setIsProfile(false);
    } else if (pathName === "/surat/masuk") {
      setIsDashboard(false);
      setIsCreateSurat(false);
      setIsSuratMasuk(true);
      setIsSuratKeluar(false);
      setIsOrganization(false);
      setIsProfile(false);
    } else if (pathName === "/surat/keluar") {
      setIsDashboard(false);
      setIsCreateSurat(false);
      setIsSuratMasuk(false);
      setIsSuratKeluar(true);
      setIsOrganization(false);
      setIsProfile(false);
    } else if (pathName === "/organization") {
      setIsDashboard(false);
      setIsCreateSurat(false);
      setIsSuratMasuk(false);
      setIsSuratKeluar(false);
      setIsOrganization(true);
      setIsProfile(false);
    } else if (pathName === "/profile") {
      setIsDashboard(false);
      setIsCreateSurat(false);
      setIsSuratMasuk(false);
      setIsSuratKeluar(false);
      setIsOrganization(false);
      setIsProfile(true);
    } else {
      setIsDashboard(false);
      setIsCreateSurat(false);
      setIsSuratMasuk(false);
      setIsSuratKeluar(false);
      setIsOrganization(false);
      setIsProfile(false);
    }
  }, [pathName]);
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    router.push("/");
  };
  const year = new Date().getFullYear();
  return (
    <div className="w-[24rem]">
      <div className="w-[18rem] fixed z-20 h-screen bg-white shadow-sm p-5">
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
                  onClick={() => router.push("/dashboard")}
                  variant="ghost"
                  className={
                    isDashboard
                      ? `w-full p-0 bg-white hover:text-primary hover:bg-white text-primary font-semibold flex items-center gap-2 justify-start `
                      : "w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                  }
                >
                  <div
                    className={
                      isDashboard
                        ? "bg-colorSecondary p-2 rounded-xl"
                        : "p-2 rounded-xl"
                    }
                  >
                    <House size={20} />
                  </div>
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => router.push("/surat/create")}
                  variant="ghost"
                  className={
                    isCreateSurat
                      ? `w-full p-0 bg-white hover:text-primary hover:bg-white text-primary font-semibold flex items-center gap-2 justify-start `
                      : "w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                  }
                >
                  <div
                    className={
                      isCreateSurat
                        ? "bg-colorSecondary p-2 rounded-xl"
                        : "p-2 rounded-xl"
                    }
                  >
                    <EnvelopeSimple size={20} />
                  </div>
                  Tambah Surat
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => router.push("/surat/masuk")}
                  variant="ghost"
                  className={
                    isSuratMasuk
                      ? `w-full p-0 bg-white hover:text-primary hover:bg-white text-primary font-semibold flex items-center gap-2 justify-start `
                      : "w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                  }
                >
                  <div
                    className={
                      isSuratMasuk
                        ? "bg-colorSecondary p-2 rounded-xl"
                        : "p-2 rounded-xl"
                    }
                  >
                    <ArrowCircleRight size={20} />
                  </div>
                  Surat Masuk
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => router.push("/surat/keluar")}
                  variant="ghost"
                  className={
                    isSuratKeluar
                      ? `w-full p-0 bg-white hover:text-primary hover:bg-white text-primary font-semibold flex items-center gap-2 justify-start `
                      : "w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                  }
                >
                  <div
                    className={
                      isSuratKeluar
                        ? "bg-colorSecondary p-2 rounded-xl"
                        : "p-2 rounded-xl"
                    }
                  >
                    <ArrowCircleLeft size={20} />
                  </div>
                  Surat Keluar
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => router.push("/organization")}
                  variant="ghost"
                  className={
                    isOrganization
                      ? `w-full p-0 bg-white hover:text-primary hover:bg-white text-primary font-semibold flex items-center gap-2 justify-start `
                      : "w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                  }
                >
                  <div
                    className={
                      isOrganization
                        ? "bg-colorSecondary p-2 rounded-xl"
                        : "p-2 rounded-xl"
                    }
                  >
                    <Building size={20} />
                  </div>
                  Organization
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => router.push("/profile")}
                  variant="ghost"
                  className={
                    isProfile
                      ? `w-full p-0 bg-white hover:text-primary hover:bg-white text-primary font-semibold flex items-center gap-2 justify-start `
                      : "w-full p-0 flex items-center text-foregroundSec hover:bg-white gap-2 justify-start hover:text-colorDark"
                  }
                >
                  <div
                    className={
                      isProfile
                        ? "bg-colorSecondary p-2 rounded-xl"
                        : "p-2 rounded-xl"
                    }
                  >
                    <UserCircle size={20} />
                  </div>
                  Profile
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
