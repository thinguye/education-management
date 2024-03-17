import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/auth";

export const LOGIN = baseUrl + "/signin";
export const SIGNUP = baseUrl + "/signup";
