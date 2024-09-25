import axios from "axios";
import * as API from "@/constants/api";

const request = axios.create({
  baseURL: API.ENDPOINT,
  headers: {
    "Content-Type": "application/json",
  },
});

export default request;
