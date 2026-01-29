import { useState, useEffect } from "react";
import { X, Plus, Trash2, Dumbbell, Clock, Activity } from "lucide-react";
import type { Workout as Treino } from "../../models/Workout";
import { workoutsAPI } from "../../services/api";

interface TreinoFormProps {
  treino: Treino | null;
  onSave: (treino: Treino) => void;
  onClose: () => void;
}

export function TreinoForm({ treino, onSave, onClose }: TreinoFormProps) {
  const [dadosForm, setDadosForm] = useState({
    exercicio: "",
    divisao: "",
    nivel: "",
    duracao: "",
  });

  const [exercicios, setExercicios] = useState<string[]>([""]);

  useEffect(() => {
    if (treino) {
      setDadosForm({
        exercicio: treino.exercicio,
        divisao: treino.divisao,
        nivel: treino.nivel,
        duracao: treino.duracao.slice(0, 2), // "30" vindo de "30:00:00"
      });
    }
  }, [treino]);

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const treinoFinal: Treino = {
    id: treino?.id ?? 0,
    exercicio: dadosForm.exercicio,
    divisao: dadosForm.divisao,
    nivel: dadosForm.nivel,
    duracao: `${String(dadosForm.duracao).padStart(2, "0")}:00:00`,
  };

  onSave(treinoFinal);
  onClose();
};

  const handleChange = (campo: string, valor: string | boolean) => {
    setDadosForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const adicionarExercicio = () => setExercicios([...exercicios, ""]);
  const removerExercicio = (i: number) =>
    setExercicios(exercicios.filter((_, idx) => idx !== i));
  const handleExercicioChange = (i: number, valor: string) => {
    const novos = [...exercicios];
    novos[i] = valor;
    setExercicios(novos);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 rounded-3xl shadow-2xl shadow-orange-900/20 border border-orange-700/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        <div className="sticky top-0 bg-gradient-to-r from-orange-700 to-orange-800 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {treino ? "Editar Treino" : "Novo Treino"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* EXERCÍCIO */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-300 mb-3">
              <Dumbbell className="w-4 h-4 text-orange-600" />
              Exercícios *
            </label>
            <textarea
              required
              value={dadosForm.exercicio}
              onChange={(e) => handleChange("exercicio", e.target.value)}
              placeholder="Ex: Agachamento, Leg Press, Stiff"
              rows={3}
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 
                 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 
                 outline-none transition-all resize-none bg-zinc-800 
                 text-white placeholder-gray-500"
            />
          </div>

          {/* DIVISÃO + NÍVEL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block font-semibold text-gray-300 mb-3">
                Divisão *
              </label>
              <input
                type="text"
                required
                value={dadosForm.divisao}
                onChange={(e) => handleChange("divisao", e.target.value)}
                placeholder="Ex: Pernas, Peito, Costas"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 
                   focus:ring-2 focus:ring-orange-700 focus:border-orange-700 
                   outline-none transition-all bg-zinc-800 
                   text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-3">
                Nível *
              </label>
              <input
                type="text"
                required
                value={dadosForm.nivel}
                onChange={(e) => handleChange("nivel", e.target.value)}
                placeholder="Ex: Iniciante, Intermediário"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 
                   focus:ring-2 focus:ring-orange-700 focus:border-orange-700 
                   outline-none transition-all bg-zinc-800 
                   text-white placeholder-gray-500"
              />
            </div>
          </div>

          {/* DURAÇÃO */}
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-300 mb-3">
              <Clock className="w-4 h-4 text-orange-600" />
              Duração (horas) *
            </label>
            <input
              type="number"
              required
              value={dadosForm.duracao}
              onChange={(e) => handleChange("duracao", e.target.value)}
              placeholder="1"
              min="1"
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 
                 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 
                 outline-none transition-all bg-zinc-800 
                 text-white placeholder-gray-500"
            />
          </div>

          {/* BOTÕES */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-zinc-800 text-gray-300 rounded-xl 
                 font-semibold hover:bg-zinc-700 transition-all 
                 border border-zinc-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-700 to-orange-800 
                 text-white rounded-xl font-semibold hover:shadow-xl 
                 hover:shadow-orange-900/30 transition-all 
                 hover:scale-105 active:scale-95"
            >
              {treino ? "Atualizar Treino" : "Criar Treino"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TreinoForm;
