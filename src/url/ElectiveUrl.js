import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/elective";

export const CREATE_ELECTIVE = baseUrl + "/create";
export const GET_ALL_ELECTIVE = baseUrl + "/getAll";
export const UPDATE_ELECTIVE = baseUrl + "/update";
export const DELETE_ELECTIVE = baseUrl + "/remove";
export const GET_ELECTIVE_BY_ID = baseUrl + "/getElectiveById";
export const GET_ELECTIVE_BY_GROUP = baseUrl + "/getElectiveByGroup";
export const CREATE_ELECTIVE_GROUP = baseUrl + "/createGroup";
export const GET_ALL_ELECTIVE_GROUP = baseUrl + "/getAllGroup";
export const UPDATE_ELECTIVE_GROUP = baseUrl + "/updateGroup";
export const DELETE_ELECTIVE_GROUP = baseUrl + "/removeGroup";
export const GET_ELECTIVE_GROUP_BY_ID = baseUrl + "/getElectiveGroupById";
