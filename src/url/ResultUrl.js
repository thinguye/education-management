import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl + "/api/result";
export const GET_RESULT_BY_STUDENT = baseUrl + "/getResultByStudent";
export const GET_SUBJECTS_IN_LAST_QUARTER_STUDENT = baseUrl + "/getSubjectInLastQuarterByStudent"