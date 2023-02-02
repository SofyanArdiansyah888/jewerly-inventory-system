import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function usePenjualan(page) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const params = new URLSearchParams();
    params.append("page", queryKey[1]);
    return api.get(`penjualan?${params}`);
  }
  return useQuery(["penjualan", page], fetchData, {
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

export function useDetailPenjualan(id) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    return api.get(`penjualan/${queryKey[1]}`);
  }
  return useQuery(["penjualan", id], fetchData, {
    onError: (error) => {
      setAlert(error.message, "error");
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
      return null;
    },
  });
}

export function useCreatePenjualan(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createData(data) {
    return api.post(`penjualan`, data);
  }
  return useMutation(createData, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Penjualan", "success");
      queryClient.invalidateQueries({ queryKey: ["penjualan"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

// export function useUpdatePenjualan(idPenjualan, onSuccessCallback) {
//   const { setAlert } = useAlert();
//   const queryClient = useQueryClient();
//   function createData(data) {
//     return api.put(`penjualan/${idPenjualan}`, data);
//   }
//   return useMutation(createData, {
//     onSuccess: (data) => {
//       setAlert("Berhasil Mengupdate Penjualan", "success");
//       queryClient.invalidateQueries({ queryKey: ["penjualan"] });
//       if (onSuccessCallback) onSuccessCallback(data);
//     },
//     onError: (error) => {
//       setAlert(error.message, "error");
//     },
//   });
// }

export function useDeletePenjualan(nomorNota,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteUser() {
      return api.delete(`penjualan/${nomorNota}`, data);
    }
    return useMutation(deleteUser, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Penjualan", "success");
        queryClient.invalidateQueries({ queryKey: ["penjualan"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

