import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function usePembelian(page) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const params = new URLSearchParams();
    params.append("page", queryKey[1]);
    return api.get(`pembelian?${params}`);
  }
  return useQuery(["pembelian", page], fetchData, {
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

export function useDetailPembelian(id) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    return api.get(`pembelian/${queryKey[1]}`);
  }
  return useQuery(["pembelian", id], fetchData, {
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

export function useCreatePembelian(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createData(data) {
    return api.post(`pembelian`, data);
  }
  return useMutation(createData, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Pembelian", "success");
      queryClient.invalidateQueries({ queryKey: ["pembelian"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

// export function useUpdatePembelian(idPembelian, onSuccessCallback) {
//   const { setAlert } = useAlert();
//   const queryClient = useQueryClient();
//   function createData(data) {
//     return api.put(`pembelian/${idPembelian}`, data);
//   }
//   return useMutation(createData, {
//     onSuccess: (data) => {
//       setAlert("Berhasil Mengupdate Pembelian", "success");
//       queryClient.invalidateQueries({ queryKey: ["pembelian"] });
//       if (onSuccessCallback) onSuccessCallback(data);
//     },
//     onError: (error) => {
//       setAlert(error.message, "error");
//     },
//   });
// }

export function useDeletePembelian(nomorNota,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteUser() {
      return api.delete(`pembelian/${nomorNota}`, data);
    }
    return useMutation(deleteUser, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Pembelian", "success");
        queryClient.invalidateQueries({ queryKey: ["pembelian"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

