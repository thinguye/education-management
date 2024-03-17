import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_QUARTER,
  DELETE_QUARTER,
  CREATE_QUARTER,
  GET_QUARTERS_BY_YEAR,
} from "../url/QuarterUrl";

export default {
  getAllQuarters: () =>
    axios
      .get(GET_ALL_QUARTER, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  getQuartersByYear: (year) =>
    axios
      .get(GET_QUARTERS_BY_YEAR, {
        headers: Headers.getHeaders2(),
        params: { year },
      })
      .then((res) => {
        return res.data.payload;
      }),
  deleteQuarter: (id) =>
    axios.post(DELETE_QUARTER, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createQuarter: (request) =>
    axios.post(CREATE_QUARTER, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
};
