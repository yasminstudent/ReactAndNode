//Importe do arquivo que possui as config consig e recebe a função customExpress (e seu retorno)
const app = require('./src/server');

app.listen(3000, () =>{
    console.log("Servidor rodando na porta 3000");
})



