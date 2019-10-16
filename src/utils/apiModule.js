import axios from "axios";
let API = "https://ftl-frontend-test.herokuapp.com/interest";

const callAPI = {
  get: params => axios.get(API, { params: params })
};

export const getLocalStorage = key => {
  let value = localStorage.getItem(key);
  return value;
};
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};
export default callAPI;
