import type { Workout } from "./Workout";

export default interface Meta {
  id: number;
  meta: string;
  data_limite: string
  treino?: Workout | null;
}