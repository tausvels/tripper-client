import axios from 'axios';
if (process.env.REACT_APP_API_BASE_URL) {
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
}      

export default function getDestination (arg) {
  return axios.get(`/trips/edit/${arg}`)
    .then(res=> {

      const result = res.data
      console.log("CONSOLE LOGGING FROM GETDESTINATION.JS" , result)
      
      let newState={};

          res.data.forEach((obj) => {
            newState[obj.destination_id] = {
              name: obj.destination_name,
              items:[],
              total:0
            } 
          })

          res.data.forEach((obj)=>{
            const destinationItem = {
              id: obj.destination_id,
              city: obj.city,
              country: obj.country
            }
            newState[obj.destination_id].items.push(destinationItem);
          })
        
      return newState
  })
    .catch((err) => {
      if(err.status=== 404) {
        console.log("oh no 404")
      } else {
        console.error(err);
      }
    })
}
