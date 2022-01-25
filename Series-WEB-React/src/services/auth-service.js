import { doPublicRequest } from "./baseapi-service";
const TOKEN_KEY = "@Series:token";
const RESOURCE = "auth/";

export const signIn = async (usuario) => {
  try {
    //chama a função que faz a requisição
    //passando a rota, o método e usuario(email e senha)
    //e guarda na const retorno o retorno dessa chamada
    const retorno = await doPublicRequest(
      RESOURCE + "autenticar/",
      "POST",
      usuario
    );

    //Verifica se o retorno foi ok
    if (retorno.ok) {
      //Guarda em usuário o retorno.json (o token)
      usuario = await retorno.json();
      //salva em localStorage com o nome de TOKEN_KEY o token transformado em JSON
      localStorage.setItem(TOKEN_KEY, JSON.stringify(usuario));
    }

    //Retorna o retorno (sendo possível verificar o status)
    return retorno;
  } catch (erro) {
    //Caso dê errado exibe o erro no console e o retorna
    console.log(erro);
    return erro;
  }
};

export const signOut = () => {
  //Remove o Token do localstorage
  localStorage.removeItem(TOKEN_KEY);
};

//Usado para verificar se o usuário está logado
export const isSignedIn = () => {
  //Salva em usuario o token
  const usuario = localStorage.getItem(TOKEN_KEY);
  //Tranforma o usuario em objeto e o retorna
  return JSON.parse(usuario);
};

//Método que retorna o Token do usuário
export const getToken = () => {
  //Salva em usuario o token convertido para objeto
  const usuario = JSON.parse(localStorage.getItem(TOKEN_KEY));
  //Retorna o token
  return usuario.token;
};
