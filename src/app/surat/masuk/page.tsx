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
  PencilSimpleLine,
  Plus,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { PopoverTrigger } from "@radix-ui/react-popover";
import CardSurat from "../components/card/CardSurat";

const SuratMasuk = () => {
  return (
    <div className="bg-backgroudSecondary">
      <DashboardLayout>
        <div className="mt-10">
          <div className="mb-5 flex gap-4  items-center">
            <h3 className="text-lg font-semibold ">Surat Masuk</h3>
            <Button className="bg-black rounded-3xl hover:bg-gray-950 flex gap-2 text-xs h-8">
              <Plus size={16} /> Tambah
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <CardSurat />
            <CardSurat />
            <CardSurat />
            <CardSurat />
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SuratMasuk;
