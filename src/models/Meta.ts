import type { Workout } from "./Workout";

export default interface Meta {
  descricao: any;
  id: number;
  meta: string;
  data_limite: string
  treino?: Workout | null;
}