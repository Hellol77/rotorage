import axios from "axios";

export const axiosApi = (url: string | undefined) =>
  axios.create({
    baseURL: url,
    headers: { withCredentials: true },
  });

const baseUrl = "";

export const defaultApi = axiosApi(baseUrl);
