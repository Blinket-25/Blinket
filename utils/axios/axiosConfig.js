import { BASE_URL, ENDPOINT_PRIFIX } from "@/constants";
import axios from "axios";

const axiosClient = axios.create({
  baseURL: BASE_URL + ENDPOINT_PRIFIX,
});

export default axiosClient;
