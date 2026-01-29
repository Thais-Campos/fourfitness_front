import axios from "axios";

export const api = axios.create({
  baseURL: "https://app-fitnessdeploy22.onrender.com",
});

export const metasAPI = {
  listar: async () => (await api.get("/meta")).data,
  getById: async (id: string) => (await api.get(`/meta/${id}`)).data,
  create: async (meta: any) => (await api.post("/meta", meta)).data,
  update: async (meta: any) => (await api.put(`/meta`, meta)).data,
  delete: async (id: string) => (await api.delete(`/meta/${id}`)).data,
};

export const workoutsAPI = {
  getAll: async () => (await api.get("/treinos")).data,
  create: async (treino: any) => (await api.post("/treinos", treino)).data,
 update: async (treino: any) =>
  (await api.put(`/treinos`, treino)).data,

  delete: async (id: number) => (await api.delete(`/treinos/${id}`)).data,

  toggleComplete: async (id: string) => (await api.patch(`/treinos/${id}/toggle`)).data,
};

export const bmiAPI = {
  calculate: async (peso: number, altura: number) =>
    (await api.post("/bmi", { peso, altura })).data,
};