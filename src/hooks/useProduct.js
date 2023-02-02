import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useProducts() {
  const { setAlert } = useAlert();
  function fetProducts() {
    return api.get(`produk`);
  }
  return useQuery(["produk"], fetProducts, {
    onError: (error) => {
      setAlert(error.message,'error');
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
      return [];
    },
  });
}

export function useCreateProduk(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createProduk(data) {
    return api.post(`produk`, data);
  }
  return useMutation(createProduk, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Produk", "success");
      queryClient.invalidateQueries({ queryKey: ["produk"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdateProduk(produkId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function updateProduk(data) {
      return api.put(`produk/${produkId}`, data);
    }
    return useMutation(updateProduk, {
      onSuccess: (data) => {
        setAlert("Berhasil Mengupdate Produk", "success");
        queryClient.invalidateQueries({ queryKey: ["produk"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

export function useDeleteProduk(produkId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteProduk() {
      return api.delete(`produk/${produkId}`, data);
    }
    return useMutation(deleteProduk, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Produk", "success");
        queryClient.invalidateQueries({ queryKey: ["produk"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}
