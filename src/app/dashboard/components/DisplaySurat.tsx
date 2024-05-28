import useUser from "@/app/auth/hook/useUser";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ArrowRight,
  EnvelopeSimple,
  EnvelopeSimpleOpen,
} from "@phosphor-icons/react";
import { useState } from "react";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useGetSurat } from "@/features/surat/useGetSurat";
import { set } from "date-fns";
import { Loader2 } from "lucide-react";

interface Surat {
  id: number;
  no_surat: string;
  jenis_surat: string;
  tanggal_surat: string;
  tanggal_terima: string;
  perihal: string;
  organisasi: string;
  pengirim: string;
  file: string;
  organization_id: number;
  createdAt: string;
  updatedAt: string;
}

const DisplaySurat = ({ idUser }: any) => {
  const { isLoading, data: userData } = useUser();
  const [isHoverSuratMasuk, setIsHoverSuratMasuk] = useState(false);
  const [isHoverSuratKeluar, setIsHoverSuratKeluar] = useState(false);
  // const [isSuratMasuk, setIsSuratMasuk] = useState(null);
  // const [isSuratKeluar, setIsSuratKeluar] = useState(null);
  const idOrganization = localStorage.getItem("id");

  const { data: suratData, isLoading: suratIsLoading } = useGetSurat(
    idOrganization || ""
  );
  const data = suratData ? suratData.data : [];
  const suratMasuk = data.filter(
    (suratData: any) => suratData.jenis_surat === "surat masuk"
  );
  // setIsSuratMasuk(suratMasuk);
  const suratKeluar = data.filter(
    (suratData: any) => suratData.jenis_surat === "surat keluar"
  );
  const router = useRouter();
  const getCurrentGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Selamat Pagi";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Selamat Siang";
    } else if (currentHour >= 18 && currentHour < 22) {
      return "Selamat Sore";
    } else {
      return "Selamat Malam";
    }
  };
  const currentDate = dayjs().locale("id");
  const dayName = currentDate.format("dddd, DD MMMM YYYY");
  // console.log();
  const Load = () => {
    return (
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  };

  return (
    <div className="">
      {isLoading ? <Load /> : null}
      <div className="mt-10">
        <Card className="w-full mb-5 border-none p-5 transition-all">
          <h1 className="text-md font-semibold text-primary">
            {getCurrentGreeting()},{" "}
            <span className=" text-black">{userData?.display_name}</span>
          </h1>
          <p className="text-foregroundSec text-sm">{dayName}</p>
        </Card>
        <div className="flex w-full gap-5 ">
          <Card
            className="w-full border-none p-2 transition-all"
            onMouseEnter={() => setIsHoverSuratMasuk(true)}
            onMouseLeave={() => setIsHoverSuratMasuk(false)}
          >
            <CardHeader className="flex flex-col gap-1">
              <div className="text-blueSecondary flex justify-center items-center bg-blueBackground rounded-full w-14 h-14">
                <EnvelopeSimple size={32} className="" />
              </div>
              <h1 className="text-lg font-semibold">Surat Masuk</h1>
            </CardHeader>
            <CardContent className="">
              <h1 className="text-4xl font-bold">
                {suratIsLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  suratMasuk.length
                )}
              </h1>
              <div className="mt-5">
                <Button
                  onClick={() => router.push("/surat/masuk")}
                  variant="outline"
                  className={`rounded-3xl flex gap-1 ${
                    isHoverSuratMasuk
                      ? ""
                      : "bg-backgroudSecondary text-foregroundSec"
                  } `}
                >
                  <div className="">Detail</div>
                  {isHoverSuratMasuk && <ArrowRight size={16} />}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card
            className="w-full border-none p-2 transition-all"
            onMouseEnter={() => setIsHoverSuratKeluar(true)}
            onMouseLeave={() => setIsHoverSuratKeluar(false)}
          >
            <CardHeader className="flex flex-col gap-1">
              <div className="text-red-400 flex justify-center items-center bg-red-50 rounded-full w-14 h-14">
                <EnvelopeSimpleOpen size={32} />
              </div>
              <h1 className="text-lg font-semibold">Surat Keluar</h1>
            </CardHeader>
            <CardContent className="">
              <h1 className="text-4xl font-bold">
                {suratIsLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  suratKeluar.length
                )}
              </h1>
              <div className="mt-5">
                <Button
                  onClick={() => router.push("/surat/keluar")}
                  variant="outline"
                  className={`rounded-3xl flex gap-1 ${
                    isHoverSuratKeluar
                      ? ""
                      : "bg-backgroudSecondary text-foregroundSec"
                  } `}
                >
                  <div className="">Detail</div>
                  {isHoverSuratKeluar && <ArrowRight size={16} />}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DisplaySurat;
