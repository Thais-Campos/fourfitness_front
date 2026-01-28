import { Home, Target, Dumbbell, Activity } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const navItems = [
    { id: 'home', label: 'Início', icon: Home },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'workouts', label: 'Treinos', icon: Dumbbell },
  ];

  return (
    <nav className="bg-zinc-900 border-b border-orange-700/20 sticky top-0 z-50 shadow-md shadow-orange-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur-md opacity-40 group-hover:opacity-60 transition-opacity" />
              <div className="relative bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 transform group-hover:scale-105 transition-transform">
                <Activity className="w-7 h-7 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                FourFitness
              </h1>
              <p className="text-xs text-orange-700/70">Sua jornada fitness</p>
            </div>
          </div>

          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-orange-700 to-orange-800 text-white shadow-lg shadow-orange-900/20 scale-105'
                      : 'text-gray-400 hover:bg-zinc-800 hover:text-orange-600 hover:scale-105'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse' : ''}`} />
                  <span className="hidden sm:inline font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}