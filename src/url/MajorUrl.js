import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/major";

export const CREATE_MAJOR = baseUrl + "/create";
export const GET_ALL_MAJOR = baseUrl + "/getAll";
export const DELETE_MAJOR = baseUrl + "/remove";
export const GET_MAJOR_BY_ID = baseUrl + "/getById";