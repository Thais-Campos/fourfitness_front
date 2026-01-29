import { useState, useEffect } from "react";
import { X, Target, Calendar } from "lucide-react";
import type Meta from "../../../models/Meta";

interface FormMetaProps {
  meta: Meta | null;
  onSave: (meta: Meta) => void;
  onClose: () => void;
}

export function FormMeta({ meta, onSave, onClose }: FormMetaProps) {
  const [formData, setFormData] = useState({
    meta: "",
    data_limite: "",
  });

  useEffect(() => {
    if (meta) {
      setFormData({
        meta: meta.meta,
        data_limite: meta.data_limite || "",
      });
    }
  }, [meta]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const metaFinal: Meta = {
      id: meta?.id ?? 0,
      meta: formData.meta,
      data_limite: formData.data_limite,
      treino: null,
    };

    onSave(metaFinal);
  };


  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-3xl shadow-2xl border border-orange-700/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-8 py-6 border-b border-orange-700/25">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-white" />
            <h2 className="text-2xl font-bold text-white">
              {meta ? "Editar Meta" : "Nova Meta"}
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
          <div>
            <label className="block font-semibold text-gray-300 mb-3">
              meta *
            </label>
            <input
              type="text"
              required
              value={formData.meta}
              onChange={(e) => handleChange("meta", e.target.value)}
              placeholder="Ex: Perder peso, Ganhar massa..."
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 bg-zinc-800 text-white"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-300 mb-3">
              <Calendar className="w-4 h-4 text-orange-600 inline mr-2" />
              Prazo
            </label>
            <input
              type="date"
              value={formData.data_limite}
              onChange={(e) => handleChange("data_limite", e.target.value)}
              className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 bg-zinc-800 text-white"
            />
          </div>

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
              {meta ? "Atualizar Meta" : "Criar Meta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}