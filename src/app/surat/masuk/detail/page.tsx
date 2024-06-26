"use client";
import useUser from "@/app/auth/hook/useUser";
import DashboardLayout from "@/app/dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetSurat } from "@/features/surat/useGetSurat";
import { FilePdf } from "@phosphor-icons/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DetailSurat: React.FC = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [idIsLoading, setIsLoading] = useState<boolean | null>(false);
  const [idOrganization, setIdOrganization] = useState("");
  const { data: userData } = useUser();
  useEffect(() => {
    const idOrganization = localStorage.getItem("id");
    setIdOrganization(idOrganization ? String(idOrganization) : "0");
  }, []);

  const { data: suratData, isLoading } = useGetSurat(idOrganization);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      setId(idParam);
    } else setIsLoading(true);
  }, [searchParams]);

  const suratFilter = suratData
    ? suratData?.data.filter((surat: any) => surat.id_unique == id)
    : [];
  const handleBackClick = () => {
    window.history.back();
  };
  const isoDateString = !isLoading ? suratFilter[0]?.createdAt : "Loading...";

  const date = new Date(isoDateString);

  // Opsi format untuk tanggal Indonesia
  const handleDownload = (fileName: any) => {
    const a = document.createElement("a");
    const fileUrl = `/uploads/${fileName}`;
    a.href = fileUrl;
    a.download =
      suratFilter[0]?.jenis_surat +
      "-" +
      suratFilter[0]?.perihal +
      "-" +
      userData?.display_name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formattedDate = date.toLocaleDateString("id-ID");
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
          <Card className="mt-5 border-none p-5">
            <CardHeader>
              <h3 className="text-2xl font-semibold">Detail Surat</h3>
            </CardHeader>
            {isLoading ? (
              "Loading..."
            ) : (
              <CardContent className="grid grid-cols-2">
                <div className="flex flex-col gap-4">
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">Jenis Surat</h3>
                    <p className="font-medium">{suratFilter[0]?.jenis_surat}</p>
                  </div>
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">Nomor Surat</h3>
                    <p className="font-medium">{suratFilter[0]?.no_surat}</p>
                  </div>
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">
                      Tanggal Surat
                    </h3>
                    <p className="font-medium">
                      {suratFilter[0]?.tanggal_surat}
                    </p>
                  </div>
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">Perihal</h3>
                    <p className="font-medium">{suratFilter[0]?.perihal}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">Organisasi</h3>
                    <p className="font-medium">{suratFilter[0]?.organisasi}</p>
                  </div>
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">Pengirim</h3>
                    <p className="font-medium">{suratFilter[0]?.pengirim}</p>
                  </div>
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">
                      Tanggal Pencatatan
                    </h3>
                    <p className="font-medium">{formattedDate}</p>
                  </div>
                  <div className="">
                    <h3 className=" text-sm text-foregroundSec">File</h3>
                    <Button
                      variant={"outline"}
                      onClick={() => handleDownload(suratFilter[0].file)}
                      className=" flex gap-2"
                    >
                      <FilePdf size={22} />
                      <p className="font-medium">Download</p>
                    </Button>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default DetailSurat;
