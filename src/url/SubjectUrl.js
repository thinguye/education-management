import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/subject";

export const CREATE_SUBJECT = baseUrl + "/create";
export const GET_ALL_SUBJECT = baseUrl + "/getAll";
export const DELETE_SUBJECT = baseUrl + "/remove";
export const UPDATE_SUBJECT = baseUrl + "/update";
export const IMPORT_SUBJECT = baseUrl + "/import";