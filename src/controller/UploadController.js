import axios from "axios";
import { SHOW, UPLOAD } from "url/UploadUrl";
import Headers from "../utils/headers";

export default {
  uploadImage: (request) =>
    axios.post(UPLOAD, request, { headers: Headers.getHeaders2() }),
  getImage: (fileName) =>
    axios
      .get(SHOW, { headers: Headers.getHeaders2(), params: { fileName } })
      .then((res) => {
        return res.data.payload;
      }),
};
