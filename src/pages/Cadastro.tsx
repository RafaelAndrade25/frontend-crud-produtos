import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cadastrarUsuario } from "../services/authService";
import Layout from "../components/Layout";

function Cadastro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [mensagem, setMensagem] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.email || !formData.senha) {
      setMensagem("Preencha todos os campos!");
      return;
    }

    try {
      const response = await cadastrarUsuario(formData);
      if (response.status === 201) {
        setMensagem("Cadastro realizado com sucesso! Redirecionando...");
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      setMensagem("Erro ao cadastrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Cadastro</h2>

          {mensagem && <p className="text-center text-red-500">{mensagem}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700">Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">E-mail:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Senha:</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition"
            >
              Cadastrar
            </button>
          </form>

          <p className="text-center text-gray-600 mt-4">
            Já tem uma conta? <a href="/" className="text-blue-500 hover:underline">Faça login</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Cadastro;
