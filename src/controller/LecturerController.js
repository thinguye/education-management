import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_LECTURER,
  DELETE_LECTURER,
  CREATE_LECTURER,
} from "../url/LecturerUrl";

export default {
  getAllLecturers: () =>
    axios
      .get(GET_ALL_LECTURER, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteLecturer: (id) =>
    axios.post(DELETE_LECTURER, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createLecturer: (request) =>
    axios.post(CREATE_LECTURER, JSON.stringify(request), {
      headers: Headers.getHeaders2()
    }),
};
