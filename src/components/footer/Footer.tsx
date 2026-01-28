import { Activity, Mail, Phone, Instagram, Github, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
  <footer className="border-t border-orange-700/20 bg-zinc-900 shadow-md shadow-orange-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-10 md:grid-cols-3">
          { }
          <div>
            <div className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl blur-md opacity-35 group-hover:opacity-55 transition-opacity" />
                <div className="relative bg-gradient-to-br from-orange-700 to-orange-800 rounded-2xl p-3 transform group-hover:scale-105 transition-transform">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
                  FourFitness
                </h2>
                <p className="text-xs text-orange-700/70">Sua jornada fitness</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              Plataforma acessível e inclusiva para acompanhar metas, treinos e evolução.
              Vá, treine e volte para sua vida! 🔥
            </p>
          </div>

          { }
          <div className="md:justify-self-center">
            <h3 className="text-white font-semibold mb-4">Ajuda</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                >
                  Central de Ajuda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                >
                  Termos de Uso
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-orange-600 transition-colors"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>

          { }
          <div className="md:justify-self-end">
            <h3 className="text-white font-semibold mb-4">Contato</h3>

            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="w-4 h-4 text-orange-600" />
                <span>(11) 4004-1234</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="w-4 h-4 text-orange-600" />
                <span>contato@fourfitness.com</span>
              </li>
            </ul>

            <div className="flex gap-3 mt-5">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 border border-orange-700/15 hover:border-orange-700/30 hover:bg-zinc-800/80 flex items-center justify-center transition-all hover:scale-105"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-gray-300 hover:text-orange-600 transition-colors" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 border border-orange-700/15 hover:border-orange-700/30 hover:bg-zinc-800/80 flex items-center justify-center transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5 text-gray-300 hover:text-orange-600 transition-colors" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-zinc-800 border border-orange-700/15 hover:border-orange-700/30 hover:bg-zinc-800/80 flex items-center justify-center transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-gray-300 hover:text-orange-600 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        { }
        <div className="mt-10 pt-6 border-t border-orange-700/15 text-center text-sm text-gray-500">
          <p>© {year} FourFitness. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
