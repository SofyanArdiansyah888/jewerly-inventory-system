/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { getUser } from "./database";

let token = "";
// process.env.REACT_APP_APIURL,
const defaults = {
  baseURL: "https://apps.cahayagoldjewellery.com/api/", 
  headers: () => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, 
  }),
  error: {
    code: "INTERNAL_ERROR",
    message:
      "Something went wrong. Please check your internet connection or contact our support.",
    status: 503,
    data: {},
  },
};

const api = (method, url, variables,responseType) =>{
  token = getUser()?.token;
  return new Promise((resolve, reject) => {
    axios({
      url: `${defaults.baseURL}${url}`,
      method,
      responseType,
      headers: defaults.headers(),
      params: method === "get" ? variables : undefined,
      data: method !== "get" ? variables : undefined,
      //   paramsSerializer: objectToQueryString,
    }).then(
      
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error)
      }
    );
  });}

export default {
  get: (...args) => api("get", ...args),
  post: (...args) => api("post", ...args),
  put: (...args) => api("put", ...args),
  patch: (...args) => api("patch", ...args),
  delete: (...args) => api("delete", ...args),
};
