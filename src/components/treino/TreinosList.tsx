import { useState, useEffect } from "react";
import {
  Dumbbell,
  Plus,
  Edit2,
  Trash2,
  Loader,
  Clock,
} from "lucide-react";
import { workoutsAPI } from "../../services/api";
import type { Workout as Treino } from "../../models/Workout";
import { TreinoForm } from "./TreinoForm";
import { showError, showSuccess } from "../../utils/Toast";

export function TreinosList() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [treinoEmEdicao, setTreinoEmEdicao] = useState<Treino | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarTreinos();
  }, []);

  const carregarTreinos = async () => {
    try {
      setLoading(true);
      const dados = await workoutsAPI.getAll();
      setTreinos(dados);
    } catch (error) {
      console.error("Erro ao carregar treinos:", error);
    } finally {
      setLoading(false);
    }
  };

const adicionarTreino = async (treino: Treino) => {
  try {
    await workoutsAPI.create({
      exercicio: treino.exercicio,
      divisao: treino.divisao,
      nivel: treino.nivel,
      duracao: treino.duracao,
    });
    showSuccess("Treino criado com sucesso");       // <-- toast sucesso
    await carregarTreinos();
  } catch (error) {
    showError("Erro ao criar treino.");             // <-- toast erro
  }
};

const atualizarTreino = async (treino: Treino) => {
  try {
    const atualizado = await workoutsAPI.update(treino);
    setTreinos((prev) =>
      prev.map((t) => (t.id === atualizado.id ? atualizado : t))
    );
    setTreinoEmEdicao(null);
    setShowForm(false);
    showSuccess("Treino atualizado com sucesso");   // <-- toast sucesso
  } catch (error) {
    showError("Erro ao atualizar treino.");         // <-- toast erro
  }
};

const excluirTreino = async (id: number) => {
  if (confirm("Excluir treino?")) {
    try {
      await workoutsAPI.delete(id);
      showSuccess("Treino excluído com sucesso");   // <-- toast sucesso
      await carregarTreinos();
    } catch (error) {
      showError("Erro ao excluir treino.");         // <-- toast erro
    }
  }
};


  const editarTreino = (treino: Treino) => {
    setTreinoEmEdicao(treino);
    setShowForm(true);
  };

  const fecharForm = () => {
    setShowForm(false);
    setTreinoEmEdicao(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Carregando treinos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur opacity-40" />
                <div className="relative bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg shadow-orange-900/40">
                  <Dumbbell className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Meus Treinos</h1>
                <p className="text-gray-400 mt-1">
                  Treinos simples e objetivos. Faça e volte para sua vida!
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Novo Treino
          </button>
        </div>

        {treinos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treinos.map((treino) => (
              <div
                key={treino.id}
                className="group bg-zinc-900 rounded-3xl p-7 shadow-lg border border-orange-700/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-600 transition-colors">
                      {treino.divisao}
                    </h3>
                    <p className="text-sm text-gray-400">
                       • {treino.nivel}
                    </p>
                  </div>
                </div>

                {/* Duração */}
                <div className="mb-5 p-4 bg-zinc-800 rounded-xl border border-orange-700/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <p className="text-xs font-semibold text-gray-400">Duração</p>
                  </div>
                  <p className="text-sm font-bold text-white">{treino.duracao}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => editarTreino(treino)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-700/20 text-orange-600 rounded-xl hover:bg-orange-700/30 transition-all font-medium border border-orange-700/30"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => excluirTreino(treino.id)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-3xl p-16 shadow-lg border border-orange-700/15 text-center">
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700/15 to-orange-800/15 rounded-full blur-3xl" />
                <Dumbbell className="relative w-20 h-20 text-zinc-700 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Nenhum treino cadastrado
              </h3>
              <p className="text-gray-400 mb-8">
                Comece criando seu primeiro treino!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Criar Primeiro Treino
              </button>
            </div>
          </div>
        )}

{showForm && (
  <TreinoForm
    treino={treinoEmEdicao}
    onSave={treinoEmEdicao ? atualizarTreino : adicionarTreino}
    onClose={fecharForm}
  />
)}



      </div>
    </div>
  );
}

export default TreinosList;
