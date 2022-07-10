import axios from "axios";
import {axiosStub} from "./stubs";

export default process.env.REACT_APP_STUB_MODE === 'false' ?
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  }) : axiosStub



