import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useBarangBeli(page) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const params = new URLSearchParams();
    params.append("page", queryKey[1]);
    return api.get(`barang-beli?${params}`);
  }
  return useQuery(["barang-beli", page], fetchData, {
    onError: (error) => {
      setAlert(error.message, "error");
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
      return [];
    },
  });
}


// export function useCreateModal(onSuccessCallback) {
//   const { setAlert } = useAlert();
//   const queryClient = useQueryClient();
//   function createModal(data) {
//     return api.post(`riwayat-modal`, data);
//   }
//   return useMutation(createModal, {
//     onSuccess: (data) => {
//       setAlert("Berhasil Membuat Produk", "success");
//       queryClient.invalidateQueries({ queryKey: ["riwayat-modal"] });
//       if (onSuccessCallback) onSuccessCallback(data);
//     },
//     onError: (error) => {
//       setAlert(error.message, "error");
//     },
//   });
// }
