import { Home, Target, Dumbbell, Activity } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Início", icon: Home },
    { path: "/metas", label: "Metas", icon: Target },
    { path: "/treinos", label: "Treinos", icon: Dumbbell },
  ];

  return (
    <nav className="bg-zinc-900 border-b border-orange-700/20 sticky top-0 z-50 shadow-md shadow-orange-900/20">
      <div className="max-w-7xl mx-auto px-5 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur-md opacity-0 group-hover:opacity-0 transition-opacity" />

              <div className="w-20 h-20 bg-white500/90 rounded-2xl flex items-center justify-center shadow-md">
                <img
                  src="https://ik.imagekit.io/f9nzlij8o/Design%20sem%20nome%20(2).png"
                  alt="Logo"
                  className="w-20 h-20 object-contain rounded-lg"
                />
              </div>
            </div>
            <Link to="/">
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  FourFitness
                </h1>
                <p className="text-xs text-white">Sua jornada fitness</p>
              </div>
            </Link>
          </div>

          {/* Menu */}
          <div className="flex gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-200
                    ${
                      isActive
                        ? "bg-gradient-to-r from-orange-700 to-orange-800 text-white shadow-lg shadow-orange-900/20 scale-105"
                        : "text-gray-400 hover:bg-zinc-800 hover:text-orange-600 hover:scale-105"
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`}
                  />
                  <span className="hidden sm:inline font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
