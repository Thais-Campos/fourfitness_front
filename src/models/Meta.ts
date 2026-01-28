import type Treino from "./Treino";

export default interface Meta {
    id: number;
    objetivo: string;
    descricao: string;
    peso: number;
    altura: number;
    imc?: number;
    classificacao?: string;
    validade: Date;
    treino?: Treino | null;
}
