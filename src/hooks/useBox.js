import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../services/api';
import useAlert from './useAlert';

export function useBoxes() {
  const { setAlert } = useAlert();
  function fetchBoxes() {
    return api.get(`box`);
  }
  return useQuery(['box'], fetchBoxes, {
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

export function useDetailBox(idBox) {
  const { setAlert } = useAlert();
  function fetchBoxes({queryKey}) {
    return api.get(`box/${queryKey[1]}`);
  }
  return useQuery(['box',idBox], fetchBoxes, {
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

export function useCreateBox(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createBox(data) {
    return api.post(`box`, data);
  }
  return useMutation(createBox, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat Box", "success");
      queryClient.invalidateQueries({ queryKey: ["box"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdateBox(boxId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function updateBox(data) {
      return api.put(`box/${boxId}`, data);
    }
    return useMutation(updateBox, {
      onSuccess: (data) => {
        setAlert("Berhasil Mengupdate Box", "success");
        queryClient.invalidateQueries({ queryKey: ["box"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

export function useDeleteBox(boxId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteBox() {
      return api.delete(`box/${boxId}`, data);
    }
    return useMutation(deleteBox, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus Box", "success");
        queryClient.invalidateQueries({ queryKey: ["box"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}
