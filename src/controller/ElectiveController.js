import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_ELECTIVE,
  DELETE_ELECTIVE,
  CREATE_ELECTIVE,
  UPDATE_ELECTIVE,
  GET_ALL_ELECTIVE_GROUP,
  DELETE_ELECTIVE_GROUP,
  CREATE_ELECTIVE_GROUP,
  UPDATE_ELECTIVE_GROUP,
  GET_ELECTIVE_BY_GROUP,
} from "../url/ElectiveUrl";

export default {
  getAllElectives: () =>
    axios
      .get(GET_ALL_ELECTIVE, { headers: Headers.getHeaders() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteElective: (id) =>
    axios.post(DELETE_ELECTIVE, null, {
      headers: Headers.getHeaders(),
      params: { id },
    }),
  createElective: (request) =>
    axios.post(CREATE_ELECTIVE, JSON.stringify(request), {
      headers: Headers.getHeaders(),
    }),
  updateElective: (request) =>
    axios.post(UPDATE_ELECTIVE, JSON.stringify(request), {
      headers: Headers.getHeaders(),
    }),
  getAllElectiveGroups: () =>
    axios
      .get(GET_ALL_ELECTIVE_GROUP, { headers: Headers.getHeaders() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteElectiveGroup: (id) =>
    axios.post(DELETE_ELECTIVE_GROUP, null, {
      headers: Headers.getHeaders(),
      params: { id },
    }),
  createElectiveGroup: (request) =>
    axios.post(CREATE_ELECTIVE_GROUP, JSON.stringify(request), {
      headers: Headers.getHeaders(),
    }),
  updateElectiveGroup: (request) =>
    axios.post(UPDATE_ELECTIVE_GROUP, JSON.stringify(request), {
      headers: Headers.getHeaders(),
    }),
  getElectiveByGroup: (id) =>
    axios
      .get(GET_ELECTIVE_BY_GROUP, {
        headers: Headers.getHeaders(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
};
