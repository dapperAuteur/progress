import axios from 'axios';

export const login = cred => {
  return axios.post('https://maljuburi-progress.herokuapp.com/api/auth', cred);
};
