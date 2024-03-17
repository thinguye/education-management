import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/generation";

export const CREATE_GENERATION = baseUrl + "/create";
export const GET_ALL_GENERATION = baseUrl + "/getAll";
export const DELETE_GENERATION = baseUrl +"/remove";
export const UPDATE_GENERATION = baseUrl +"/update";
