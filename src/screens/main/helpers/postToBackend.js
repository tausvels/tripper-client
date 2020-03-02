import axios from 'axios';
import uuid from "uuid/v4";
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export default function postToBackEnd (tripName, tripId, userId, columns, total, budget) {
  const columnCopy = { ...columns };
  delete columnCopy["list"];
  for (let key in columnCopy) {
    if (!columnCopy[key].items.length) {
      delete columnCopy[key];
    }
  }
  const trip_id = tripId || uuid();
  return axios.post("/trips", {
    [trip_id]: {
      userId,
      columns: columnCopy,
      trip: tripName,
      total,
      budget
    }
  });
};