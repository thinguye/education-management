import { serverUrl } from "./ServerUrl";

const baseUrl = serverUrl+"/api/quarter";
const baseUrl1 = serverUrl+"/api/subjectInQuarter";
export const CREATE_SUBJECT_IN_QUARTER = baseUrl + "/addSubject";
export const GET_SUBJECT_IN_QUARTER_BY_ID = baseUrl +"/getSubjectById"
export const GET_ALL_SUBJECT_IN_QUARTER = baseUrl + "/getAllSubject";
export const DELETE_SUBJECT_IN_QUARTER = baseUrl +"/removeSubject";
export const IMPORT_SUBJECTS = baseUrl1 + "/import";
export const GET_BY_LECTURER = baseUrl1 + "/getByLecturer";
export const GET_NUMBER_OF_STUDENTS = baseUrl1 +"/getNoStudents";
export const GET_DISTINCT_SUBJECTS = baseUrl1 +"/getDistinctSubjectsByLecturer"
export const GET_TEACHING_SUBJECTS = baseUrl1 +"/getTeachingSubjects"