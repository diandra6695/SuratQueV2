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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRight,
  DotsThreeCircleVertical,
  DotsThreeVertical,
  PencilSimpleLine,
  ShareNetwork,
  Trash,
} from "@phosphor-icons/react";
import { useState } from "react";

const CardSurat = ({ data }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Card
      className="w-full border-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="">
        <div className="flex justify-between">
          <Badge variant="secondary" className="h-5">
            Surat Masuk
          </Badge>
          <div className="">
            <Popover>
              <PopoverTrigger>
                <Button className="rounded-full p-3 " variant={"secondary"}>
                  <DotsThreeVertical size={14} weight="bold" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-2 w-32 gap-2 flex items-center justify-center flex-col">
                <Button
                  variant={"ghost"}
                  className="flex gap-2 items-center w-full text-sm text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-600"
                >
                  <Trash size={20} />
                  Hapus
                </Button>
                <Button
                  variant={"ghost"}
                  className="flex gap-2 items-center text-sm w-full "
                >
                  <PencilSimpleLine size={20} />
                  Edit
                </Button>
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
              <p className="text-sm">SRT/0001/278/SP000</p>
            </div>
            <div className="">
              <p className="text-foregroundSec mb-2">Perihal</p>
              <p className="text-sm h-12 overflow-hidden whitespace-nowrap text-ellipsis">
                undangan pertemuan kepala se smk jepara
              </p>
            </div>
            <div className="">
              <p className="text-foregroundSec mb-2">Tanggal Surat</p>
              <p className="text-sm">10/8/2025</p>
            </div>
            <div className="">
              <p className="text-foregroundSec mb-2">Organisasi</p>
              <p className="text-sm">Pencinta Pop Punk</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-end w-full gap-2">
          <Button
            className={
              isHovered
                ? "bg-backgroudSecondary h-10 w-10 p-1 hover:bg-backgroudSecondary  rounded-full text-black"
                : "bg-backgroudSecondary h-10 w-10 p-1 hover:bg-backgroudSecondary text-foregroundSec rounded-full hover:text-black"
            }
          >
            <ShareNetwork size={16} />
          </Button>
          <Button
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
