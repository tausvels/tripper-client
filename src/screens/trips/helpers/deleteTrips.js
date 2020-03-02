import axios from 'axios';
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export default function deleteTrip(trip, trips, setTrips) {
  let tripId = trip.id;

  let copy = [...trips];

  let newState = copy.filter(trip => trip.id !== tripId);

  setTrips(newState);

  axios.post(`/trips/delete`, {
    tripId
  });
}