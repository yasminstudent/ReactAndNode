//Importações de dependecias
import axios from 'axios';

//Constante que contem a url base para fazer as requisições
const api = axios.create({
  baseURL: 'https://api.github.com',
});

export default api;
