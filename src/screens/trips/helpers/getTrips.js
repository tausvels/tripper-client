import axios from 'axios';
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

const getTrips = (userId) =>  {
  return axios.get(`/trips/${userId}`);
}

export default getTrips


