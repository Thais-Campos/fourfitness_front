import { useNavigate, useParams } from 'react-router-dom'
import { buscar, cadastrar, atualizar } from '../../../services/Services'
import type Meta from '../../../models/Meta'
import { ClipLoader } from 'react-spinners'
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'

function FormMeta() {

    const navigate = useNavigate()
    const { id } = useParams<{ id: string }>()

    const [meta, setMeta] = useState<Meta>({
        id: 0,
        objetivo: '',
        descricao: '',
        peso: 0,
        altura: 0,
        validade: new Date(),
        treino: null
    } as Meta)

    const [isLoading, setIsLoading] = useState(false)

    async function buscarPorId(id: string) {
        try {
            await buscar(`/metas/${id}`, setMeta)
        } catch {
            alert('Erro ao buscar a meta')
        }
    }

    useEffect(() => {
        if (id !== undefined) buscarPorId(id)
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target

        setMeta({
            ...meta,
            [name]:
                name === 'peso' || name === 'altura'
                    ? Number(value)
                    : name === 'validade'
                        ? new Date(value)
                        : value
        })
    }

    function calcularIMC(peso: number, altura: number) {
        const imc = peso / (altura * altura)
        let classificacao = ''

        if (imc < 18.5) classificacao = 'Abaixo do peso'
        else if (imc < 25) classificacao = 'Peso normal'
        else if (imc < 30) classificacao = 'Sobrepeso'
        else if (imc < 35) classificacao = 'Obesidade Grau I'
        else if (imc < 40) classificacao = 'Obesidade Grau II'
        else classificacao = 'Obesidade Grau III'

        return { imc: Number(imc.toFixed(2)), classificacao }
    }

    async function gerarNovaMeta(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        const { imc, classificacao } = calcularIMC(meta.peso, meta.altura)

        const metaFinal: Meta = {
            ...meta,
            imc,
            classificacao
        }

        try {
            if (id !== undefined) {
                await atualizar('/metas', metaFinal, setMeta)
                alert('Meta atualizada com sucesso!')
            } else {
                await cadastrar('/metas', metaFinal, setMeta)
                alert('Meta cadastrada com sucesso!')
            }

            navigate('/metas')
        } catch {
            alert('Erro ao salvar a meta')
        }

        setIsLoading(false)
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto">
            <h1 className="text-4xl my-8">
                {id ? 'Editar Meta' : 'Cadastrar Meta'}
            </h1>

            <form className="w-1/2 flex flex-col gap-4" onSubmit={gerarNovaMeta}>

                <input
                    type="text"
                    name="objetivo"
                    placeholder="Objetivo da meta"
                    className="border-2 border-slate-700 rounded p-2"
                    value={meta.objetivo}
                    onChange={atualizarEstado}
                    required
                />

                <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição"
                    className="border-2 border-slate-700 rounded p-2"
                    value={meta.descricao}
                    onChange={atualizarEstado}
                    required
                />

                <input
                    type="number"
                    name="peso"
                    placeholder="Peso (kg)"
                    className="border-2 border-slate-700 rounded p-2"
                    value={meta.peso}
                    onChange={atualizarEstado}
                    required
                />

                <input
                    type="number"
                    step="0.01"
                    name="altura"
                    placeholder="Altura (m)"
                    className="border-2 border-slate-700 rounded p-2"
                    value={meta.altura}
                    onChange={atualizarEstado}
                    required
                />

                <input
                    type="date"
                    name="validade"
                    className="border-2 border-slate-700 rounded p-2"
                    value={meta.validade.toISOString().split('T')[0]}
                    onChange={atualizarEstado}
                    required
                />

                {meta.imc && (
                    <div className="text-center font-semibold">
                        IMC: {meta.imc} — {meta.classificacao}
                    </div>
                )}

                <button
                    type="submit"
                    className="rounded bg-indigo-400 hover:bg-indigo-800 text-white py-2"
                >
                    {isLoading
                        ? <ClipLoader color="#fff" size={24} />
                        : 'Salvar'}
                </button>

            </form>
        </div>
    )
}

export default FormMeta