"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDeleteSurat } from "@/features/surat/useDeleteSurat";
import { useGetSurat } from "@/features/surat/useGetSurat";
import {
  ArrowRight,
  DotsThreeCircleVertical,
  DotsThreeVertical,
  PencilSimpleLine,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CardSurat = ({ surat, jenis }: any) => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [idOrganization, setIdOrganization] = useState("");
  useEffect(() => {
    const idOrganization = localStorage.getItem("id");
    setIdOrganization(idOrganization ? String(idOrganization) : "0");
  }, []);

  const { refetch: refetchSurat } = useGetSurat(idOrganization || "");
  const { mutate: handleDeleteSurat, isPending: deleteSuratIsLoading } =
    useDeleteSurat({
      onSuccess: () => {
        refetchSurat();
        toast.success("Delete surat succes");
        // router.push("/surat");
      },
    });

  const tanggalSuratModifed = new Date(surat.tanggal_surat).toLocaleDateString(
    "id-ID"
  );
  return (
    <Card
      className="w-full border-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="">
        <div className="flex justify-between">
          <Badge variant="secondary" className="h-5">
            {surat.jenis_surat}
          </Badge>
          <div className="">
            <Popover>
              <PopoverTrigger>
                <Button className="rounded-full p-3 " variant={"secondary"}>
                  <DotsThreeVertical size={14} weight="bold" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-32 gap-2 flex items-center justify-center flex-col">
                <DialogTrigger>
                  <Button
                    variant={"ghost"}
                    className="flex gap-2 items-center w-full text-sm text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash size={20} />
                    Hapus
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <div className=" flex flex-col gap-4">
                    <h3 className="text-xl font-semibold">
                      Are you absolutely sure?
                    </h3>
                    <p className="text-sm text-foregroundSec">
                      This action cannot be undone. This will permanently delete
                      your surat and remove your data from our servers.
                    </p>
                    <div className="flex gap-5 justify-end">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                      {!deleteSuratIsLoading ? (
                        <Button
                          onClick={() => handleDeleteSurat(surat.id)}
                          variant={"destructive"}
                        >
                          Delete
                        </Button>
                      ) : (
                        <Button disabled variant={"destructive"}>
                          Loading...
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full">
          <div className="grid grid-cols-2 text-xs gap-5">
            <div className="">
              <p className="text-foregroundSec mb-2">Nomor Surat</p>
              <p className="text-sm">{surat.no_surat}</p>
            </div>
            <div className="">
              <p className="text-foregroundSec mb-2">Perihal</p>
              <p className="text-sm h-12 overflow-hidden whitespace-nowrap text-ellipsis">
                {surat.perihal}
              </p>
            </div>
            <div className="">
              <p className="text-foregroundSec mb-2">Tanggal Surat</p>
              <p className="text-sm">{tanggalSuratModifed}</p>
            </div>
            <div className="">
              <p className="text-foregroundSec mb-2">Organisasi</p>
              <p className="text-sm">{surat.organisasi}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full gap-2">
          <Button
            onClick={() =>
              router.push(`/surat/${jenis}/detail?id=${surat.id_unique}`)
            }
            className={
              isHovered
                ? "bg-backgroudSecondary hover:bg-backgroudSecondary rounded-full text-black"
                : "bg-backgroudSecondary hover:bg-backgroudSecondary text-foregroundSec rounded-full hover:text-black"
            }
          >
            Detail {isHovered && <ArrowRight size={14} />}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CardSurat;
