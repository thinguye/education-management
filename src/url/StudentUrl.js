import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/student";

export const CREATE_STUDENT = baseUrl + "/create";
export const GET_ALL_STUDENT = baseUrl + "/getAll";
export const DELETE_STUDENT = baseUrl + "/remove";
export const UPDATE_STUDENT = baseUrl + "/update";
export const IMPORT_STUDENT = baseUrl + "/import";
export const GET_STUDENT_BY_ID = baseUrl + "/getStudentById";
export const GET_STUDENT_GRADUATED = baseUrl + "/getStudentGraduated";
export const GET_STUDENT_UNDERGRADUATED_BY_FILTER = baseUrl + "/getStudentUndergraduated";
export const GET_STUDENT_UNDERGRADUATED = baseUrl + "/getListStudentUndergraduated";