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
import { PencilSimpleLine, TrashSimple } from "@phosphor-icons/react";

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
  return (
    <div className="">
      <div className="">
        <DashboardLayout>
          <Card className="w-full p-5">
            <div className="flex justify-between mb-5">
              <Input placeholder="Cari Surat" className="max-w-sm" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>test</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Jenis</TableHead>
                    <TableHead>Tanggal Pembuatan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">1</TableCell>
                    <TableCell>
                      Sepatu, sepatu apa yang bisa buat masak?
                    </TableCell>
                    <TableCell>29/02/2024</TableCell>
                    <TableCell>
                      <Dropdown />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <h1>sepatula.... HAHAHAHA</h1>
          </Card>
        </DashboardLayout>
      </div>
    </div>
  );
};

export default Dashboard;
