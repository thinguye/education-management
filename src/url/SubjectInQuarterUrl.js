import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/quarter";

export const CREATE_SUBJECT_IN_QUARTER = baseUrl + "/addSubject";
export const GET_SUBJECT_IN_QUARTER_BY_ID = baseUrl +"/getSubjectById"
export const GET_ALL_SUBJECT_IN_QUARTER = baseUrl + "/getAllSubject";
export const DELETE_SUBJECT_IN_QUARTER = baseUrl +"/removeSubject";