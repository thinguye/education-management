import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_STUDENT,
  DELETE_STUDENT,
  CREATE_STUDENT,
  UPDATE_STUDENT,
  IMPORT_STUDENT,
  GET_STUDENT_BY_ID,
  GET_STUDENT_UNDERGRADUATED,
  GET_STUDENT_GRADUATED,
  GET_STUDENT_UNDERGRADUATED_BY_FILTER,
} from "../url/StudentUrl";

export default {
  getAllStudents: () =>
    axios
      .get(GET_ALL_STUDENT, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  getStudentById: (id) =>
    axios
      .get(GET_STUDENT_BY_ID, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getUndergraduatedStudent: () =>
    axios
      .get(GET_STUDENT_UNDERGRADUATED, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  getGraduatedStudent: () =>
    axios
      .get(GET_STUDENT_GRADUATED, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteStudent: (id) =>
    axios.post(DELETE_STUDENT, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createStudent: (request) =>
    axios.post(CREATE_STUDENT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  updateStudent: (request) =>
    axios.post(UPDATE_STUDENT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  upload: (file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(IMPORT_STUDENT, formData, {
      headers: Headers.getHeaders3(),
    });
  },
  getUndergraduateStudent: () =>
    axios.get(GET_STUDENT_UNDERGRADUATED_BY_FILTER, {
      headers: Headers.getHeaders2(),
    }).then((res) => {
      return res.data.payload;
    }),
};
