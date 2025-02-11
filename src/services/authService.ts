import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Ajuste a URL conforme o backend

export const cadastrarUsuario = async (dados: { nome: string; email: string; senha: string }) => {
  return axios.post(`${API_URL}/cadastro`, dados);
};
