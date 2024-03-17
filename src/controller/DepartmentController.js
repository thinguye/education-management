import axios from "axios";
import Headers from "../utils/headers";
import { GET_ALL_DEPARTMENT, CREATE_DEPARTMENT,DELETE_DEPARTMENT,UPDATE_DEPARTMENT } from "../url/DepartmentUrl";

export default {
  getAllDepartments: () =>
    axios
      .get(GET_ALL_DEPARTMENT, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteDepartment: (id) =>
    axios.post(DELETE_DEPARTMENT, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createDepartment: (request) =>
    axios.post(CREATE_DEPARTMENT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
  updateDepartment: (request) =>
    axios.post(UPDATE_DEPARTMENT, JSON.stringify(request), {
      headers: Headers.getHeaders2(),
    }),
};
