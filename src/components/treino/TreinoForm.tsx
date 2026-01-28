import { useState, useEffect } from 'react';
import { X, Plus, Trash2, Dumbbell, Clock, Activity } from 'lucide-react';
import { type Workout as Treino} from '../../services/api';

interface TreinoFormProps {
  treino: Treino | null;
  onSave: (treino: Omit<Treino, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;

}


export function TreinoForm({ treino, onSave, onClose }: TreinoFormProps) {
  const [dadosForm, setDadosForm] = useState({
    nome: '',
    descricao: '',
    duracao: '',
    concluido: false,
    data: new Date().toISOString().split('T')[0],
  });

  const [exercicios, setExercicios] = useState<string[]>(['']);

  useEffect(() => {
    if (treino) {
      setDadosForm({
        nome: treino.nome,
        descricao: treino.descricao || '',
        duracao: treino.duracao.toString(),
        concluido: treino.concluido,
        data: treino.data,
      });

      if (treino.exercicios && treino.exercicios.length > 0) {
        const nomesExercicios = treino.exercicios.map(ex =>
          typeof ex === 'string' ? ex : ex.name
        );
        setExercicios(nomesExercicios);
      } else {
        setExercicios(['']);
      }
    }
  }, [treino]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    onSave({
      nome: dadosForm.nome,
      descricao: dadosForm.descricao,
      duracao: parseInt(dadosForm.duracao),
      exercicios: exercicios.filter((e) => e.trim() !== '').map(name => ({
        id: Date.now().toString() + Math.random(),
        name,
        sets: 0,
        reps: 0
      })),
      concluido: dadosForm.concluido,
      data: dadosForm.data,
    });
  };

  const handleChange = (campo: string, valor: string | boolean) => {
    setDadosForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const adicionarExercicio = () => {
    setExercicios([...exercicios, '']);
  };

  const removerExercicio = (indice: number) => {
    setExercicios(exercicios.filter((_, i) => i !== indice));
  };

  const handleExercicioChange = (indice: number, valor: string) => {
    const novosExercicios = [...exercicios];
    novosExercicios[indice] = valor;
    setExercicios(novosExercicios);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-zinc-900 rounded-3xl shadow-2xl shadow-orange-900/20 border border-orange-700/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-orange-700 to-orange-800 px-8 py-6 flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl">
              <Dumbbell className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {treino ? 'Editar Treino' : 'Novo Treino'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-xl transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="flex items-center gap-2 font-semibold text-gray-300 mb-3">
              <Dumbbell className="w-4 h-4 text-orange-600" />
              Nome do Treino *
            </label>
            <input
              type="text"
              required
              value={dadosForm.nome}
              onChange={(e) => handleChange('nome', e.target.value)}
              placeholder="Ex: Treino de Pernas, HIIT, Cardio..."
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all bg-zinc-800 text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-300 mb-3">
              Descrição
            </label>
            <textarea
              value={dadosForm.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              placeholder="Descreva o treino..."
              rows={3}
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all resize-none bg-zinc-800 text-white placeholder-gray-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 font-semibold text-gray-300 mb-3">
                <Clock className="w-4 h-4 text-orange-600" />
                Duração (minutos) *
              </label>
              <input
                type="number"
                required
                value={dadosForm.duracao}
                onChange={(e) => handleChange('duracao', e.target.value)}
                placeholder="30"
                min="1"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all bg-zinc-800 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-3">
                Data *
              </label>
              <input
                type="date"
                required
                value={dadosForm.data}
                onChange={(e) => handleChange('data', e.target.value)}
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all bg-zinc-800 text-white"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 font-semibold text-gray-300">
                <Activity className="w-4 h-4 text-orange-600" />
                Exercícios
              </label>
              <button
                type="button"
                onClick={adicionarExercicio}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-orange-700/20 text-orange-600 rounded-lg hover:bg-orange-700/30 font-semibold transition-all border border-orange-700/30"
              >
                <Plus className="w-4 h-4" />
                Adicionar
              </button>
            </div>

            <div className="space-y-3">
              {exercicios.map((exercicio, indice) => (
                <div key={indice} className="flex gap-3">
                  <input
                    type="text"
                    value={exercicio}
                    onChange={(e) => handleExercicioChange(indice, e.target.value)}
                    placeholder={`Exercício ${indice + 1}`}
                    className="flex-1 px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all bg-zinc-800 text-white placeholder-gray-500"
                  />
                  {exercicios.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removerExercicio(indice)}
                      className="p-4 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all border border-red-500/30"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 p-5 bg-zinc-800 rounded-xl border-2 border-orange-700/25">
            <input
              type="checkbox"
              id="concluido"
              checked={dadosForm.concluido}
              onChange={(e) => handleChange('concluido', e.target.checked)}
              className="w-6 h-6 text-orange-700 rounded-lg focus:ring-2 focus:ring-orange-700 cursor-pointer bg-zinc-700 border-orange-700/50"
            />
            <label htmlFor="concluido" className="font-semibold text-gray-300 cursor-pointer flex-1">
              Marcar treino como concluído
            </label>
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-4 bg-zinc-800 text-gray-300 rounded-xl font-semibold hover:bg-zinc-700 transition-all border border-zinc-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
            >
              {treino ? 'Atualizar Treino' : 'Criar Treino'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}