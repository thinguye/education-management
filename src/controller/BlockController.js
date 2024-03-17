import axios from "axios";
import Headers from "../utils/headers";

import { GET_BLOCK_BY_CURRICULUM } from "url/BlockUrl";
export default {
  getBlocksByCurriculum: (id) =>
    axios
      .get(GET_BLOCK_BY_CURRICULUM, {
        headers: Headers.getHeaders2(),
        params: { id },
      })
      .then((res) => {
        return res.data.payload;
      }),
};
