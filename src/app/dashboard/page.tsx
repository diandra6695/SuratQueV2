"use client";
import { Card } from "@/components/ui/card";
import DashboardLayout from "./layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PencilSimpleLine, Plus, TrashSimple } from "@phosphor-icons/react";
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
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";

const Dropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="after:border-none focus:border-none border-none"
      >
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="flex gap-2">
          <TrashSimple size={18} weight="bold" />
          Hapus
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
          <PencilSimpleLine size={18} weight="bold" />
          Ganti Nama
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Dashboard = () => {
  const { data, isLoading } = useFetchPosts();

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const renderProduct = () => {
    return data?.data?.posts.map((post: any) => {
      return (
        <TableRow key={post.id.toString()}>
          <TableCell className="font-medium">{post.id}</TableCell>
          <TableCell>{post.title}</TableCell>
          <TableCell>{post.content}</TableCell>
          <TableCell>{post.createdAt}</TableCell>
          <TableCell>
            <Dropdown />
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="">
      <div className="">
        <DashboardLayout>
          <Card className="w-full p-5">
            <div className="flex justify-between mb-5">
              <Input placeholder="Cari Surat" className="max-w-sm" />
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="flex gap-2 mb-5 text-sm">
                    <Plus size={20} weight="bold" />
                    <h3>Surat Baru</h3>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={formik.handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>Tambah Post</DialogTitle>
                      <DialogDescription>
                        Make changes to your profile here. Click save when youre
                        done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Title
                        </Label>
                        <Input
                          name="title"
                          onChange={handleFormInput}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Content
                        </Label>
                        <Input
                          name="content"
                          onChange={handleFormInput}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Content</TableHead>
                    <TableHead>Tanggal Pembuatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {renderProduct()}
                  {isLoading && <p>Loading</p>}
                </TableBody>
              </Table>
            </div>
          </Card>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
