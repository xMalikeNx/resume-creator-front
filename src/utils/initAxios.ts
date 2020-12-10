import axios from 'axios';

export const initAxios = () => {
  axios.defaults.withCredentials = true;
};
