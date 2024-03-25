// THIRD-PARTY
import axios, { AxiosError } from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const axiosService = axios.create({
  baseURL: BASE_URL,
});
// interceptor for http
axiosService.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    setTimeout(() => {
      if (
        error.response &&
        error.response.status === 401 &&
        window.location.pathname !== "/login"
      ) {
        window.location.href = "/login";
      }
    }, 500);
    return (
      Promise.reject(error.response && error.response.data) || "Wrong Services"
    );
  }
);

export default axiosService;
