import axios from 'axios';
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}
const getActivityByCityName = function (cityName) {
  let req = {
    url: `/api/activities/${cityName}`,
    method: `GET`
  }
  return axios(req)
};