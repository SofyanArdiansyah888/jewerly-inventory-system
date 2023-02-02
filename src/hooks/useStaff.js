import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useStaffs() {
  const { setAlert } = useAlert();
  function fetchStaff() {
    return api.get(`penjual`);
  }
  return useQuery(["penjual"], fetchStaff, {
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

export function useCreateStaff(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createStaff(data) {
    return api.post(`penjual`, data);
  }
  return useMutation(createStaff, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Staff", "success");
      queryClient.invalidateQueries({ queryKey: ["penjual"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdateStaff(penjualId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function updateStaff(data) {
      return api.put(`penjual/${penjualId}`, data);
    }
    return useMutation(updateStaff, {
      onSuccess: (data) => {
        setAlert("Berhasil Mengupdate Staff", "success");
        queryClient.invalidateQueries({ queryKey: ["penjual"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

export function useDeleteStaff(penjualId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteStaff() {
      return api.delete(`penjual/${penjualId}`, data);
    }
    return useMutation(deleteStaff, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Staff", "success");
        queryClient.invalidateQueries({ queryKey: ["penjual"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}