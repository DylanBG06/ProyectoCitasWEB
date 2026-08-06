import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { actualizarServicio, crearServicio, obtenerServicioPorId } from "@/api/serviciosApi"
import { listarEspecialidades } from "@/api/especialidadesApi"

function ServicioFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const esEdicion = !!id

    const [especialidades, setEspecialidades] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precioBase, setPrecioBase] = useState("")
    const [duracionMinutos, setDuracionMinutos] = useState("")
    const [especialidadId, setEspecialidadId] = useState("")

    useEffect(() => {
        async function cargarEspecialidades() {

            const response = await listarEspecialidades()
            setEspecialidades(response)
        }

        cargarEspecialidades()
    }, [])

    useEffect(() => {
        if (esEdicion) {
            async function cargarServicios() {
                const response = await obtenerServicioPorId(id)

                setNombre(response.nombre)
                setDescripcion(response.descripcion)
                setPrecioBase(response.precioBase)
                setDuracionMinutos(response.duracionMinutos)
                setEspecialidadId(response.especialidadId)
            }

            cargarServicios()
        }
    }, [id])

    async function handleSubmit() {

        const Servicio = {
            nombre,
            descripcion,
            precioBase: Number(precioBase),
            duracionMinutos: Number(duracionMinutos),
            especialidadId: Number(especialidadId),
            imagen: "placeholder.png"
        }

        if (esEdicion) {
            await actualizarServicio(id, Servicio)
        } else {

            await crearServicio(Servicio)
        }

        navigate("/servicios")
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
                    value={precioBase}
                    onChange={(e) => setPrecioBase(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Duracion en minutos"
                    className="border border-gray-400 rounded px-3 py-2"
                    value={duracionMinutos}
                    onChange={(e) => setDuracionMinutos(e.target.value)}
                />

                <select
                    className="border border-gray-400 rounded px-3 py-2"
                    value={especialidadId}
                    onChange={(e) => setEspecialidadId(e.target.value)}
                >
                    <option value="">Selecciona una especialidad</option>
                    {especialidades.map((esp) => (
                        <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                    ))}
                </select>

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

export default ServicioFormPage