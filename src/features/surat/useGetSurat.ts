import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface Surat {
  id: number;
  no_surat: string;
  jenis_surat: string;
  tanggal_surat: string;
  tanggal_terima: string;
  perihal: string;
  organisasi: string;
  pengirim: string;
  file: string;
  organization_id: number;
  createdAt: string;
  updatedAt: string;
}

export const useGetSurat = (id: string) => {
  return useQuery({
    queryKey: ["userFromDatabase", id],
    queryFn: async () => {
      const surat = await axiosInstance.get<Surat[]>(
        `/surat/organization/${id}`
      );
      return surat;
    },
  });
};
