import http from "./httpService";
import { apiUrl } from "../config.json";

const genresApiEndpoint = apiUrl + "/genres";

export function getGenres() {
  return http.get(genresApiEndpoint);
}
