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
import { MoreHorizontal } from "lucide-react";
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
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useCreatePost } from "@/features/post/useCreatePost";
import { useDeletePost } from "@/features/post/useDeletePost";

const Dropdown = ({ id }: any) => {
  const { toast } = useToast();
  const { refetch: refetchProduct } = useFetchPosts();
  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      refetchProduct();
      toast({
        title: "delete post successfully",
        description:
          "jangan nyesel kalo datanya kehapus, apalagi kenangannya :)",
      });
    },
  });
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <TrashSimple size={18} weight="bold" />
              Hapus
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                post and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>
                <Button onClick={() => deletePost(id)}>Delete</Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <DropdownMenuItem className="flex gap-2">
          <PencilSimpleLine size={18} weight="bold" />
          Ganti Nama
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const {
    data,
    isLoading: postIsLoading,
    refetch: refetchProduct,
  } = useFetchPosts();
  const { mutate: createPost, isPending: createPostIsLoading } = useCreatePost({
    onSuccess: () => {
      refetchProduct();
      setOpen(false);
      toast({
        title: "Sucess",
        description: "Surat Berhasil disimpan",
      });
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: async () => {
      const { title, content } = formik.values;
      createPost({
        title,
        content,
      });
      formik.resetForm();
    },
  });

  const { mutate: deletePost } = useMutation({
    mutationFn: async (id) => {
      const productsResponse = await axiosInstance.delete(`/post/${id}`);

      return productsResponse;
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
            <Dropdown id={post.id} />
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
              <Dialog open={open} onOpenChange={setOpen}>
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
                          value={formik.values.title}
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
                          value={formik.values.content}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      {createPostIsLoading ? (
                        <Button disabled>Please wait</Button>
                      ) : (
                        <Button type="submit">Save changes</Button>
                      )}
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
                  {postIsLoading && <p>Loading</p>}
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
