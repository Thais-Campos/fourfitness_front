import { Link } from 'react-router-dom'
import type Meta from '../../../models/Meta'

interface CardMetaProps{
    meta: Meta
}

function CardMeta({ meta }: CardMetaProps) {
  return (
    <div className='group relative bg-zinc-900 rounded-3xl shadow-lg shadow-orange-900/10 border border-orange-700/15 hover:shadow-xl hover:shadow-orange-800/15 transition-all duration-300 flex flex-col justify-between overflow-hidden'>
      <header className='py-3 px-6 bg-gradient-to-r from-orange-700 to-orange-800 text-white font-bold text-2xl'>
        Meta
      </header>
      <p className='p-8 text-2xl text-gray-300 h-full'>{meta.descricao}</p>
      <div className="flex">
        <Link
          to= {`/editarmeta/${meta.id}`}
          className='w-full text-white bg-orange-600 hover:bg-orange-700
          flex items-center justify-center py-2'
        >
          <button>Editar</button>
        </Link>

        <Link
          to={`/deletarmeta/${meta.id}`}
          className='w-full text-white bg-red-600 hover:bg-red-700
          flex items-center justify-center py-2'
        >
          <button>Deletar</button>
        </Link>
      </div>
    </div>
  )
}

export default CardMeta