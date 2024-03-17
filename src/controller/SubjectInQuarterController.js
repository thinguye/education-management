import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_SUBJECT_IN_QUARTER,
  DELETE_SUBJECT_IN_QUARTER,
  CREATE_SUBJECT_IN_QUARTER,
  GET_SUBJECT_IN_QUARTER_BY_ID,
} from "../url/SubjectInQuarterUrl";

export default {
  getAllSubjectInQuarters: () =>
    axios
      .get(GET_ALL_SUBJECT_IN_QUARTER, { headers: Headers.getHeaders2() })
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
    axios.get(GET_SUBJECT_IN_QUARTER_BY_ID, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
};
