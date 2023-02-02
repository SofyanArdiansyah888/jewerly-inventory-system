import { useMutation, useQuery } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useSimpanTimbang(onSuccessCallback) {
  const { setAlert } = useAlert();
  function simpanTimbang(data) {
    return api.post(`timbang/simpan`, data);
  }
  return useMutation(simpanTimbang, {
    onSuccess: (data) => {
      setAlert("Berhasil Menyimpan Hasil Timbang", "success");
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useTimbangs(date) {
  const { setAlert } = useAlert();
  function fetchTimbang({queryKey}) {
    let params = new URLSearchParams()
    if(queryKey[1].date)
    params.append('date',queryKey[1].date)
    return api.get(`timbang?${params}`);
  }
  return useQuery(["timbang",{date}], fetchTimbang, {
    onError: (error) => {
      setAlert(error.message, "error");
    },
    cacheTime: 0,
    select: (data) => {
      if (data.data) {
        let temp = data?.data;
        temp?.map((item) => {
            item.nama_talang = item.talang.nama_talang;
            return item;
        })
        return temp;
      }
      return [];
    },
  });
}
