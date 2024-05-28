"use client";
import DashboardLayout from "@/app/dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NextTopLoader from "nextjs-toploader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const SuratCreate = () => {
  //create handle back
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="bg-backgroudSecondary">
      {/* <NextTopLoader
        color="#025963"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        shadow="0 0 10px #2299DD,0 0 5px #2299DD"
      /> */}
      <DashboardLayout>
        <div className="mt-10">
          <Button
            variant={"outline"}
            className="rounded-3xl"
            onClick={handleBackClick}
          >
            Kembali
          </Button>
          <div className="mt-5">
            <Card className="border-none rounded-xl p-5">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Tambah Surat Baru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-2">
                  <Select onValueChange={(value) => console.log(value)}>
                    <p className="text-sm text-foregroundSec">Jenis Surat</p>
                    <SelectTrigger className="bg-backgroudSecondary">
                      <SelectValue placeholder="Pilih Jenis Surat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat masuk">Surat Masuk</SelectItem>
                      <SelectItem value="surat keluar">Surat Keluar</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-foregroundSec">Nomor Surat</p>
                  <Input
                    type="text"
                    placeholder="Masukkan Nomor Surat"
                    className="bg-backgroudSecondary"
                  ></Input>
                  <p className="text-sm text-foregroundSec">Tanggal Surat</p>
                  <Input
                    type="date"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Tanggal Surat"
                  />
                  <p className="text-sm text-foregroundSec">Tanggal Diterima</p>
                  <Input
                    type="date"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Tanggal Diterima"
                  />
                  <p className="text-sm text-foregroundSec">Perihal</p>
                  <Input
                    type="text"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Perihal"
                  />
                  <p className="text-sm text-foregroundSec">Organisasi</p>
                  <Input
                    type="text"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Organisasi Surat"
                  />
                  <p className="text-sm text-foregroundSec">Pengirim</p>
                  <Input
                    type="text"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Pengirim"
                  />
                  <p className="text-sm text-foregroundSec">File</p>
                  <Input
                    type="file"
                    className="w-full mb-5 bg-backgroudSecondary"
                    accept="application/pdf"
                  />
                  <Button
                    type="submit"
                    className="rounded-3xl"
                    onClick={handleBackClick}
                  >
                    Tambah Surat
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SuratCreate;
