import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/produtos",
});

export const getProdutos = async () => {
  return api.get("/");
};

export const createProduto = async (produto: any) => {
  return api.post("/", produto);
};

export const deleteProduto = async (id: number) => {
  return api.delete(`/${id}`);
};

// Nova função para buscar um produto pelo ID
export const getProdutoById = async (id: number) => {
  return api.get(`/${id}`);
};
