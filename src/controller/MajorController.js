import axios from "axios";
import Headers from "../utils/headers";
import { GET_ALL_MAJOR, CREATE_MAJOR,DELETE_MAJOR, GET_MAJOR_BY_ID } from "../url/MajorUrl";

export default {
  getAllMajors: () =>
    axios
      .get(GET_ALL_MAJOR, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteMajor: (id) =>
    axios.post(DELETE_MAJOR, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createMajor: (request) =>
    axios.post(CREATE_MAJOR, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  getMajorById: (request) =>
    axios.post(GET_MAJOR_BY_ID, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
};
