import { useEffect, useState } from 'react';
import Banco, { useBanco } from '../components/banco';

function LandingContent() {
  const [data, setData] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [erro, setErro] = useState(null);
  const { withDatabase } = useBanco();

  useEffect(() => {
    const getData = async () => {
      try {
        const { posts, comentarios: comentariosResult } = await withDatabase(async (db) => {
          const posts = await db.sql`SELECT * FROM Post;`;
          const comentarios = await db.sql`SELECT * FROM Comentario;`;
          return { posts, comentarios };
        });

        setData(posts);
        setComentarios(comentariosResult);
      } catch (err) {
        console.error('Erro ao consultar SQLite Cloud:', err);
        setErro(err instanceof Error ? err.message : String(err));
      }
    };

    getData();
  }, [withDatabase]); // Carrega postagens e comentarios pelo provedor compartilhado de banco de dados.

  if (erro) return <p>Erro: {erro}</p>;

  async function sendToDb() {
    await withDatabase(async (db) => {
      await db.sql`INSERT INTO Post (Titulo, Criador) VALUES
        (${document.getElementById('title').value},
        ${document.getElementById('creator').value});`;
    });
    window.location.reload();
  } // Insere uma postagem usando o auxiliar compartilhado de conexao com o banco.

  async function sendCommentToDb(postId) {
    await withDatabase(async (db) => {
      await db.sql`INSERT INTO Comentario (comTexto, criaCom, postId) VALUES
        (${document.getElementById('comentariotext' + postId.toString()).value},
        ${document.getElementById('Comcreator' + postId.toString()).value},
        ${postId});`;
    });
    window.location.reload();
  } // Insere um comentario na postagem selecionada.

  return (
    <div>
      <h1>posts</h1>
      <input type="text" id="creator" placeholder="escreva seu usuário" />
      <input type="text" id="title" placeholder="escreva o titulo do post" />
      <button onClick={sendToDb}>postar</button>
      <br />
      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <div>
              <h1 className="post">{post.Titulo} por {post.Criador}</h1>
              <input
                type="text"
                id={'Comcreator' + post.id.toString()}
                placeholder="escreva seu usuário"
              />
              <input
                type="text"
                id={'comentariotext' + post.id.toString()}
                placeholder="escreva seu comentário"
              />
              <button onClick={() => sendCommentToDb(post.id)}>comentar</button>
            </div>

            {comentarios.map((comentario) => {
              if (comentario.postId === post.id) {
                return (
                  <h3 key={comentario.id}>
                    {comentario.criaCom} comentou "{comentario.comTexto}"
                  </h3>
                );
              }
              return null;
            })}
          </li>
        ))}
      </ul>
    </div>
  );
} // Renderiza a interface de postagens e comentarios usando o acesso fornecido pelo provedor.

export default function Landing() {
  return (
    <Banco>
      <LandingContent />
    </Banco>
  ); // Disponibiliza o provedor de banco de dados para LandingContent.
}
