import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { metasAPI } from "../../../services/api";   // <-- ajuste aqui
import { ClipLoader } from "react-spinners";
import type Meta from "../../../models/Meta";
import { showError, showSuccess } from "../../../utils/Toast";

function DeletarMeta() {
  const navigate = useNavigate();
  const [meta, setMeta] = useState<Meta>({} as Meta);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      const dados = await metasAPI.getById(id);   // <-- usa metasAPI
      setMeta(dados);
    } catch {
      alert("Erro ao buscar meta");
    }
  }

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

async function deletarMeta() {
  setIsLoading(true);

  try {
    await metasAPI.delete(id!);
    showSuccess("Meta apagada com sucesso");   // <-- toast sucesso
  } catch {
    showError("Erro ao deletar a meta.");      // <-- toast erro
  }

  setIsLoading(false);
  retornar();
}


  function retornar() {
    navigate("/metas");
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="container w-full md:w-1/3 mx-auto">
        <h1 className="text-4xl font-bold text-center my-4">Deletar Meta</h1>
        <p className="text-center text-gray-400 font-semibold mb-4">
          Você tem certeza de que deseja apagar a meta a seguir?
        </p>
        <div className="bg-zinc-900 rounded-3xl shadow-lg shadow-orange-900/10 border border-orange-700/15 flex flex-col overflow-hidden justify-between">
          <header className="py-3 px-6 bg-gradient-to-r from-orange-700 to-orange-800 text-white font-bold text-2xl">
            Meta
          </header>
          <p className="p-8 text-2xl text-gray-300 h-full">{meta.descricao}</p>
          <div className="flex">
            <button
              className="w-full text-white bg-zinc-600 hover:bg-zinc-700 py-3"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="w-full text-white bg-red-600 hover:bg-red-700 flex items-center justify-center"
              onClick={deletarMeta}
            >
              {isLoading ? (
                <ClipLoader color="#ffffff" size={24} />
              ) : (
                <span>Sim</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeletarMeta;