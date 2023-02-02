import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useBoxKeTalang(onSuccessCallback) {
  const { setAlert } = useAlert();
  function transaksiProduk(data) {
    return api.post(`box-talang/box-talang`, data);
  }
  return useMutation(transaksiProduk, {
    onSuccess: (data) => {
      setAlert("Transaksi Berhasil", "success");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useTalangKeBox(onSuccessCallback) {
  const { setAlert } = useAlert();
  function transaksiProduk(data) {
    return api.post(`box-talang/talang-box`, data);
  }
  return useMutation(transaksiProduk, {
    onSuccess: (data) => {
      setAlert("Transaksi Berhasil", "success");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}
