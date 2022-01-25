import { doRequest } from "./baseapi-service";

//Recebe a rota
const RESOURSE = "series/";

//Arrow function listar
export const listar = () => {
  /* Chama a Arrow function doRequest (que faz a requisição)
    passando a rota, o método e o body e o parâmetro (se houver)*/
  return doRequest(RESOURSE, "GET");
};

export const inserir = serie => {
  return doRequest(RESOURSE, "POST", serie);
};

export const remover = id => {
  return doRequest(RESOURSE, "DELETE", "", id);
};

export const atualizar = serie => {
  return doRequest(RESOURSE, "PUT", serie, serie.id);
};
