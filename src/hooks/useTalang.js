import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useTalangs() {
  const { setAlert } = useAlert();
  function fetchTalang() {
    return api.get(`talang`);
  }
  return useQuery(["talang"], fetchTalang, {
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

export function useDetailTalang(idTalang) {
  const { setAlert } = useAlert();
  function fetchData({queryKey}) {
    return api.get(`talang/${queryKey[1]}`);
  }
  return useQuery(['talang',idTalang], fetchData, {
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

export function useCreateTalang(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createTalang(data) {
    return api.post(`talang`, data);
  }
  return useMutation(createTalang, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Talang", "success");
      queryClient.invalidateQueries({ queryKey: ["talang"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdateTalang(talangId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function updateTalang(data) {
      return api.put(`talang/${talangId}`, data);
    }
    return useMutation(updateTalang, {
      onSuccess: (data) => {
        setAlert("Berhasil Mengupdate Talang", "success");
        queryClient.invalidateQueries({ queryKey: ["talang"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

export function useDeleteTalang(talangId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteTalang() {
      return api.delete(`talang/${talangId}`, data);
    }
    return useMutation(deleteTalang, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Talang", "success");
        queryClient.invalidateQueries({ queryKey: ["talang"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}