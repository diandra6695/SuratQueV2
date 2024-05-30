"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "../dashboard/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import useUser from "../auth/hook/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Profile = () => {
  const handleClick = () => {
    toast("This feature not avalible yet :)");
  };
  const { isPending, data } = useUser();
  return (
    <div className="bg-backgroudSecondary">
      <DashboardLayout>
        <Card className="mt-10 p-5 border-none">
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-sm text-foregroundSec">Nama</p>
              {isPending ? (
                <Skeleton className="w-full h-12 rounded-xl" />
              ) : (
                <Input
                  type="text"
                  value={data?.display_name || "error"}
                  className="bg-backgroudSecondary"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-foregroundSec">Email</p>
              {isPending ? (
                <Skeleton className="w-full h-12 rounded-xl" />
              ) : (
                <Input
                  disabled
                  type="text"
                  value={data?.email || "error"}
                  className="bg-backgroudSecondary"
                />
              )}
            </div>
            <div className="w-full flex justify-end ">
              <Button
                onClick={handleClick}
                type="submit"
                className="rounded-3xl w-24"
              >
                Simpan
              </Button>
            </div>
          </CardContent>
        </Card>
      </DashboardLayout>
    </div>
  );
};

export default Profile;
