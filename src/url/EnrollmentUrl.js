import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/enrollment";

export const CREATE_ENROLLMENT = baseUrl + "/create";
export const GET_ALL_ENROLLMENT = baseUrl + "/getAll";
export const DELETE_ENROLLMENT = baseUrl + "/remove";
export const UPDATE_ENROLLMENT = baseUrl + "/update";
export const GET_SUBJECT_BY_ID = baseUrl + "/getStudentBySubject";
export const IMPORT_ENROLLMENT = baseUrl + "/import";
export const UPDATE_GRADE_FILE = baseUrl + "/updateGradeFile";
