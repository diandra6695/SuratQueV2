"use client";
import useUser from "@/app/auth/hook/useUser";
import DashboardLayout from "@/app/dashboard/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSurat } from "@/features/surat/useGetSurat";
import { useUpdateSurat } from "@/features/surat/useUpdateSurat";
import { Buildings, FilePdf } from "@phosphor-icons/react";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import * as Yup from "yup";

const EditSurat: React.FC = () => {
  const searchParams = useSearchParams();
  const [id, setId] = useState<string | null>(null);
  const [idIsLoading, setIsLoading] = useState<boolean | null>(false);
  const [idOrganization, setIdOrganization] = useState("");
  const { data: userData } = useUser();
  const router = useRouter();
  useEffect(() => {
    const idOrganization = localStorage.getItem("id");
    setIdOrganization(idOrganization ? String(idOrganization) : "0");
  }, []);

  const {
    data: suratData,
    isLoading,
    refetch: refetchSurat,
  } = useGetSurat(idOrganization);

  useEffect(() => {
    const idParam = searchParams.get("id");
    if (idParam) {
      setId(idParam);
    } else setIsLoading(true);
  }, [searchParams]);

  const suratFilter = suratData
    ? suratData?.data.filter((surat: any) => surat.id_unique == id)
    : [];
  const handleBackClick = () => {
    window.history.back();
  };
  const idSurat = suratFilter[0]?.id;

  const isoDateString = !isLoading ? suratFilter[0]?.createdAt : "Loading...";

  const { mutate: updateSurat, isPending } = useUpdateSurat({
    onSuccess: () => {
      toast.success("Berhasil membuat surat");
      refetchSurat();
      formik.resetForm;
      if (suratFilter[0]?.jenis_surat == "surat masuk") {
        router.push("/surat/masuk");
      } else {
        router.push("/surat/keluar");
      }
      //   window.location.reload();
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
    },
    // validationSchema: Yup.object({
    //   jenis_surat: Yup.string().required("Jenis Surat harus diisi"),
    //   no_surat: Yup.string().required("No Surat harus diisi"),
    //   tanggal_surat: Yup.string()
    //     .required("Tanggal Surat harus diisi")
    //     .test(
    //       "maxDate",
    //       "Tanggal surat tidak boleh melebihi tanggal saat ini",
    //       (value) => {
    //         const today = new Date();
    //         const selectedDate = new Date(value);
    //         return selectedDate <= today;
    //       }
    //     ),
    //   perihal: Yup.string().required("Perihal harus diisi"),
    //   organisasi: Yup.string().required("Organisasi harus diisi"),
    //   pengirim: Yup.string().required("Pengirim harus diisi"),
    // }),
    onSubmit: async () => {
      const {
        jenis_surat,
        no_surat,
        tanggal_surat,
        perihal,
        organisasi,
        pengirim,
      } = formik.values;
      updateSurat({
        id: idSurat,
        jenis_surat,
        no_surat,
        tanggal_surat,
        perihal,
        organisasi,
        pengirim,
      });
      formik.setFieldValue("no_surat", suratFilter[0]?.no_surat);
      formik.setFieldValue("tanggal_surat", suratFilter[0]?.tanggal_surat);
      formik.setFieldValue("perihal", suratFilter[0]?.perihal);
      formik.setFieldValue("organisasi", suratFilter[0]?.organisasi);
      formik.setFieldValue("pengirim", suratFilter[0]?.pengirim);
      formik.setFieldValue("file", suratFilter[0]?.file);
    },
  });

  if (suratFilter.length > 0) {
    const newJenisSurat = suratFilter[0]?.jenis_surat;
    if (formik.values.jenis_surat !== newJenisSurat) {
      formik.setFieldValue("jenis_surat", newJenisSurat);
      formik.setFieldValue("no_surat", suratFilter[0]?.no_surat);
      formik.setFieldValue("tanggal_surat", suratFilter[0]?.tanggal_surat);
      formik.setFieldValue("perihal", suratFilter[0]?.perihal);
      formik.setFieldValue("organisasi", suratFilter[0]?.organisasi);
      formik.setFieldValue("pengirim", suratFilter[0]?.pengirim);
      formik.setFieldValue("file", suratFilter[0]?.file);
    }
  }

  const handleFormInput = (e: any) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
  };
  return (
    <div className="bg-backgroudSecondary">
      <DashboardLayout>
        {parseInt(idOrganization) > 0 ? (
          <div className="mt-10">
            <Button
              variant={"outline"}
              className="rounded-3xl"
              onClick={handleBackClick}
            >
              Kembali
            </Button>
            <div className="mt-5">
              <Card className="border-none rounded-xl p-5 mb-10">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold">
                    Edit Surat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    "Loading..."
                  ) : (
                    <form className="space-y-2" onSubmit={formik.handleSubmit}>
                      <Select
                        disabled
                        value={formik.values.jenis_surat}
                        onValueChange={(value) =>
                          formik.setFieldValue("jenis_surat", value)
                        }
                      >
                        <p className="text-sm text-foregroundSec">
                          Jenis Surat
                        </p>
                        <SelectTrigger className="bg-backgroudSecondary">
                          <SelectValue placeholder="Pilih Jenis Surat" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="surat masuk">
                            Surat Masuk
                          </SelectItem>
                          <SelectItem value="surat keluar">
                            Surat Keluar
                          </SelectItem>
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
                      <p className="text-sm text-foregroundSec">
                        Tanggal Surat
                      </p>
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
                        disabled
                        name="file"
                        value={formik.values.file}
                        type="text"
                        className="w-full mb-5 bg-backgroudSecondary"
                        accept="application/pdf"
                      />
                      <div className="w-full flex justify-end">
                        {isPending ? (
                          <Button
                            disabled
                            type="submit"
                            className="rounded-3xl"
                          >
                            Loading...
                          </Button>
                        ) : (
                          <Button type="submit" className="rounded-3xl">
                            Update surat
                          </Button>
                        )}
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <div className="">
            <div className="w-full text-foregroundThird h-screen flex flex-col gap-2 justify-center items-center">
              <Buildings size={150} weight="fill" />
              <h1 className="text-xl font-semibold">
                Organization Not Selected!
              </h1>
            </div>
          </div>
        )}
      </DashboardLayout>
    </div>
  );
};

export default EditSurat;
