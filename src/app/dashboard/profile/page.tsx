"use client";
import { Card } from "@/components/ui/card";
import DashboardLayout from "../layout/DashboardLayout";
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
import { useState } from "react";
import { useCreatePost } from "@/features/post/useCreatePost";
import { useDeletePost } from "@/features/post/useDeletePost";
import { toast } from "sonner";
import { useUpdatePost } from "@/features/post/useUpdatePost";
import upload from "../utils";
import useUser from "../../auth/hook/useUser";
import Link from "next/link";

const Dashboard = () => {
  const user = useUser();
  const userName = user.data?.display_name;

  const [file, setFile]: any = useState<File>();
  const [open, setOpen] = useState(false);
  const {
    data,
    isLoading: postIsLoading,
    refetch: refetchProduct,
  } = useFetchPosts();
  const { mutate: createPost, isPending: createPostIsLoading } = useCreatePost({
    onSuccess: () => {
      refetchProduct();
      setOpen(false);
      toast("Sucess", {
        description: "Surat Berhasil disimpan",
      });
    },
  });
  const { mutate: deletePost, isPending: deletePostIsLoading } = useDeletePost({
    onSuccess: () => {
      refetchProduct();
      toast("Sucess", {
        description: "Surat Berhasil dihapus",
      });
    },
  });

  const { mutate: editPost, isPending: editPostIsLoading } = useUpdatePost({
    onSuccess: () => {
      refetchProduct();
      setOpen(false);
      toast("Sucess", {
        description: "Surat Berhasil diedit",
      });
      formik.resetForm();
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      id: 0,
    },
    onSubmit: async () => {
      const { title, content, id } = formik.values;

      if (!title || !content) {
        toast("Error", {
          description: "Data harus diisi.",
        });
        return;
      }
      const fileData = new FormData();
      fileData.set("file", file);
      let uploadedFileName;
      try {
        const result = await upload(fileData, userName);
        uploadedFileName = result.fileName;
        console.log(uploadedFileName);
      } catch (error: any) {
        toast("Error", {
          description: error.message,
        });
        return;
      }
      if (id) {
        editPost({
          title,
          content,
          id,
        });
      } else {
        createPost({
          title,
          content,
          file: uploadedFileName,
        });
        setFile(false);
        formik.resetForm();
      }
    },
  });

  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };

  const onEditClick = (post: any) => {
    formik.setFieldValue("title", post.title);
    formik.setFieldValue("content", post.content);
    formik.setFieldValue("id", post.id);
  };

  const Dropdown = ({ post }: any) => {
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
                  This action cannot be undone. This will permanently delete
                  your post and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>
                  {deletePostIsLoading ? (
                    <Button disabled>Please wait</Button>
                  ) : (
                    <Button onClick={() => deletePost(post.id)}>Delete</Button>
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <DialogTrigger asChild>
            <Button onClick={() => onEditClick(post)} className="">
              <PencilSimpleLine size={18} weight="bold" />
              Ganti Nama
            </Button>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
    );
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
            <Link href={`/uploads/${post.file}`}>
              <FilePdf size={28} weight="light" />
            </Link>
          </TableCell>
          <TableCell>
            <Dropdown post={post} />
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <div className="">
      <div className="">
        <DashboardLayout>
          <div className=""></div>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
