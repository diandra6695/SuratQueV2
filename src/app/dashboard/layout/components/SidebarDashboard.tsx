import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetOrganization } from "@/features/organization/useGetOrganization";
import { useGetUser } from "@/features/user/useGetUser";
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
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import Organization from "../../organization/Organization";

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

  const userEmail = data?.email;

  const { data: userFromDatabase, isLoading: getUserFromDatabaseIsLoading } =
    useGetUser();

  const userSec = userFromDatabase?.data.user;

  // filter userSec mach with userName
  const filteredUser = getUserFromDatabaseIsLoading
    ? []
    : userSec?.filter((user: any) => user.email === userEmail);

  const idUserFromDatabase = filteredUser[0]?.id;
  const { data: organization, isLoading: organizationIsLoading } =
    useGetOrganization(idUserFromDatabase || "");

  const organizations = organization?.data.organization
    ? organization?.data.organization
    : "";

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
    localStorage.removeItem("id");
    window.location.href = "/";
  };
  const handleOrgClick = (id: any) => {
    localStorage.setItem("id", id);
    window.location.reload();
  };

  const initial = userEmail?.slice(0, 1).toUpperCase();
  // console.log(localStorage.getItem("id"));
  const sessionId = localStorage.getItem("id");
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
                <Link href={"/dashboard"}>
                  <Button
                    // onClick={() => router.push("/dashboard")}
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
                </Link>
              </li>
              <li>
                <Link href={"/surat/create"}>
                  <Button
                    // onClick={() => router.push("/surat/create")}
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
                </Link>
              </li>
              <li>
                <Link href={"/surat/masuk"}>
                  <Button
                    // onClick={() => router.push("/surat/masuk")}
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
                </Link>
              </li>
              <li>
                <Link href={"/surat/keluar"}>
                  <Button
                    // onClick={() => router.push("/surat/keluar")}
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
                </Link>
              </li>
              <li>
                <Link href={"/organization"}>
                  <Button
                    // onClick={() => router.push("/organization")}
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
                </Link>
              </li>
              <li>
                <Link href={"/profile"}>
                  <Button
                    // onClick={() => router.push("/profile")}
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
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-16 flex flex-col gap-3">
            <div className="profile">
              <Card className="p-2 bg-customSecondary border-0">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src={data.image_url} alt={userEmail} />
                    <AvatarFallback>{initial}</AvatarFallback>
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
                      <p>
                        {organizationIsLoading
                          ? "Loading..."
                          : "Select Organization"}
                      </p>
                    </div>
                    <CaretUpDown size={15} />
                  </div>
                </PopoverTrigger>
                {organizationIsLoading ? (
                  ""
                ) : (
                  <PopoverContent className="border-0 shadow-md bg-backgroudSecondary">
                    <h3 className="p-3">Select Organization</h3>
                    <div className=" flex flex-col gap-2 items-center">
                      {organization?.data.organization.map(
                        (data: any, i: any) => {
                          const id = i;
                          return (
                            <>
                              <Button
                                key={id}
                                onClick={() => handleOrgClick(data.id)}
                                variant="ghost"
                                className={
                                  data.id == sessionId
                                    ? `w-full text-primary flex justify-between bg-colorSecondary rounded-3xl`
                                    : "bg-white rounded-3xl w-full flex justify-between"
                                }
                              >
                                <p>{data.name}</p>
                                {data.id == sessionId ? (
                                  <Check size={15} />
                                ) : (
                                  ""
                                )}
                              </Button>
                            </>
                          );
                        }
                      )}
                      <div className="">
                        <DialogTrigger>
                          <Button className="rounded-full p-2.5">
                            <Plus size={20} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="p-0">
                          <Organization />
                        </DialogContent>
                      </div>
                    </div>
                  </PopoverContent>
                )}
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
