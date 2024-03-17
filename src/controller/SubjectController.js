import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_SUBJECT,
  DELETE_SUBJECT,
  CREATE_SUBJECT,
  IMPORT_SUBJECT,
} from "../url/SubjectUrl";

export default {
  getAllSubjects: () =>
    axios
      .get(GET_ALL_SUBJECT, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteSubject: (id) =>
    axios.post(DELETE_SUBJECT, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createSubject: (request) =>
    axios.post(CREATE_SUBJECT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  upload: (file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(IMPORT_SUBJECT, formData, {
      headers: Headers.getHeaders3(),
    });
  },
};
