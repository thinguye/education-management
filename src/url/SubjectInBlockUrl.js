import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/subjectInBlock";

export const GET_SUBJECTS_IN_BLOCK = baseUrl + "/getSubjectsInBlock";
export const GET_SUBJECTS_IN_CURRICULUM = baseUrl + "/getSubjectsInCurriculum";
export const GET_ALL_SUBJECTS_IN_BLOCK = baseUrl + "/getAll";