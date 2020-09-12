import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const usersApiEndpoint = apiUrl + "/auth";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(usersApiEndpoint, { email, password });
  localStorage.setItem("token", jwt);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt,
};
