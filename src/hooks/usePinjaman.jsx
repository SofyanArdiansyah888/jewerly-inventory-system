import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function usePinjaman(page) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const params = new URLSearchParams();
    params.append("page", queryKey[1]);
    return api.get(`pinjaman?${params}`);
  }
  return useQuery(["pinjaman", page], fetchData, {
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

export function useDetailPinjaman(id) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    return api.get(`pinjaman/${queryKey[1]}`);
  }
  return useQuery(["pinjaman", id], fetchData, {
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

export function useCreatePinjaman(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createData(data) {
    return api.post(`pinjaman`, data);
  }
  return useMutation(createData, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Pinjaman", "success");
      queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

// export function useUpdatePinjaman(idPinjaman, onSuccessCallback) {
//   const { setAlert } = useAlert();
//   const queryClient = useQueryClient();
//   function createData(data) {
//     return api.put(`pinjaman/${idPinjaman}`, data);
//   }
//   return useMutation(createData, {
//     onSuccess: (data) => {
//       setAlert("Berhasil Mengupdate Pinjaman", "success");
//       queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
//       if (onSuccessCallback) onSuccessCallback(data);
//     },
//     onError: (error) => {
//       setAlert(error.message, "error");
//     },
//   });
// }

export function useDeletePinjaman(nomorNota,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteUser() {
      return api.delete(`pinjaman/${nomorNota}`, data);
    }
    return useMutation(deleteUser, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Pinjaman", "success");
        queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

