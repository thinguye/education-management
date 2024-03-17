import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_YEAR,
  DELETE_YEAR,
  CREATE_YEAR,
  UPDATE_YEAR,
  GET_YEAR_BY_ID,
} from "../url/YearUrl";

export default {
  getAllYears: () =>
    axios.get(GET_ALL_YEAR, { headers: Headers.getHeaders2() }).then((res) => {
      return res.data.payload;
    }),
  getYearById: (id) =>
    axios
      .get(GET_YEAR_BY_ID, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  deleteYear: (id) =>
    axios.post(DELETE_YEAR, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createYear: (request) =>
    axios.post(CREATE_YEAR, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  updateYear: (request) =>
    axios.post(UPDATE_YEAR, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
};
