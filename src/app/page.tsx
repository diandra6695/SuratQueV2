"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import useUser from "./auth/hook/useUser";
import NextNProgress from "nextjs-progressbar";
import logo from "../../public/assets/images/logo/logo.svg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Loader, Loader2 } from "lucide-react";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import heroImage from "../../public/assets/images/tumbnail/hero.png";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Check } from "@phosphor-icons/react";
export default function Home() {
  /**
   * Retrieves the current user data and loading state using the `useUser` hook.
   * @returns An object containing the user data and a boolean indicating if the data is currently loading.
   */
  const { data, isLoading } = useUser();
  const queryClient = useQueryClient();
  const year = new Date().getFullYear();
  const email = data?.display_name ? data?.display_name : "";
  const initial = email.slice(0, 1).toUpperCase();

  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    queryClient.clear();
    await supabase.auth.signOut();
    window.location.href = "/";
  };
  const router = useRouter();

  const ButtonLoading = () => {
    return (
      <Button className="h-10 w-10 rounded-full p-0" variant={"outline"}>
        <Loader2 className="animate-spin text-primary" />
      </Button>
    );
  };

  return (
    <div className="bg-backgroudSecondary">
      <div className="w-full px-40 h-16 py-9 flex items-center border justify-between bg-white">
        <div className="">
          <Image
            className="pointer-events-none"
            src={logo}
            width={150}
            alt="logo"
          />
        </div>
        <div className="">
          <ul className="flex gap-9 text-sm font-medium">
            <li>
              <Link className="bg-backgroudSecondary" href="#">
                Kontak
              </Link>
            </li>
            <li>
              <Link href="#">Roadmap</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </div>
        <div className="w-36">
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <Popover>
              <PopoverTrigger>
                {data?.email ? (
                  <Button
                    className="rounded-full w-10 h-10 "
                    variant={"outline"}
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        className="pointer-events-none "
                        src={data?.image_url || ""}
                        alt="@shadcn"
                      />
                      <AvatarFallback>{initial}</AvatarFallback>
                    </Avatar>
                  </Button>
                ) : (
                  <Button
                    onClick={() => router.push("/auth/signin")}
                    className="rounded-3xl"
                    variant={"outline"}
                  >
                    Masuk
                  </Button>
                )}
              </PopoverTrigger>
              {data?.email ? (
                <PopoverContent>
                  <div className="bg-backgroudSecondary flex flex-col gap-4 rounded-xl shadow-md p-5">
                    <div className="">
                      <p className="text-xs text-foregroundSec">Akun</p>
                      <p>{data?.display_name}</p>
                    </div>
                    <div className="">
                      <p className="text-xs text-foregroundSec">Email</p>
                      <p>{data?.email}</p>
                    </div>
                    <div className="">
                      <Button
                        onClick={handleLogout}
                        variant={"ghost"}
                        className="w-full bg-red-50 text-red-500 hover:text-red-500 hover:bg-red-100"
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              ) : null}
            </Popover>
          )}
        </div>
      </div>
      <div className="container mx-auto flex flex-col items-center my-24">
        <div className="flex flex-col gap-6 items-center mb-32">
          <div className="">
            <Badge className="gap-2 text-gray-600" variant={"outline"}>
              <GraduationCap size={20} />
              <p>
                Telah digunakan <span className="text-black">500+</span>{" "}
                perusahaan
              </p>
            </Badge>
          </div>
          <div className="w-[40rem] text-center">
            <h3 className="text-6xl font-semibold">
              Platfrom Arsip Surat yang Aman & Cepat
            </h3>
          </div>
          <div className="w-[40rem] text-center">
            <p className="text-lg text-foregroundSec">
              Cocok untuk sekolah, universitas, startup dan perusahaan yang
              membutuhkan platform arsip surat.
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <Button className="rounded-3xl">Coba Sekarang</Button>
            <Button
              variant={"secondary"}
              className="rounded-3xl bg-colorSecondary text-primary"
            >
              Apa itu SuratQue?
            </Button>
          </div>
        </div>
        <div className="h-[45rem]">
          <Image
            src={heroImage}
            alt="hero image"
            className="hover:w-[70rem] transition-all w-[74.375rem]"
          />
        </div>
        <div className="">
          <h3 className="text-3xl font-semibold text-center mb-5">Harga</h3>
          <div className="flex gap-10">
            <Card className="border-none w-[18rem]">
              <CardHeader>
                <h3 className="text-xl font-bold">Gratis</h3>
                <p className="text-md">Mulai gratis untuk up to 100+ surat</p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <p className="text-sm flex gap-2 items-center">
                  <Check size={14} weight="bold" />
                  Unlimited organization
                </p>
                <p className="text-sm flex gap-2 items-center">
                  <Check size={14} weight="bold" />
                  Unlimited surat
                </p>
                <p className="text-sm flex gap-2 items-center">
                  <Check size={14} weight="bold" />
                  Unlimited Edit surat
                </p>
                <p className="text-sm flex gap-2 items-center">
                  <Check size={14} weight="bold" />
                  Unlimited share surat
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="rounded-3xl bg-black hover:bg-gray-800 text-sm"
                >
                  Coba Sekarang
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-none w-[18rem] flex flex-col justify-between">
              <CardHeader>
                <h3 className="text-xl font-bold">Pro</h3>
                <p className="text-md">
                  Hubungi kami untuk kebutuhan skala besar
                </p>
              </CardHeader>
              <CardContent className="flex flex-col gap-2"></CardContent>
              <CardFooter>
                <Button
                  onClick={() => router.push("/dashboard")}
                  className="rounded-3xl bg-black hover:bg-gray-800 text-sm"
                >
                  Hubungi Kami
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="text-center py-5 border-t font-medium">
        <p>&copy;{year} SuratQue Inc.</p>
      </div>
    </div>
  );
}
