import axios from "axios";
import Headers from "../utils/headers";

import { LOGIN, SIGNUP } from "url/AuthUrl";

export default {
  signIn: (request) =>
    axios
      .post(LOGIN, JSON.stringify(request), { headers: Headers.getHeaders() })
      .then((res) => {
        return res.data;
      }),
  signUp: (request) =>
    axios
      .post(SIGNUP, JSON.stringify(request), { headers: Headers.getHeaders() })
      .then((res) => {
        return res.data;
      }),
};
