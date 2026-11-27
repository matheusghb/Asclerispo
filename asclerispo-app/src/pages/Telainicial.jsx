import { useEffect, useState } from 'react';
import { Database } from '@sqlitecloud/drivers';

function Telainicial() {
  const [data, setData] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [erro, setErro] = useState(null); // cria um estado para armazenar os dados do banco de dados e outro para armazenar erros

  useEffect(() => {
    const getData = async () => {
      let db = null; // cria uma variável para armazenar a conexão com o banco de dados
      try {
        db = new Database("sqlitecloud://cuimtudrok.g4.sqlite.cloud:8860/asclerispo.sqlite?apikey=a5aa6cQEt8csexbp4Rpz98PYb1YMhauwPT5c3uaUYQk");

        const result = await db.sql`SELECT * FROM Post; `; //traz todos os dados da tabela Post do banco de dados
        const comentariosResult = await db.sql`SELECT * FROM Comentario;`;
        
        setData(result);
        setComentarios(comentariosResult);
      } catch (err) {
        console.error("Erro ao consultar SQLite Cloud:", err);
        setErro(err.message);
      } finally {
        db?.close(); // verifica se há erros e fecha a conexão com o banco de dados
      }
    };

    getData(); //busca os dados
  }, []);

  if (erro) return <p>Erro: {erro}</p>; //mostra o erro na tela
  
    async function sendToDb() {
        const db = new Database("sqlitecloud://cuimtudrok.g4.sqlite.cloud:8860/asclerispo.sqlite?apikey=a5aa6cQEt8csexbp4Rpz98PYb1YMhauwPT5c3uaUYQk");
        await db.sql`INSERT INTO Post (Titulo, Criador) VALUES 
        (${document.getElementById('title').value}, 
        ${document.getElementById('creator').value});`;
        db.close();
        window.location.reload(); // manda os valores do post pro banco e recarrega a pagina
    }
    async function sendCommentToDb(postId) {
        const db = new Database("sqlitecloud://cuimtudrok.g4.sqlite.cloud:8860/asclerispo.sqlite?apikey=a5aa6cQEt8csexbp4Rpz98PYb1YMhauwPT5c3uaUYQk");
        await db.sql`INSERT INTO Comentario (comTexto, criaCom, postId) VALUES
        (${document.getElementById('comentariotext'+postId.toString()).value},
        ${document.getElementById('Comcreator'+postId.toString()).value},
        ${postId});`;
        db.close();
        window.location.reload(); // manda os valores do comentario pro banco e recarrega a pagina

     }  return (
    <div>
      <h1>posts</h1>
      <input type ="text" id="creator" placeholder='escreva seu usuário'></input>
      <input type ="text" id="title" placeholder='escreva o titulo do post'></input>
      <button onClick={sendToDb}>postar</button> {/*manda os valores do post pro banco e recarrega a pagina*/}
      <br></br>
      <ul>
        {data.map((Post) => ( 
          <li key={Post.id}><div> 
            <h1 class ="post">{Post.Titulo} por {Post.Criador}</h1>
            <input type ="text" id={"Comcreator"+(Post.id).toString()} placeholder='escreva seu usuário'></input>
            <input type ="text" id={"comentariotext"+(Post.id).toString()} placeholder='escreva seu comentário'></input>
            <button onClick={() => sendCommentToDb(Post.id)}> comentar</button>  {/*manda os valores do comentario pro banco e recarrega a pagina*/}
            </div> 

            {comentarios.map((comentario) => {
              if (comentario.postId === Post.id) { //verifica se o post tem comentarios
                return(
                  <h3>{comentario.criaCom} comentou "{comentario.comTexto}"</h3> //mostra o comentario na tela
                )
              }
            }
              )}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Telainicial;
