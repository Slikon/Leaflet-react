import axios from 'axios';

export const calculateRoute = (payload) => {
  return axios.post('http://localhost:9000/routes/path', payload)
    .then(res => res.data)
    .catch(err => console.log(err));
}

