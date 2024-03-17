import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/year";

export const CREATE_YEAR = baseUrl + "/create";
export const GET_ALL_YEAR = baseUrl + "/getAll";
export const GET_YEAR_BY_ID = baseUrl+"/getYearById";
export const DELETE_YEAR = baseUrl +"/remove";
export const UPDATE_YEAR = baseUrl +"/update";