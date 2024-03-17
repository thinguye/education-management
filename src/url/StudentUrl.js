import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/student";

export const CREATE_STUDENT = baseUrl + "/create";
export const GET_ALL_STUDENT = baseUrl + "/getAll";
export const DELETE_STUDENT = baseUrl + "/remove";
export const UPDATE_STUDENT = baseUrl + "/update";
export const IMPORT_STUDENT = baseUrl + "/import";
export const GET_STUDENT_BY_ID = baseUrl + "/getStudentById";
export const GET_STUDENT_GRADUATED = baseUrl + "/getStudentGraduated";
export const GET_STUDENT_UNDERGRADUATED_BY_FILTER =
  baseUrl + "/getStudentUndergraduated";
export const GET_STUDENT_UNDERGRADUATED =
  baseUrl + "/getListStudentUndergraduated";
export const GET_INCOMPLETE_SUBJECTS = baseUrl + "/getIncompleteSubjects";
export const GET_CAN_LEARN_SUBJECTS = baseUrl + "/getSubjectsCanLearn";
export const SET_AS_LEAVED = baseUrl + "/setAsLeaved";
export const SET_AS_GRADUATED = baseUrl + "/setAsGraduated";
export const GET_INCOMPLETE_STUDENT = baseUrl + "/getIncompleteStudent";
export const GET_GRADUATED_STUDENT = baseUrl + "/getGraduatedStudent";
export const GET_COMPLETED_STUDENT = baseUrl + "/getCompletedStudent";
export const GET_LEAVED_STUDENT = baseUrl + "/getLeavedStudent";
export const GET_STUDENT_BY_EMAIL = baseUrl + "/getByEmail";
export const GET_STATUS_BY_FILTER = baseUrl+"/getStatusByFilter";
export const GET_CERTIFICATE_BY_FILTER = baseUrl+"/getCertificateByFilter";
export const GET_TOTAL_STUDENT = baseUrl+"/getTotalStudent";
export const GET_CREDITS = baseUrl+"/getCredits";