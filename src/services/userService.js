import http from "./httpService";
import { apiUrl } from "../config.json";

const usersApiEndpoint = apiUrl + "/users";

export function register(user) {
  return http.post(usersApiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
