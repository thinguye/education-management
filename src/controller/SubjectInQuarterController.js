import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_SUBJECT_IN_QUARTER,
  DELETE_SUBJECT_IN_QUARTER,
  CREATE_SUBJECT_IN_QUARTER,
  GET_SUBJECT_IN_QUARTER_BY_ID,
  GET_BY_LECTURER,
  IMPORT_SUBJECTS,
  GET_NUMBER_OF_STUDENTS,
  GET_DISTINCT_SUBJECTS,
  GET_TEACHING_SUBJECTS,
} from "../url/SubjectInQuarterUrl";

export default {
  getAllSubjectInQuarters: () =>
    axios
      .get(GET_ALL_SUBJECT_IN_QUARTER, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  getByLecturer: (id) =>
    axios
      .get(GET_BY_LECTURER, { headers: Headers.getHeaders2(), params: { id } })
      .then((res) => {
        return res.data.payload;
      }),
  deleteSubjectInQuarter: (id) =>
    axios.post(DELETE_SUBJECT_IN_QUARTER, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createSubjectInQuarter: (request) =>
    axios.post(CREATE_SUBJECT_IN_QUARTER, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  getSubjectById: (id) =>
    axios
      .get(GET_SUBJECT_IN_QUARTER_BY_ID, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  upload: (file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios
      .post(IMPORT_SUBJECTS, formData, {
        headers: Headers.getHeaders3(),
      })
      .then((res) => {
        return res;
      });
  },
  getNoStudents: (id, code, generation) =>
    axios
      .get(GET_NUMBER_OF_STUDENTS, {
        headers: Headers.getHeaders2(),
        params: { id, code, generation },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getDistinctSubjectsByLecture: (id) =>
    axios
      .get(GET_DISTINCT_SUBJECTS, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getTeachingSubjects:(id)=>
  axios
      .get(GET_TEACHING_SUBJECTS, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
};
