import { createContext, useCallback, useContext, useMemo } from 'react';
import { Database } from '@sqlitecloud/drivers';

const BancoContext = createContext(null);
const DATABASE_URL =
  'sqlitecloud://cuimtudrok.g4.sqlite.cloud:8860/asclerispo.sqlite?apikey=a5aa6cQEt8csexbp4Rpz98PYb1YMhauwPT5c3uaUYQk';

export function useBanco() {
  const banco = useContext(BancoContext);

  if (!banco) {
    throw new Error('useBanco must be used within a Banco provider.');
  }

  return banco;
} // Disponibiliza o auxiliar de banco de dados do provedor para os componentes descendentes.

/*
 * Para implementar o banco de dados em outras paginas:
 * 1. Importe o componente Banco e envolva o componente da pagina com <Banco>.
 * 2. Dentro da pagina, importe useBanco e obtenha a funcao withDatabase.
 * 3. Use await withDatabase(async (db) => { (expressão sql) }) para executar consultas SQL.
 * 4. Trate erros com try/catch e atualize o estado da interface conforme o resultado.
 * A conexao e fechada automaticamente ao terminar cada operacao.
 */

export default function Banco({ children }) {
  const withDatabase = useCallback(async (operation) => {
    const db = new Database(DATABASE_URL);

    try {
      return await operation(db);
    } finally {
      db.close();
    }
  }, []);

  const value = useMemo(() => ({ withDatabase }), [withDatabase]);

  return <BancoContext.Provider value={value}>{children}</BancoContext.Provider>;
} // Compartilha o acesso ao banco de dados e fecha cada conexao apos a operacao.

/*   useEffect(() => {               //funções da pagina Landing.jsx caso algo de errado
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
*/