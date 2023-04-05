import axios from "axios";

const instance = axios.create({
  baseURL: "https://hocmai.hungnt.click/",
});

export default instance;
