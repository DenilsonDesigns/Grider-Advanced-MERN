import { AUTH_USER } from "./types";
import axios from "axios";

export const signup = formProps => dispatch => {
  axios.post("http://localhost:5000/signup", formProps);
};
