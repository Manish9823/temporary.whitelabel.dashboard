// import { sign, verify } from "jsonwebtoken";
// import jwtDecode from "jwt-decode";
import axiosInstance from "./AxiosInstance";

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  return true;
  //   const decoded = jwtDecode(accessToken);
  //   const currentTime = Date.now() / 1000;

  //   return decoded.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem("accessToken");
    delete axiosInstance.defaults.headers.common.Authorization;
  }
};

export { isValidToken, setSession };
