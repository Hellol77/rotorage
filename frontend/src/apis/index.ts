import axios from "axios";

export const axiosApi = (url: string | undefined) =>
  axios.create({
    baseURL: url,
  });

const baseUrl = "";

export const defaultApi = axiosApi(baseUrl);
