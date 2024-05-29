"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DashboardLayout from "./layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Buildings,
  FilePdf,
  PencilSimpleLine,
  Plus,
  TrashSimple,
} from "@phosphor-icons/react";
import { useFetchPosts } from "@/features/post/useFetchPosts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
// import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useCreatePost } from "@/features/post/useCreatePost";
import { useDeletePost } from "@/features/post/useDeletePost";
import { toast } from "sonner";
import { useUpdatePost } from "@/features/post/useUpdatePost";
import upload from "./utils";
import useUser from "../auth/hook/useUser";
import Link from "next/link";
import Organization from "./organization/Organization";
import DisplaySurat from "./components/DisplaySurat";
import { useGetUser } from "@/features/user/useGetUser";
import NextNProgress from "nextjs-progressbar";

const Dashboard = () => {
  const [isOrganization, setOrganization] = useState(false);
  const user = useUser();
  const userName = user.data?.display_name;
  const userEmail = user.data?.email;
  const { data: userFromDatabase, isLoading: getUserFromDatabaseIsLoading } =
    useGetUser();

  const userSec = userFromDatabase?.data.user;
  const [idOrganization, setIdOrganization] = useState("");
  useEffect(() => {
    const idOrganization = localStorage.getItem("id");
    setIdOrganization(idOrganization ? String(idOrganization) : "0");
  }, []);
  const idOrganizationInt = parseInt(idOrganization || "0");

  // filter userSec mach with userName
  const filteredUser = getUserFromDatabaseIsLoading
    ? []
    : userSec?.filter((user: any) => user.email === userEmail);

  const organization = filteredUser[0]?.organization;
  const idUserFromDatabase = filteredUser[0]?.id;
  // console.log(idUserFromDatabase);
  const OrganizationNotFound = () => {
    return (
      <div className="">
        <div className="w-full text-foregroundThird h-screen flex flex-col gap-2 justify-center items-center">
          <Buildings size={150} weight="fill" />
          <h1 className="text-xl font-semibold">Organizations Not Found</h1>
          <DialogTrigger>
            <Button className="p-6 rounded-3xl" variant={"outline"}>
              Create New
            </Button>
          </DialogTrigger>
          <p className="text-neutral-400 text-sm"></p>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <div className="bg-backgroudSecondary">
        <DashboardLayout>
          {organization?.length > 0 ? (
            idOrganizationInt > 0 ? (
              <DisplaySurat idUser={idUserFromDatabase} />
            ) : (
              <div className="">
                <div className="w-full text-foregroundThird h-screen flex flex-col gap-2 justify-center items-center">
                  <Buildings size={150} weight="fill" />
                  <h1 className="text-xl font-semibold">
                    Organization Not Selected!
                  </h1>
                </div>
              </div>
            )
          ) : (
            <OrganizationNotFound />
          )}
          {/* <OrganizationNotFound /> */}
          {/* <DisplaySurat /> */}
          <DialogContent>
            <Organization />
          </DialogContent>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
