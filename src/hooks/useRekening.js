import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useRekenings() {
  const { setAlert } = useAlert();
  function fetchRekening() {
    return api.get(`rekening`);
  }
  return useQuery(["rekening"], fetchRekening, {
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

export function useCreateRekening(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createRekening(data) {
    return api.post(`rekening`, data);
  }
  return useMutation(createRekening, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Rekening", "success");
      queryClient.invalidateQueries({ queryKey: ["rekening"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdateRekening(rekeningId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function updateRekening(data) {
      return api.put(`rekening/${rekeningId}`, data);
    }
    return useMutation(updateRekening, {
      onSuccess: (data) => {
        setAlert("Berhasil Mengupdate Rekening", "success");
        queryClient.invalidateQueries({ queryKey: ["rekening"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

export function useDeleteRekening(rekeningId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteRekening() {
      return api.delete(`rekening/${rekeningId}`, data);
    }
    return useMutation(deleteRekening, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Rekening", "success");
        queryClient.invalidateQueries({ queryKey: ["rekening"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}