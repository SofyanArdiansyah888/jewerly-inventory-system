import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";
import { helper } from "../utils/helper";

export function usePrintLaporan(params, onSuccessCallback, onErrorCallback) {
  const { setAlert } = useAlert();
  function fetchData({ queryKey }) {
    const { tipe, date } = queryKey[1];
    const dateSplit = date.split("-");
    const [dari, sampai] = dateSplit;
    const { formatDate } = helper;

    const params = new URLSearchParams();
    params.append("tipe", tipe);
    params.append("dari", formatDate(dari, "YYYY-MM-DD"));
    params.append("sampai", formatDate(sampai, "YYYY-MM-DD"));
    return api.get(`print-laporan?${params}`,{},"blob");
  }
  return useQuery(["print-laporan", params], fetchData, {
    refetchOnMount: false,
    enabled: false,
    onSuccess: (data) => {
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error) => {
      setAlert(error.message, "error");
      if (onErrorCallback) {
        onErrorCallback(data);
      }
    }
  });
}
