import axios from 'axios';

export const app = axios.create({
  baseURL: 'https://dummyjson.com/',
});
