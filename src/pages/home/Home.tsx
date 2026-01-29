import { useState, useEffect } from "react";
import { Target, Dumbbell, TrendingUp, Activity, Calculator, Zap, Award } from "lucide-react";
import { metasAPI, workoutsAPI } from "../../services/api";
import type Meta from "../../models/Meta";
import type { Workout } from "../../models/Workout";

export function Home() {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [treinos, setTreinos] = useState<Workout[]>([]);
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [imc, setImc] = useState<number | null>(null);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = async () => {
    try {
      const metasData = await metasAPI.listar();
      const treinosData = await workoutsAPI.getAll();
      setMetas(metasData);
      setTreinos(treinosData);

      const storedBMI = localStorage.getItem("bmi");
      if (storedBMI) {
        const bmiData = JSON.parse(storedBMI);
        setPeso(bmiData.weight?.toString() || "");
        setAltura(bmiData.height?.toString() || "");
        setImc(bmiData.bmi || null);
      }
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const calcularIMC = () => {
    const w = parseFloat(peso);
    const h = parseFloat(altura);

    if (w > 0 && h > 0) {
      const alturaEmMetros = h > 3 ? h / 100 : h;
      const bmi = w / (alturaEmMetros * alturaEmMetros);
      const bmiFormatado = Number(bmi.toFixed(2));
      setImc(bmiFormatado);

      localStorage.setItem(
        "bmi",
        JSON.stringify({
          weight: w,
          height: alturaEmMetros,
          bmi: bmiFormatado,
        })
      );
    }
  };

  // Dados adicionais vindos do GitHub
  const treinosSemana = treinos.filter((t) => {
    const date = new Date(t.data);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).length;

  const progressoMedio = metas.length;

  const metasAtivas = metas;

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5)
      return { label: "Abaixo do peso", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/30" };
    if (bmi < 25)
      return { label: "Peso normal", color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/30" };
    if (bmi < 30)
      return { label: "Sobrepeso", color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30" };
    return { label: "Obesidade", color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" };
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-700 to-orange-800 rounded-full animate-pulse" />
            <h1 className="text-4xl font-bold text-white">
              Bem-vindo ao{" "}
              <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                FourFitness
              </span>
            </h1>
          </div>
          <p className="text-lg text-gray-400">
            Sua plataforma acessível e inclusiva. Vá, treine e volte para sua vida! 🔥
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg border border-orange-700/15 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {metasAtivas.length}
              </span>
            </div>
            <h3 className="text-gray-400 font-semibold">Metas Ativas</h3>
          </div>

          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg border border-orange-700/15 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg">
                <Dumbbell className="w-7 h-7 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {treinos.length}
              </span>
            </div>
            <h3 className="text-gray-400 font-semibold">Treinos Cadastrados</h3>
          </div>

          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg border border-orange-700/15 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {treinosSemana}
              </span>
            </div>
            <h3 className="text-gray-400 font-semibold">Esta Semana</h3>
          </div>

          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg border border-orange-700/15 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                {progressoMedio}%
              </span>
            </div>
            <h3 className="text-gray-400 font-semibold">Progresso Médio</h3>
          </div>
        </div>



        {/* BMI Calculator */}
        <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg border border-orange-700/15 mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur opacity-40" />
              <div className="relative bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-4 shadow-lg">
                <Calculator className="w-8 h-8 text-white" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Calculadora de IMC</h2>
              <p className="text-gray-400">Acompanhe seu índice de massa corporal</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end mb-6">
            <div>
              <label className="block font-semibold text-gray-300 mb-3">Peso (kg)</label>
              <input
                type="number"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                placeholder="70"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 bg-zinc-800 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-3">Altura (m)</label>
              <input
                type="number"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                placeholder="1.70"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 bg-zinc-800 text-white"
              />
            </div>

            <button
              onClick={calcularIMC}
              className="group px-8 py-4 bg-gradient-to-r from-orange-700 to-orange-800 
                         text-white rounded-xl font-semibold hover:shadow-xl 
                         hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95 hover:cursor-pointer"
            >
              <span className="flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Calcular IMC
              </span>
            </button>
          </div>

          {imc !== null && (
            <div className={`p-8 rounded-2xl border-2 ${getBMICategory(imc).border} ${getBMICategory(imc).bg}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2">Seu IMC</p>
                  <p className="text-5xl font-bold text-white">{imc.toFixed(1)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-2">Categoria</p>
                  <p className={`text-2xl font-bold ${getBMICategory(imc).color}`}>
                    {getBMICategory(imc).label}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Metas Recentes */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg border border-orange-700/15">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-700/20 rounded-xl">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              Metas Recentes
            </h2>
            {metasAtivas.length > 0 ? (
              <div className="space-y-5">
                {metasAtivas.slice(0, 3).map((meta) => (
                  <div
                    key={meta.id}
                    className="group flex items-start justify-between p-5 rounded-2xl bg-zinc-800 hover:bg-zinc-800/80 transition-all border border-orange-700/10 hover:border-orange-700/25 hover:shadow-md hover:shadow-orange-900/10"
                  >
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-orange-600 transition-colors">
                        {meta.meta}
                      </h3>
                      {meta.descricao && (
                        <p className="text-sm text-gray-500 mt-1">{meta.descricao}</p>
                      )}
                    </div>
                    {meta.data_limite && (
                      <span className="text-sm font-bold text-orange-600 bg-orange-700/20 px-3 py-1 rounded-lg">
                        {new Date(meta.data_limite).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma meta ativa. Crie sua primeira meta!</p>
              </div>
            )}
          </div>

          {/* Últimos Treinos */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg border border-orange-700/15">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-700/20 rounded-xl">
                <Dumbbell className="w-6 h-6 text-orange-600" />
              </div>
              Últimos Treinos
            </h2>
            {treinos.length > 0 ? (
              <div className="space-y-4">
                {treinos.slice(0, 3).map((treino) => (
                  <div
                    key={treino.id}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-800 hover:bg-zinc-800/80 transition-all border border-orange-700/10 hover:border-orange-700/25 hover:shadow-md hover:shadow-orange-900/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-zinc-900 rounded-xl shadow-sm border border-orange-700/20">
                        <Activity className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-orange-600 transition-colors">
                          {treino.exercicio}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {treino.divisao} • {treino.nivel}
                        </p>
                        <p className="text-sm text-gray-400">
                          Duração: {treino.duracao}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-gray-500">Nenhum treino cadastrado. Adicione seu primeiro treino!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  );
}
