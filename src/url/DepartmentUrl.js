import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/organization";

export const CREATE_DEPARTMENT = baseUrl + "/create";
export const GET_ALL_DEPARTMENT = baseUrl + "/getAll";
export const DELETE_DEPARTMENT = baseUrl + "/remove";
export const UPDATE_DEPARTMENT = baseUrl + "/update";