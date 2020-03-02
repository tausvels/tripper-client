import axios from "axios";
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}

export default function getFriendsActivities(
  userId,
  friendId,
  city,
  setFriendsActivities
) {
  axios
    .get(`/users/${userId}/friends/${friendId}/${city}/activities`)
    .then(res => {
      setFriendsActivities(res.data.rows);
    });
}
