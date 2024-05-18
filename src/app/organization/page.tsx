"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "@phosphor-icons/react";
import { toast } from "sonner";

const Organization = () => {
  return (
    <div className="bg-backgroudSecondary">
      <DashboardLayout>
        <Card className="mt-10 p-5 border-none">
          <CardHeader>
            <CardTitle>Organisasi</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="account" className="">
              <TabsList className="grid grid-cols-2 rounded-xl w-40">
                <TabsTrigger value="detail" className="rounded-lg">
                  Detail
                </TabsTrigger>
                <TabsTrigger value="anggota" className="rounded-lg">
                  Anggota
                </TabsTrigger>
              </TabsList>
              <TabsContent value="detail">
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Detail</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {/* <div className="">ini konten 1</div> */}
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="anggota">
                <Card className="border-none shadow-none">
                  <CardHeader>
                    <CardTitle>Anggota</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {/* <div className="">ini konten 2</div> */}
                  </CardContent>
                  <CardFooter className="flex justify-end items-center w-full">
                    <Button
                      className="rounded-full"
                      onClick={() => toast("This feature is not available yet")}
                    >
                      <Plus size={20} />
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </DashboardLayout>
    </div>
  );
};

export default Organization;
