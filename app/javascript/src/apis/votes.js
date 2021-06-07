import axios from "axios";

const list = () => axios.get("/votes");

const create = payload => axios.post("/votes/", payload);

const show = id => axios.get(`/votes/${id}`);

const votesApi = {
  list,
  create,
  show,
};

export default votesApi;
