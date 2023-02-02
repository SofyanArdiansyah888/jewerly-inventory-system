import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useModals() {
  const { setAlert } = useAlert();
  function fetchData() {
    return api.get(`riwayat-modal`);
  }
  return useQuery(["riwayat-modal"], fetchData, {
    onError: (error) => {
      setAlert(error.message,'error');
    },
    select: (data) => {
      if (data.data) {
        return data?.data.data;
      }
      return [];
    },
  });
}

