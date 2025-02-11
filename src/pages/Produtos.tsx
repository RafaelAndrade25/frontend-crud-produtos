import { useEffect, useState } from "react";
import { getProdutos, deleteProduto, getProdutoById } from "../services/produtoService";
import Layout from "../components/Layout";

// Definição do tipo Produto
interface Produto {
  id: number;
  nome: string;
  preco: number;
}

function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produto1, setProduto1] = useState<number | null>(null);
  const [produto2, setProduto2] = useState<number | null>(null);
  const [comparacao, setComparacao] = useState<string | null>(null);

  useEffect(() => {
    getProdutos().then((res) => setProdutos(res.data));
  }, []);

  const compararPrecos = async () => {
    if (!produto1 || !produto2 || produto1 === produto2) {
      setComparacao("Selecione dois produtos diferentes para comparar!");
      return;
    }

    const p1 = await getProdutoById(produto1);
    const p2 = await getProdutoById(produto2);

    if (p1.data.preco < p2.data.preco) {
      setComparacao(`${p1.data.nome} é mais barato que ${p2.data.nome}`);
    } else if (p1.data.preco > p2.data.preco) {
      setComparacao(`${p2.data.nome} é mais barato que ${p1.data.nome}`);
    } else {
      setComparacao("Os produtos têm o mesmo preço.");
    }
  };

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Gestão de Produtos</h1>

        {/* Comparação de Preços */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Comparar Preços</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <select
              className="p-2 border rounded w-full md:w-1/2 focus:ring focus:ring-blue-300"
              value={produto1 || ""}
              onChange={(e) => setProduto1(Number(e.target.value))}
            >
              <option value="">Selecione o primeiro produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - R$ {produto.preco}
                </option>
              ))}
            </select>

            <select
              className="p-2 border rounded w-full md:w-1/2 focus:ring focus:ring-blue-300"
              value={produto2 || ""}
              onChange={(e) => setProduto2(Number(e.target.value))}
            >
              <option value="">Selecione o segundo produto</option>
              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - R$ {produto.preco}
                </option>
              ))}
            </select>

            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              onClick={compararPrecos}
            >
              Comparar
            </button>
          </div>

          {comparacao && (
            <p className="mt-4 text-lg font-semibold text-gray-800 bg-gray-100 p-3 rounded text-center">
              {comparacao}
            </p>
          )}
        </div>

        {/* Lista de Produtos */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Produtos Cadastrados</h2>
          {produtos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtos.map((produto) => (
                <div
                  key={produto.id}
                  className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold">{produto.nome}</h3>
                  <p className="text-gray-600">Preço: R$ {produto.preco.toFixed(2)}</p>
                  <button
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => deleteProduto(produto.id)}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">Nenhum produto cadastrado.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Produtos;
