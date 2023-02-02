import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function usePesanan(page) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const params = new URLSearchParams();
    params.append("page", queryKey[1]);
    return api.get(`pesanan?${params}`);
  }
  return useQuery(["pesanan", page], fetchData, {
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

export function useDetailPesanan(id) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    return api.get(`pesanan/${queryKey[1]}`);
  }
  return useQuery(["pesanan", id], fetchData, {
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

export function useCreatePesanan(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createData(data) {
    return api.post(`pesanan`, data);
  }
  return useMutation(createData, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Pesanan", "success");
      queryClient.invalidateQueries({ queryKey: ["pesanan"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdatePesanan(idPesanan, onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createData(data) {
    return api.put(`pesanan/${idPesanan}`, data);
  }
  return useMutation(createData, {
    onSuccess: (data) => {
      setAlert("Berhasil Mengupdate Pesanan", "success");
      queryClient.invalidateQueries({ queryKey: ["pesanan"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useDeletePesanan(idPesanan,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteUser() {
      return api.delete(`pesanan/${idPesanan}`, data);
    }
    return useMutation(deleteUser, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Pesanan", "success");
        queryClient.invalidateQueries({ queryKey: ["pesanan"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

