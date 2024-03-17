import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/quarter";

export const CREATE_QUARTER = baseUrl + "/create";
export const GET_ALL_QUARTER = baseUrl + "/getAll";
export const DELETE_QUARTER = baseUrl + "/remove";
export const UPDATE_QUARTER = baseUrl + "/update";
export const GET_QUARTERS_BY_YEAR = baseUrl + "/getQuartersByYear";
