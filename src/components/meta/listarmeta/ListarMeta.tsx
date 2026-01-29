import { useState, useEffect } from "react";
import { Target, Plus, Edit2, Trash2, Calendar, Loader } from "lucide-react";
import { metasAPI } from "../../../services/api";
import type Meta from "../../../models/Meta";
import { FormMeta } from "../formmeta/FormMeta";

export default function ListaMetas() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [metaEmEdicao, setMetaEmEdicao] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarMetas();
  }, []);

  const carregarMetas = async () => {
    try {
      setLoading(true);
      const dados = await metasAPI.listar();
      setMetas(dados);
    } catch (error) {
      console.error("Erro ao carregar metas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (meta: Meta) => {
    try {
      if (meta.id && meta.id !== 0) {
        await metasAPI.update(meta); // 🔥 id vai no body
      } else {
        await metasAPI.create(meta);
      }

      await carregarMetas();
      setShowForm(false);
      setMetaEmEdicao(null);
    } catch (error) {
      console.error("Erro ao salvar meta:", error);
    }
  };

  const excluirMeta = async (id: string) => {
    if (confirm("Tem certeza que deseja excluir esta meta?")) {
      try {
        await metasAPI.delete(id);
        await carregarMetas();
      } catch (error) {
        console.error("Erro ao deletar meta:", error);
      }
    }
  };

  const editarMeta = (meta: Meta) => {
    setMetaEmEdicao(meta);
    setShowForm(true);
  };

  const fecharForm = () => {
    setShowForm(false);
    setMetaEmEdicao(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-medium">Carregando metas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur opacity-40" />
                <div className="relative bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg shadow-orange-900/40">
                  <Target className="w-8 h-8 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">Minhas Metas</h1>
                <p className="text-gray-400 mt-1">
                  Registre suas metas e acompanhe seu progresso
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            Nova Meta
          </button>
        </div>

        {metas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {metas.map((meta) => (
              <div
                key={meta.id}
                className="group bg-zinc-900 rounded-3xl p-7 shadow-lg shadow-orange-900/10 border border-orange-700/15 hover:shadow-xl hover:shadow-orange-800/15 transition-all duration-300 hover:-translate-y-1 hover:border-orange-700/30"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-600 transition-colors">
                      {meta.meta}
                    </h3>
                  </div>
                </div>

                {meta.data_limite && (
                  <div className="mb-5 p-4 bg-zinc-800 rounded-xl border border-orange-700/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <p className="text-xs font-semibold text-gray-400">Prazo</p>
                    </div>
                    <p className="text-sm font-bold text-white">
                      {new Date(meta.data_limite).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    onClick={() => editarMeta(meta)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-orange-700/20 text-orange-600 rounded-xl hover:bg-orange-700/30 transition-all font-medium border border-orange-700/30"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => excluirMeta(meta.id.toString())}
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
                <Target className="relative w-20 h-20 text-zinc-700 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Nenhuma meta cadastrada
              </h3>
              <p className="text-gray-400 mb-8">
                Comece sua jornada criando sua primeira meta e acompanhe seu progresso!
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Criar Primeira Meta
              </button>
            </div>
          </div>
        )}

        {showForm && (
          <FormMeta
            meta={metaEmEdicao}
            onSave={handleSave}
            onClose={fecharForm}
          />
        )}
      </div>
    </div>
  );
}
