import { useMutation, useQuery, useQueryClient } from "react-query";
import api from "../services/api";
import useAlert from "./useAlert";

export function useUsers() {
  const { setAlert } = useAlert();
  function fetchUser() {
    return api.get(`user`);
  }
  return useQuery(["user"], fetchUser, {
    onError: (error) => {
      setAlert(error.message,'error');
    },
    select: (data) => {
      if (data.data) {
        return data?.data;
      }
      return [];
    },
  });
}

export function useCreateUser(onSuccessCallback) {
  const { setAlert } = useAlert();
  const queryClient = useQueryClient();
  function createUser(data) {
    return api.post(`user`, data);
  }
  return useMutation(createUser, {
    onSuccess: (data) => {
      setAlert("Berhasil Membuat User", "success");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (error) => {
      setAlert(error.message, "error");
    },
  });
}

export function useUpdateUser(userId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function updateUser(data) {
      return api.put(`user/${userId}`, data);
    }
    return useMutation(updateUser, {
      onSuccess: (data) => {
        setAlert("Berhasil Mengupdate User", "success");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}

export function useDeleteUser(userId,onSuccessCallback) {
    const { setAlert } = useAlert();
    const queryClient = useQueryClient();
    function deleteUser() {
      return api.delete(`user/${userId}`, data);
    }
    return useMutation(deleteUser, {
      onSuccess: (data) => {
        setAlert("Berhasil Menghapus User", "success");
        queryClient.invalidateQueries({ queryKey: ["user"] });
        if (onSuccessCallback) onSuccessCallback(data);
      },
      onError: (error) => {
        setAlert(error.message, "error");
      },
    });
}
