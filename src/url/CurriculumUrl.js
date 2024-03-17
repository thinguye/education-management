import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/curriculum";

export const CREATE_CURRICULUM = baseUrl + "/create";
export const GET_ALL_CURRICULUM = baseUrl + "/getAll";
export const DELETE_CURRICULUM = baseUrl + "/remove";
export const UPDATE_CURRICULUM = baseUrl + "/update";
export const GET_CURRICULUM_BY_ID = baseUrl + "/getCurriculumById";
export const GET_SUBJECT_IN_CURRICULUM = baseUrl + "/getSubjectByCurriculum";
export const GET_ELECTIVE_IN_CURRICULUM = baseUrl + "/getElectiveByCurriculum";
export const ADD_SUBJECT_TO_CURRICULUM = baseUrl + "/addSubjectToCurriculum";
export const ADD_ELECTIVE_TO_CURRICULUM = baseUrl + "/addElectiveToCurriculum";
export const IMPORT_CURRICULUM = baseUrl + "/import";
