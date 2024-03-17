import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_SUBJECTS_IN_BLOCK,
  GET_SUBJECTS_IN_CURRICULUM,
  GET_ALL_SUBJECTS_IN_BLOCK
} from "url/SubjectInBlockUrl";
import { GET_ALL_SUBJECT } from "url/SubjectUrl";

export default {
  getSubjectsInBlock: (id) =>
    axios
      .get(GET_SUBJECTS_IN_BLOCK, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getSubjectsInCurriculum: (id) =>
    axios
      .get(GET_SUBJECTS_IN_CURRICULUM, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
  getAll: () =>
    axios
      .get(GET_ALL_SUBJECTS_IN_BLOCK, {
        headers: Headers.getHeaders2(),
      })
      .then((res) => {
        return res.data.payload;
      }),
};
