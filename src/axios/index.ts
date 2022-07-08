import axios from "axios";
import {axiosStub} from "./stubs";

export default process.env.REACT_APP_STUB_MODE === 'true' ?
  axios.create({
    baseURL: process.env.REACT_APP_BASE_URL
  }) : axiosStub



