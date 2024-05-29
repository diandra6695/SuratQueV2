"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/assets/images/logo/logo.svg";
import Link from "next/link";
import useUser from "../auth/hook/useUser";
import { useQueryClient } from "@tanstack/react-query";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ContactPage = () => {
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
          <Link href="/">
            <Image
              className="pointer-events-none"
              src={logo}
              width={150}
              alt="logo"
            />
          </Link>
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
        <div className="">
          <Image src={logo} width={500} alt="logo" />
        </div>
        <div className="text-center mt-10">
          <h3 className="text-3xl font-bold">Kontak</h3>
          <p>Hubungi kami untuk pertanyaan dan bantuan.</p>
        </div>
        <div className="text-center mt-32">
          <Link
            href={
              "https://wa.me/6283862993783?text=Halo%20SuratQue%20Inc.%20Saya%20ingin%20bertanya%20tentang%20Aplikasi%20SuratQue%20Inc."
            }
            target={"_blank"}
          >
            <h3 className="text-xl font-semibold">Whatsapp</h3>
            <p className="text-lg">+62 838-6299-3783</p>
          </Link>
        </div>
      </div>
      <div className="text-center py-5 border-t font-medium">
        <p>&copy;{year} SuratQue Inc.</p>
      </div>
    </div>
  );
};

export default ContactPage;
