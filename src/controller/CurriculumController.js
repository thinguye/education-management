import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_CURRICULUM,
  DELETE_CURRICULUM,
  CREATE_CURRICULUM,
  GET_CURRICULUM_BY_ID,
  GET_SUBJECT_IN_CURRICULUM,
  ADD_SUBJECT_TO_CURRICULUM,
  UPDATE_CURRICULUM,
  GET_ELECTIVE_IN_CURRICULUM,
  ADD_ELECTIVE_TO_CURRICULUM,
  IMPORT_CURRICULUM,
} from "../url/CurriculumUrl";

export default {
  getAllCurriculums: () =>
    axios
      .get(GET_ALL_CURRICULUM, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteCurriculum: (id) =>
    axios.post(DELETE_CURRICULUM, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createCurriculum: (request) =>
    axios.post(CREATE_CURRICULUM, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  getCurriculumById: (id) =>
    axios
      .get(GET_CURRICULUM_BY_ID, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getSubjectByCurriculum: (id) =>
    axios
      .get(GET_SUBJECT_IN_CURRICULUM, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  addSubjectToCurriculum: (request) =>
    axios.post(ADD_SUBJECT_TO_CURRICULUM, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  updateCurriculum: (request) =>
    axios.post(UPDATE_CURRICULUM, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  getElectives: (id) =>
    axios
      .get(GET_ELECTIVE_IN_CURRICULUM, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  addElectiveToCurriculum: (request) =>
    axios.post(ADD_ELECTIVE_TO_CURRICULUM, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  upload: (file) => {
    let formData = new FormData();
    formData.append("file", file);
    axios.post(IMPORT_CURRICULUM, formData, {
      headers: Headers.getHeaders3(),
    });
  },
};
