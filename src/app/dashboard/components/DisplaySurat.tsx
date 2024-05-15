import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, EnvelopeSimple } from "@phosphor-icons/react";
import { useState } from "react";

const DisplaySurat = () => {
  const [isHover, setIsHover] = useState(false);

  return (
    <div className="">
      <div className="mt-10">
        <h1 className="text-base font-semibold mb-5 text-primary">
          Selamat Siang, Diandra
        </h1>
        <div className="flex w-full gap-5 ">
          <Card
            className="w-full border-none p-2 transition-all"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <CardHeader className="flex flex-col gap-1">
              <div className="text-blueSecondary flex justify-center items-center bg-blueBackground rounded-full w-14 h-14">
                <EnvelopeSimple size={32} className="" />
              </div>
              <h1 className="text-lg font-semibold">Surat Masuk</h1>
            </CardHeader>
            <CardContent className="">
              <h1 className="text-4xl font-bold">100</h1>
              <div className="mt-5">
                <Button variant="outline" className="rounded-3xl flex gap-1">
                  <div className="">Detail</div>
                  {isHover && <ArrowRight size={16} />}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card className="w-full">
            <h1 className="text-2xl font-bold">Display Surat</h1>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DisplaySurat;
