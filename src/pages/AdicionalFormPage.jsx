import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { actualizarAdicional, crearAdicional, obtenerAdicionalPorId } from "@/api/adicionalesApi"


function ServicioAdicionalFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const esEdicion = !!id

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")

    useEffect(() => {
        if (esEdicion) {
            async function cargarServiciosAdicionales() {
                const response = await obtenerAdicionalPorId(id)

                setNombre(response.nombre)
                setDescripcion(response.descripcion)
                setPrecio(response.precio)
            }

            cargarServiciosAdicionales()
        }
    }, [id])

    async function handleSubmit() {

        const Servicio = {
            nombre,
            descripcion,
            precio: Number(precio)
        }

        console.log(Servicio)
        
        if (esEdicion) {
            await actualizarAdicional(id, Servicio)
        } else {

            await crearAdicional(Servicio)
        }

        navigate("/servicios-adicionales")
    }

    return (
        <div className="max-w-md">
            <h1 className="text-2xl font-bold mb-4">{esEdicion ? "Editar Servicio" : "Crear Servicio"}</h1>

            <div className="flex flex-col gap-3">
                <input
                    placeholder="Nombre"
                    className="border border-gray-400 rounded px-3 py-2"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <textarea
                    placeholder="Descripción"
                    className="border border-gray-400 rounded px-3 py-2"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Precio Base"
                    className="border border-gray-400 rounded px-3 py-2"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                />

                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                    onClick={handleSubmit}
                >
                    {esEdicion ? "Guardar Cambios" : "Crear"}
                </button>
            </div>
        </div>
    )
}

export default ServicioAdicionalFormPage