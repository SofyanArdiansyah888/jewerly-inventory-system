import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useRiwayatAktivitas(page) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const params = new URLSearchParams();
    params.append("page", queryKey[1]);
    return api.get(`riwayat-aktivitas?${params}`);
  }
  return useQuery(["riwayat-aktivitas", page], fetchData, {
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

export function useRiwayatModal() {
  const { setAlert } = useAlert();
  function fetchData() {
    return api.get(`riwayat-modal`);
  }
  return useQuery(["riwayat-modal"], fetchData, {
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

export function useRiwayatBox() {
  const { setAlert } = useAlert();
  function fetchData() {
    return api.get(`riwayat-box`);
  }
  return useQuery(["riwayat-box"], fetchData, {
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

export function useRiwayatTalang() {
  const { setAlert } = useAlert();
  function fetchData() {
    return api.get(`riwayat-talang`);
  }
  return useQuery(["riwayat-talang"], fetchData, {
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

export function useCreateModal(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createModal(data) {
    return api.post(`riwayat-modal`, data);
  }
  return useMutation(createModal, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Produk", "success");
      queryClient.invalidateQueries({ queryKey: ["riwayat-modal"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}
