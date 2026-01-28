import CardMeta from "../cardmeta/CardMeta";
import { useEffect, useState } from "react";
import type Meta from "../../../models/Meta";

function ListaMetas() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [metas,] = useState<Meta[]>([])

    useEffect(() => {
        buscarMetas()
    }, [metas.length])

    async function buscarMetas() {
        try {
            setIsLoading(true)
            
        } catch (error: any) {
            alert('Erro ao buscar as metas.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {isLoading && (
            <div className="flex justify-center w-full my-8">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin"
                    viewBox="0 0 24 24"
                    color="#f97316" // Orange color
                  
                />
            </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-white text-center">
                        Minhas Metas
                    </h1>
                </div>

                {(!isLoading && metas.length === 0) && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-2xl">
                        Nenhuma Meta foi encontrada!
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {metas.map((meta) => (
                        <CardMeta key={meta.id} meta={meta} />
                    ))}
                </div>
            </div>
        </div>
    )
}
export default ListaMetas;