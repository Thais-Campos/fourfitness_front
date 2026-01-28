import { useState, useEffect } from 'react';
import { Dumbbell, Plus, Edit2, Trash2, Clock, Calendar, CheckCircle, Circle, Loader, Activity } from 'lucide-react';
import { workoutsAPI, type Workout as Treino } from '../../services/api'; 
import { TreinoForm } from './TreinoForm';

export function TreinosList() {
  const [treinos, setTreinos] = useState<Treino[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [treinoEmEdicao, setTreinoEmEdicao] = useState<Treino | null>(null);
  const [filtro, setFiltro] = useState<'todos' | 'concluidos' | 'pendentes'>('todos');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarTreinos();
  }, []);

  const carregarTreinos = async () => {
    try {
      setCarregando(true);
      const dados = await workoutsAPI.getAll();
      setTreinos(dados);
    } catch (erro) {
      console.error('Erro ao carregar treinos:', erro);
    } finally {
      setCarregando(false);
    }
  };

  const adicionarTreino = async (treino: Omit<Treino, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await workoutsAPI.create(treino);
      await carregarTreinos();
      setShowForm(false);
    } catch (erro) {
      console.error('Erro ao criar treino:', erro);
    }
  };

  const atualizarTreino = async (treino: Omit<Treino, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (treinoEmEdicao) {
      try {
        await workoutsAPI.update(treinoEmEdicao.id, treino);
        await carregarTreinos();
        setTreinoEmEdicao(null);
        setShowForm(false);
      } catch (erro) {
        console.error('Erro ao atualizar treino:', erro);
      }
    }
  };

  const excluirTreino = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este treino?')) {
      try {
        await workoutsAPI.delete(id);
        await carregarTreinos();
      } catch (erro) {
        console.error('Erro ao deletar treino:', erro);
      }
    }
  };

  const alternarConcluido = async (id: string) => {
    try {
      await workoutsAPI.toggleComplete(id);
      await carregarTreinos();
    } catch (erro) {
      console.error('Erro ao atualizar status do treino:', erro);
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

  const treinosFiltrados = treinos.filter((t) => {
    if (filtro === 'concluidos') return t.concluido;
    if (filtro === 'pendentes') return !t.concluido;
    return true;
  });

  if (carregando) {
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
                <h1 className="text-4xl font-bold text-white">
                  Meus Treinos
                </h1>
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

        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setFiltro('todos')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              filtro === 'todos'
                ? 'bg-gradient-to-r from-orange-700 to-orange-800 text-white shadow-lg shadow-orange-900/20'
                : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 border border-orange-700/15'
            }`}
          >
            Todos <span className="ml-1.5 opacity-80">({treinos.length})</span>
          </button>
          <button
            onClick={() => setFiltro('pendentes')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              filtro === 'pendentes'
                ? 'bg-gradient-to-r from-orange-700 to-orange-800 text-white shadow-lg shadow-orange-900/20'
                : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 border border-orange-700/15'
            }`}
          >
            Pendentes <span className="ml-1.5 opacity-80">({treinos.filter((t) => !t.concluido).length})</span>
          </button>
          <button
            onClick={() => setFiltro('concluidos')}
            className={`px-5 py-2.5 rounded-xl font-semibold transition-all ${
              filtro === 'concluidos'
                ? 'bg-gradient-to-r from-orange-700 to-orange-800 text-white shadow-lg shadow-orange-900/20'
                : 'bg-zinc-900 text-gray-400 hover:bg-zinc-800 border border-orange-700/15'
            }`}
          >
            Concluídos <span className="ml-1.5 opacity-80">({treinos.filter((t) => t.concluido).length})</span>
          </button>
        </div>

        {/* Grid de Treinos */}
        {treinosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treinosFiltrados.map((treino) => (
              <div
                key={treino.id}
                className={`group bg-zinc-900 rounded-3xl p-7 shadow-lg border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  treino.concluido
                    ? 'border-green-600/25 shadow-green-900/10'
                    : 'border-orange-700/15 shadow-orange-900/10'
                } hover:border-orange-700/30`}
              >
                {/* Cabeçalho do card */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-600 transition-colors">
                      {treino.nome}
                    </h3>
                    {treino.descricao && (
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {treino.descricao}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => alternarConcluido(treino.id)}
                    className="ml-2 transition-transform hover:scale-110"
                  >
                    {treino.concluido ? (
                      <CheckCircle className="w-7 h-7 text-green-500 drop-shadow-lg" />
                    ) : (
                      <Circle className="w-7 h-7 text-zinc-700 hover:text-orange-600" />
                    )}
                  </button>
                </div>

                {/* Informações */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl border border-orange-700/15">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <Clock className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300">
                      {treino.duracao} minutos
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl border border-orange-700/15">
                    <div className="p-2 bg-zinc-900 rounded-lg">
                      <Calendar className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-semibold text-gray-300">
                      {new Date(treino.data).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                {/* Exercícios */}
                {treino.exercicios && treino.exercicios.length > 0 && (
                  <div className="mb-5 p-4 bg-zinc-800 rounded-xl border border-orange-700/15">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4 text-orange-600" />
                      <p className="text-sm font-semibold text-gray-300">Exercícios:</p>
                    </div>
                    <ul className="space-y-2">
                      {treino.exercicios.slice(0, 3).map((exercicio, idx) => (
                        <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                          <span className="text-orange-600 mt-0.5">●</span>
                          <span className="flex-1">{typeof exercicio === 'string' ? exercicio : exercicio.name}</span>
                        </li>
                      ))}
                      {treino.exercicios.length > 3 && (
                        <li className="text-sm text-orange-600 italic font-medium">
                          +{treino.exercicios.length - 3} mais...
                        </li>
                      )}
                    </ul>
                  </div>
                )}

                {/* Ações */}
                <div className="flex gap-3 pt-5 border-t border-zinc-800">
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
          <div className="bg-zinc-900 rounded-3xl p-16 shadow-lg shadow-orange-900/10 border border-orange-700/15 text-center">
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700/15 to-orange-800/15 rounded-full blur-3xl" />
                <Dumbbell className="relative w-20 h-20 text-zinc-700 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {filtro === 'todos' ? 'Nenhum treino cadastrado' : `Nenhum treino ${filtro === 'concluidos' ? 'concluído' : 'pendente'}`}
              </h3>
              <p className="text-gray-400 mb-8">
                {filtro === 'todos' ? 'Comece criando seu primeiro treino!' : 'Tente outro filtro para ver seus treinos'}
              </p>
              {filtro === 'todos' && (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  Criar Primeiro Treino
                </button>
              )}
            </div>
          </div>
        )}

        {/* Modal do Form */}
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