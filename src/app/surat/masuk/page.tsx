"use client";
import DashboardLayout from "@/app/dashboard/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  DotsThreeCircleVertical,
  FolderOpen,
  PencilSimpleLine,
  Plus,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import CardSurat from "../components/card/CardSurat";
import { useRouter } from "next/navigation";
import { useGetSurat } from "@/features/surat/useGetSurat";
import { useEffect, useState } from "react";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { useDeleteSurat } from "@/features/surat/useDeleteSurat";

const SuratMasuk = () => {
  const router = useRouter();
  const [idOrganization, setIdOrganization] = useState("");
  useEffect(() => {
    const idOrganization = localStorage.getItem("id");
    setIdOrganization(idOrganization ? String(idOrganization) : "0");
  }, []);

  const { data: suratData, isLoading: suratIsLoading } = useGetSurat(
    idOrganization || ""
  );
  const data = suratData ? suratData.data : [];
  const suratMasuk = data.filter(
    (suratData: any) => suratData.jenis_surat === "surat masuk"
  );
  const SuratNotFound = () => {
    return (
      <div className="">
        <div className="flex w-full h-[32rem] justify-center items-center">
          <div className="text-foregroundThird flex flex-col justify-center items-center">
            <FolderOpen size={150} weight="fill" />
            <h1 className="text-xl font-semibold mb-2">
              Belum Ada Surat Masuk{" "}
            </h1>
            <Button
              onClick={() => router.push("/surat/create")}
              className="p-6 rounded-3xl"
              variant={"outline"}
            >
              Create New
            </Button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="bg-backgroudSecondary">
      <DashboardLayout>
        <div className="mt-10">
          <div className="mb-5 flex gap-4  items-center">
            <h3 className="text-lg font-semibold ">Surat Masuk</h3>
            <Button
              onClick={() => router.push("/surat/create")}
              className="bg-black rounded-3xl hover:bg-gray-950 flex gap-2 text-xs h-8"
            >
              <Plus size={16} /> Tambah
            </Button>
          </div>
          {suratMasuk.length > 0 ? (
            <div className="grid grid-cols-3 gap-5 mb-10">
              <Dialog>
                {suratMasuk.map((surat: any) => (
                  <>
                    <CardSurat key={surat.id} jenis={"masuk"} surat={surat} />
                  </>
                ))}
              </Dialog>
            </div>
          ) : (
            <SuratNotFound />
          )}
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SuratMasuk;
