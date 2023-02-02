import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useProductItem(rfid) {
  const { setAlert } = useAlert();
  function fetchProductItem({ queryKey }) {
    const params = new URLSearchParams();
    params.append("rfid", queryKey[1]);
    return api.get(`stok/produk-item/detail?${params}`);
  }
  return useQuery(["stok/produk-item/detail", rfid], fetchProductItem, {
    onError: (error) => {
      setAlert(error.message, "error");
    },
    enabled: false,
    cacheTime: 0,
    select: (data) => {
      if (data.data) {
        return data.data;
      }
      return null;
    },
  });
}


export function useProductItems(rfids) {
  const { setAlert } = useAlert();
  function fetchProductItem({ queryKey }) {
    const params = new URLSearchParams();
    params.append("rfids", queryKey[1]);
    return api.get(`timbang/produk-items?${params}`);
  }
  return useQuery(["timbang/produk-items", rfids.map((tag) => tag.rfid).toString()], fetchProductItem, {
    onError: (error) => {
      setAlert(error.message, "error");
    },
    enabled: false,
    cacheTime: 0,
    select: (data) => {
      if (data.data) {
        return data?.data?.map((item) => {
          item.nama_produk = item.produk.nama_produk
          return item;
        });
      }
      return null;
    },
  });
}

export function useRegisterProductItem(onSuccessCallback) {
  const { setAlert } = useAlert();
  function registerProduct(data) {
    return api.post(`produk-item`, data);
  }
  return useMutation(registerProduct, {
    onSuccess: (data) => {
      setAlert("Berhasil Registrasi Produk", "success");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}