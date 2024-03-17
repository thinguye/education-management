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
  GET_INCOMPLETE_SUBJECTS,
  SET_AS_LEAVED,
  GET_GRADUATED_STUDENT,
  GET_INCOMPLETE_STUDENT,
  GET_LEAVED_STUDENT,
  GET_COMPLETED_STUDENT,
  GET_STUDENT_BY_EMAIL,
  GET_STATUS_BY_FILTER,
  GET_CERTIFICATE_BY_FILTER,
  GET_TOTAL_STUDENT,
  GET_CAN_LEARN_SUBJECTS,
  GET_CREDITS,
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
  getStudentByEmail: (email) =>
    axios
      .get(GET_STUDENT_BY_EMAIL, {
        headers: Headers.getHeaders2(),
        params: { email },
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
  setAsLeaved: (id) =>
    axios.post(SET_AS_LEAVED, null, {
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
    axios
      .get(GET_STUDENT_UNDERGRADUATED_BY_FILTER, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
  getIncompleteSubjects: (id) =>
    axios
      .get(GET_INCOMPLETE_SUBJECTS, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getCanLearnSubjects: (id) =>
    axios
      .get(GET_CAN_LEARN_SUBJECTS, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getGraduatedStudents: () =>
    axios
      .get(GET_GRADUATED_STUDENT, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
  getIncompleteStudents: () =>
    axios
      .get(GET_INCOMPLETE_STUDENT, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
  getLeavedStudents: () =>
    axios
      .get(GET_LEAVED_STUDENT, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
  getCompletedStudents: () =>
    axios
      .get(GET_COMPLETED_STUDENT, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
  getStatusByFilter: (generation, department) =>
    axios
      .get(GET_STATUS_BY_FILTER, {
        headers: Headers.getHeaders2(),
        params: { generation, department },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getCertificateByFilter: (generation, department, status) =>
    axios
      .get(GET_CERTIFICATE_BY_FILTER, {
        headers: Headers.getHeaders2(),
        params: { generation, department, status },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getTotalStudents: () =>
    axios
      .get(GET_TOTAL_STUDENT, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
      getCredits:(id)=>axios
      .get(GET_CREDITS, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
};
