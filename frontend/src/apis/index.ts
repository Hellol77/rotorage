import axios from "axios";

export const axiosApi = (url: string | undefined) =>
  axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  });

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const defaultApi = axiosApi(baseUrl);
