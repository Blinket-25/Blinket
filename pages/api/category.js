// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { BASE_URL } from "@/constants";
import axios from "axios";

export default async function handler(req, res) {
  // const data = await getResult();
  const { data } = await axios.get(BASE_URL + "/APP-API/NewV1/getCategorys");
  res.status(200).json(data);
}
