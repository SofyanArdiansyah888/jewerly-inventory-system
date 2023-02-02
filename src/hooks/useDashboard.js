import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../services/api';
import useAlert from './useAlert';

export function useDashboard() {
  const { setAlert } = useAlert();
  function fetchData() {
    return api.get(`dashboard`);
  }
  return useQuery(['dashboard'], fetchData, {
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
