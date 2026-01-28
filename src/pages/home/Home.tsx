import { useState, useEffect } from 'react';
import { Target, Dumbbell, TrendingUp, Activity, Calculator, Zap, Award, Flame } from 'lucide-react';
import { goalsAPI, workoutsAPI, bmiAPI, type Goal, type Workout } from '../../services/api'

export default function Home() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [goalsData, workoutsData] = await Promise.all([
        goalsAPI.getAll(),
        workoutsAPI.getAll(),
      ]);
      
      setGoals(goalsData);
      setWorkouts(workoutsData);

      // Carregar dados do IMC do localStorage
      const storedBMI = localStorage.getItem('bmi');
      if (storedBMI) {
        const bmiData = JSON.parse(storedBMI);
        setWeight(bmiData.weight?.toString() || '');
        setHeight(bmiData.height?.toString() || '');
        setBmi(bmiData.bmi || null);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateBMI = async () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    
    if (w > 0 && h > 0) {
      try {
        const result = await bmiAPI.calculate(w, h);
        setBmi(result.bmi);
      } catch (error) {
        console.error('Erro ao calcular IMC:', error);
      }
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' };
    if (bmi < 25) return { label: 'Peso normal', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
    if (bmi < 30) return { label: 'Sobrepeso', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    return { label: 'Obesidade', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
  };

  const activeGoals = goals.filter(g => g.current < g.target);
  const completedWorkouts = workouts.filter(w => w.completed).length;
  const weekWorkouts = workouts.filter(w => {
    const date = new Date(w.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return date >= weekAgo;
  }).length;

  const totalProgress = goals.length > 0
    ? Math.round(goals.reduce((acc, g) => acc + (g.current / g.target) * 100, 0) / goals.length)
    : 0;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-12 bg-gradient-to-r from-orange-700 to-orange-800 rounded-full animate-pulse" />
            <h1 className="text-4xl font-bold text-white">
              Bem-vindo ao <span className="bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">FourFitness</span>
            </h1>
          </div>
          <p className="text-lg text-gray-400 ml-15">
            Sua plataforma acessível e inclusiva. Vá, treine, e volte para sua vida! 🔥
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Active Goals Card */}
          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg shadow-orange-900/10 border border-orange-700/15 hover:shadow-xl hover:shadow-orange-800/15 transition-all duration-300 hover:-translate-y-1 hover:border-orange-700/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-700/15 to-orange-800/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg shadow-orange-900/40">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {activeGoals.length}
                </span>
              </div>
              <h3 className="text-gray-400 font-semibold">Metas Ativas</h3>
            </div>
          </div>

          {/* Completed Workouts Card */}
          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg shadow-orange-900/10 border border-orange-700/15 hover:shadow-xl hover:shadow-orange-800/15 transition-all duration-300 hover:-translate-y-1 hover:border-orange-700/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-700/15 to-orange-800/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg shadow-orange-900/40">
                  <Dumbbell className="w-7 h-7 text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {completedWorkouts}
                </span>
              </div>
              <h3 className="text-gray-400 font-semibold">Treinos Completos</h3>
            </div>
          </div>

          {/* Week Workouts Card */}
          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg shadow-orange-900/10 border border-orange-700/15 hover:shadow-xl hover:shadow-orange-800/15 transition-all duration-300 hover:-translate-y-1 hover:border-orange-700/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-700/15 to-orange-800/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg shadow-orange-900/40">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {weekWorkouts}
                </span>
              </div>
              <h3 className="text-gray-400 font-semibold">Esta Semana</h3>
            </div>
          </div>

          {/* Total Progress Card */}
          <div className="group relative bg-zinc-900 rounded-3xl p-6 shadow-lg shadow-orange-900/10 border border-orange-700/15 hover:shadow-xl hover:shadow-orange-800/15 transition-all duration-300 hover:-translate-y-1 hover:border-orange-700/30">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-700/15 to-orange-800/15 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 shadow-lg shadow-orange-900/40">
                  <TrendingUp className="w-7 h-7 text-white" />
                </div>
                <span className="text-4xl font-bold bg-gradient-to-br from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  {totalProgress}%
                </span>
              </div>
              <h3 className="text-gray-400 font-semibold">Progresso Médio</h3>
            </div>
          </div>
        </div>

        {/* BMI Calculator */}
        <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg shadow-orange-900/10 border border-orange-700/15 mb-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur opacity-40" />
              <div className="relative bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-4 shadow-lg shadow-orange-900/40">
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
              <label className="block font-semibold text-gray-300 mb-3">
                Peso (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="70"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all bg-zinc-800 text-white placeholder-gray-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-300 mb-3">
                Altura (cm)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="170"
                className="w-full px-5 py-4 rounded-xl border-2 border-orange-700/25 focus:ring-2 focus:ring-orange-700 focus:border-orange-700 outline-none transition-all bg-zinc-800 text-white placeholder-gray-500"
              />
            </div>

            <button
              onClick={calculateBMI}
              className="group px-8 py-4 bg-gradient-to-r from-orange-700 to-orange-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-orange-900/30 transition-all hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Calcular IMC
              </span>
            </button>
          </div>

          {bmi !== null && (
            <div className={`p-8 rounded-2xl border-2 ${getBMICategory(bmi).border} ${getBMICategory(bmi).bg} transition-all`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-2 font-medium">Seu IMC</p>
                  <p className="text-5xl font-bold text-white">{bmi.toFixed(1)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-2 font-medium">Categoria</p>
                  <p className={`text-2xl font-bold ${getBMICategory(bmi).color}`}>
                    {getBMICategory(bmi).label}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Goals */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg shadow-orange-900/10 border border-orange-700/15">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-700/20 rounded-xl">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              Metas Recentes
            </h2>
            {activeGoals.length > 0 ? (
              <div className="space-y-5">
                {activeGoals.slice(0, 3).map((goal) => {
                  const progress = Math.min((goal.current / goal.target) * 100, 100);
                  return (
                    <div key={goal.id} className="group">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-orange-600 transition-colors">
                            {goal.title}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {goal.current} de {goal.target} {goal.unit}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-orange-600 bg-orange-700/20 px-3 py-1 rounded-lg">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="relative h-3 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-700 to-orange-800 rounded-full transition-all duration-500 shadow-lg shadow-orange-900/40"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-gray-500">
                  Nenhuma meta ativa. Crie sua primeira meta!
                </p>
              </div>
            )}
          </div>

          {/* Recent Workouts */}
          <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg shadow-orange-900/10 border border-orange-700/15">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <div className="p-2 bg-orange-700/20 rounded-xl">
                <Dumbbell className="w-6 h-6 text-orange-600" />
              </div>
              Últimos Treinos
            </h2>
            {workouts.length > 0 ? (
              <div className="space-y-4">
                {workouts.slice(0, 3).map((workout) => (
                  <div
                    key={workout.id}
                    className="group flex items-center justify-between p-5 rounded-2xl bg-zinc-800 hover:bg-zinc-800/80 transition-all border border-orange-700/10 hover:border-orange-700/25 hover:shadow-md hover:shadow-orange-900/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-zinc-900 rounded-xl shadow-sm border border-orange-700/20">
                        <Activity className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white group-hover:text-orange-600 transition-colors">
                          {workout.name}
                        </h3>
                        <p className="text-sm text-gray-400">{workout.duration} minutos</p>
                      </div>
                    </div>
                    {workout.completed && (
                      <span className="flex items-center gap-1 text-green-400 font-semibold text-sm bg-green-500/20 px-3 py-1.5 rounded-lg border border-green-500/30">
                        <Award className="w-4 h-4" />
                        Completo
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Dumbbell className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
                <p className="text-gray-500">
                  Nenhum treino cadastrado. Adicione seu primeiro treino!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}