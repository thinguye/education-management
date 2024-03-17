import axios from "axios";
import Headers from "../utils/headers";

import { GET_RESULT_BY_STUDENT, GET_SUBJECTS_IN_LAST_QUARTER_STUDENT } from "url/ResultUrl";

export default {
  getResultsByStudent: (id) =>
    axios
      .get(GET_RESULT_BY_STUDENT, { headers: Headers.getHeaders2() , params: { id }})
      .then((res) => {
        return res.data.payload;
      }),
      getSubjectInLastQuarterByStudent:(id)=>    axios
      .get(GET_SUBJECTS_IN_LAST_QUARTER_STUDENT, { headers: Headers.getHeaders2() , params: { id }})
      .then((res) => {
        return res.data.payload;
      }),
};
