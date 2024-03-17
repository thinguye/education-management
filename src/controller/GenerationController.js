import axios from "axios";
import Headers from "../utils/headers";
import {
  GET_ALL_GENERATION,
  DELETE_GENERATION,
  CREATE_GENERATION,
  UPDATE_GENERATION
} from "../url/GenerationUrl";

export default {
  getAllGenerations: () =>
    axios
      .get(GET_ALL_GENERATION, { headers: Headers.getHeaders2() })
      .then((res) => {
        return res.data.payload;
      }),
  deleteGeneration: (id) =>
    axios.post(DELETE_GENERATION, null, {
      headers: Headers.getHeaders2(),
      params: { id },
    }),
  createGeneration: (request) =>
    axios.post(CREATE_GENERATION, JSON.stringify(request), {
      headers: Headers.getHeaders2()
    }),
    updateGeneration: (request) =>
    axios.post(UPDATE_GENERATION, JSON.stringify(request), {
      headers: Headers.getHeaders2()
    }),
};
