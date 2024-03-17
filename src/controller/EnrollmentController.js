import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_ENROLLMENT,
  CREATE_ENROLLMENT,
  DELETE_ENROLLMENT,
  UPDATE_ENROLLMENT,
  GET_SUBJECT_BY_ID,
  IMPORT_ENROLLMENT,
  UPDATE_GRADE_FILE,
} from "../url/EnrollmentUrl";

export default {
  getAllEnrollments: () =>
    axios
      .get(GET_ALL_ENROLLMENT, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteEnrollment: (id) =>
    axios.post(DELETE_ENROLLMENT, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createEnrollment: (request) =>
    axios.post(CREATE_ENROLLMENT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  updateEnrollment: (request) =>
    axios.post(UPDATE_ENROLLMENT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  getEnrollmentSubject: (id) =>
    axios
      .get(GET_SUBJECT_BY_ID, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  importEnrollment: (request) =>
    axios.post(IMPORT_ENROLLMENT, request, { headers: Headers.getHeaders3() }).then((res) => {return res}),
  updateGradeFile: (request) =>
    axios
      .post(UPDATE_GRADE_FILE, request, { headers: Headers.getHeaders3() })
      .then((res) => {return res}),
};
