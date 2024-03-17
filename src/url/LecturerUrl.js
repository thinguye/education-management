import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/lecturer";

export const CREATE_LECTURER = baseUrl + "/create";
export const GET_ALL_LECTURER = baseUrl + "/getAll";
export const DELETE_LECTURER = baseUrl + "/remove";
export const GET_BY_EMAIL = baseUrl + "/getLecturerByEmail";