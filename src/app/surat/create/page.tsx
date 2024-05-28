"use client";
import DashboardLayout from "@/app/dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import NextTopLoader from "nextjs-toploader";
import * as Yup from "yup";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import { useCreateSurat } from "@/features/surat/useCreateSurat";
import { toast } from "sonner";
import { useGetSurat } from "@/features/surat/useGetSurat";
const SuratCreate = () => {
  //create handle back
  const idOrganization = localStorage.getItem("id");
  const idOrganizationInt = parseInt(idOrganization || "0");
  const { refetch: refetchSurat } = useGetSurat(idOrganization || "");
  const { mutate: createSurat, isPending } = useCreateSurat({
    onSuccess: () => {
      toast.success("Berhasil membuat surat");
      formik.resetForm();
      refetchSurat();
      // redirect("/dashboard/surat");
    },
  });
  const formik = useFormik({
    initialValues: {
      jenis_surat: "",
      no_surat: "",
      tanggal_surat: "",
      perihal: "",
      organisasi: "",
      pengirim: "",
      file: "",
      organization_id: "",
    },
    validationSchema: Yup.object({
      jenis_surat: Yup.string().required("Jenis Surat harus diisi"),
      no_surat: Yup.string().required("No Surat harus diisi"),
      tanggal_surat: Yup.string()
        .required("Tanggal Surat harus diisi")
        .test(
          "maxDate",
          "Tanggal surat tidak boleh melebihi tanggal saat ini",
          (value) => {
            const today = new Date();
            const selectedDate = new Date(value);
            return selectedDate <= today;
          }
        ),
      perihal: Yup.string().required("Perihal harus diisi"),
      organisasi: Yup.string().required("Organisasi harus diisi"),
      pengirim: Yup.string().required("Pengirim harus diisi"),
      file: Yup.string().required("File harus diisi"),
    }),
    onSubmit: async () => {
      const {
        jenis_surat,
        no_surat,
        tanggal_surat,
        perihal,
        organisasi,
        pengirim,
      } = formik.values;
      createSurat({
        jenis_surat,
        no_surat,
        tanggal_surat,
        perihal,
        organisasi,
        pengirim,
        file: "ini adalah file",
        organization_id: idOrganizationInt,
      });
    },
  });

  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  const handleBackClick = () => {
    window.history.back();
  };
  return (
    <div className="bg-backgroudSecondary">
      <DashboardLayout>
        <div className="mt-10">
          <Button
            variant={"outline"}
            className="rounded-3xl"
            onClick={handleBackClick}
          >
            Kembali
          </Button>
          <div className="mt-5">
            <Card className="border-none rounded-xl p-5">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Tambah Surat Baru
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-2" onSubmit={formik.handleSubmit}>
                  <Select
                    value={formik.values.jenis_surat}
                    onValueChange={(value) =>
                      formik.setFieldValue("jenis_surat", value)
                    }
                  >
                    <p className="text-sm text-foregroundSec">Jenis Surat</p>
                    <SelectTrigger className="bg-backgroudSecondary">
                      <SelectValue placeholder="Pilih Jenis Surat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="surat masuk">Surat Masuk</SelectItem>
                      <SelectItem value="surat keluar">Surat Keluar</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-foregroundSec">Nomor Surat</p>
                  <Input
                    onChange={handleFormInput}
                    value={formik.values.no_surat}
                    name="no_surat"
                    type="text"
                    placeholder="Masukkan Nomor Surat"
                    className="bg-backgroudSecondary"
                  />
                  {formik.touched.no_surat && formik.errors.no_surat ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.no_surat}
                    </p>
                  ) : null}
                  <p className="text-sm text-foregroundSec">Tanggal Surat</p>
                  <Input
                    onChange={handleFormInput}
                    value={formik.values.tanggal_surat}
                    name="tanggal_surat"
                    type="date"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Tanggal Surat"
                  />
                  {formik.touched.tanggal_surat &&
                  formik.errors.tanggal_surat ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.tanggal_surat}
                    </p>
                  ) : null}
                  <p className="text-sm text-foregroundSec">Perihal</p>
                  <Input
                    onChange={handleFormInput}
                    value={formik.values.perihal}
                    name="perihal"
                    type="text"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Perihal"
                  />
                  {formik.touched.perihal && formik.errors.perihal ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.perihal}
                    </p>
                  ) : null}
                  <p className="text-sm text-foregroundSec">Organisasi</p>
                  <Input
                    onChange={handleFormInput}
                    value={formik.values.organisasi}
                    name="organisasi"
                    type="text"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Organisasi Surat"
                  />
                  {formik.touched.organisasi && formik.errors.organisasi ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.organisasi}
                    </p>
                  ) : null}
                  <p className="text-sm text-foregroundSec">Pengirim</p>
                  <Input
                    onChange={handleFormInput}
                    value={formik.values.pengirim}
                    name="pengirim"
                    type="text"
                    className="w-full bg-backgroudSecondary"
                    placeholder="Masukkan Pengirim"
                  />
                  {formik.touched.pengirim && formik.errors.pengirim ? (
                    <p className="text-red-500 text-xs">
                      {formik.errors.pengirim}
                    </p>
                  ) : null}
                  <p className="text-sm text-foregroundSec">File</p>
                  <Input
                    onChange={handleFormInput}
                    name="file"
                    type="file"
                    className="w-full mb-5 bg-backgroudSecondary"
                    accept="application/pdf"
                  />
                  {formik.touched.file && formik.errors.file ? (
                    <p className="text-red-500 text-xs">{formik.errors.file}</p>
                  ) : null}
                  <div className="w-full flex justify-end">
                    {isPending ? (
                      <Button disabled type="submit" className="rounded-3xl">
                        Loading...
                      </Button>
                    ) : (
                      <Button type="submit" className="rounded-3xl">
                        Create surat
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
};

export default SuratCreate;
