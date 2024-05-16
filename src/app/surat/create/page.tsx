"use client";
import DashboardLayout from "@/app/dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
            <Card className="border-none">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Tambah Surat Baru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-2">
                  <Select>
                    <p className="text-sm text-foregroundSec">Jenis Surat</p>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Pilih Jenis Surat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat masuk">Surat Masuk</SelectItem>
                      <SelectItem value="surat keluar">Surat Keluar</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-foregroundSec">Nomor Surat</p>
                  <Input type="text" placeholder="Masukkan Nomor Surat"></Input>
                  <p className="text-sm text-foregroundSec">Tanggal Surat</p>
                  <Input
                    type="date"
                    className="w-full"
                    placeholder="Masukkan Tanggal Surat"
                  />
                  <p className="text-sm text-foregroundSec">Tanggal Diterima</p>
                  <Input
                    type="date"
                    className="w-full"
                    placeholder="Masukkan Tanggal Diterima"
                  />
                  <p className="text-sm text-foregroundSec">Perihal</p>
                  <Input
                    type="text"
                    className="w-full"
                    placeholder="Masukkan Perihal"
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
