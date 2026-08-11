import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { crearEmpleado, obtenerEmpleadoPorId, actualizarEmpleado, registrarUsuario } from "@/api/empleadosApi"
import { listarEspecialidades } from "@/api/especialidadesApi"
import { listarServiciosActivos } from "@/api/serviciosApi"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, User, Mail, Phone, Shield, Lock, AlertCircle, Scissors, Briefcase } from "lucide-react"

function EmpleadoFormPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const esEdicion = !!id

    const [especialidades, setEspecialidades] = useState([])
    const [servicios, setServicios] = useState([])
    const [cargando, setCargando] = useState(true)
    const [guardando, setGuardando] = useState(false)
    const [errorGeneral, setErrorGeneral] = useState("")

    const [nombre, setNombre] = useState("")
    const [primerApellido, setPrimerApellido] = useState("")
    const [segundoApellido, setSegundoApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [password, setPassword] = useState("Empleado123*")
    const [codigoEmpleado, setCodigoEmpleado] = useState("")
    const [especialidadId, setEspecialidadId] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [servicioIds, setServicioIds] = useState([])

    // Cargar catálogos (especialidades y servicios activos)
    useEffect(() => {
        async function cargarCatalogos() {
            const resEspecialidades = await listarEspecialidades()
            const resServicios = await listarServiciosActivos()
            setEspecialidades(resEspecialidades)
            setServicios(resServicios)
        }
        cargarCatalogos()
    }, [])

    // Si es edición, precargar los datos del empleado
    useEffect(() => {
        if (!esEdicion) {
            setCargando(false)
            return
        }

        async function cargarEmpleado() {
            const response = await obtenerEmpleadoPorId(id)

            setNombre(response.usuario.nombre)
            setPrimerApellido(response.usuario.primerApellido)
            setSegundoApellido(response.usuario.segundoApellido || "")
            setCorreo(response.usuario.correo)
            setTelefono(response.usuario.telefono)
            setCodigoEmpleado(response.codigoEmpleado)
            setEspecialidadId(String(response.especialidadId))
            setDescripcion(response.descripcion)
            setServicioIds(response.servicios.map((s) => s.id))

            setCargando(false)
        }
        cargarEmpleado()
    }, [id, esEdicion])

    function handleServicioToggle(servicioId) {
        setServicioIds((prev) =>
            prev.includes(servicioId)
                ? prev.filter((sid) => sid !== servicioId)
                : [...prev, servicioId]
        )
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setErrorGeneral("")

        if (servicioIds.length === 0) {
            setErrorGeneral("Debes seleccionar al menos un servicio asignado.")
            return
        }

        setGuardando(true)
        try {
            if (esEdicion) {
                await actualizarEmpleado(id, {
                    especialidadId: Number(especialidadId),
                    codigoEmpleado,
                    descripcion,
                    servicioIds
                })
            } else {
                // 1. Crear el usuario primero (siempre queda con rol Cliente)
                const usuarioCreado = await registrarUsuario({
                    nombre,
                    primerApellido,
                    segundoApellido: segundoApellido || null,
                    correo,
                    telefono,
                    password
                })

                // 2. Crear el empleado asociado a ese usuario
                await crearEmpleado({
                    usuarioId: usuarioCreado.id,
                    especialidadId: Number(especialidadId),
                    codigoEmpleado,
                    descripcion,
                    servicioIds
                })
            }

            navigate("/empleados")
        } catch (error) {
            const mensaje = error.response?.data?.message
            setErrorGeneral(typeof mensaje === "string" ? mensaje : "Ocurrió un error al guardar el empleado.")
        } finally {
            setGuardando(false)
        }
    }

    if (cargando) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <p className="text-slate-500 text-sm animate-pulse">Cargando...</p>
            </div>
        )
    }

    // Solo mostrar servicios que pertenecen a la especialidad elegida
    const serviciosFiltrados = servicios.filter(
        (s) => !especialidadId || s.especialidadId === Number(especialidadId)
    )

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="border-slate-200" onClick={() => navigate("/empleados")}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Volver
                </Button>
                <h1 className="text-2xl font-bold text-slate-900">
                    {esEdicion ? "Editar Empleado" : "Nuevo Empleado"}
                </h1>
            </div>

            {errorGeneral && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{errorGeneral}</span>
                </div>
            )}

            <Card className="border-slate-200 shadow-sm">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-slate-800">
                            Información Personal y Acceso
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <User className="h-3.5 w-3.5 text-slate-400" /> Nombre *
                                </label>
                                <input
                                    type="text"
                                    required
                                    disabled={esEdicion}
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700">Primer Apellido *</label>
                                <input
                                    type="text"
                                    required
                                    disabled={esEdicion}
                                    value={primerApellido}
                                    onChange={(e) => setPrimerApellido(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700">Segundo Apellido</label>
                                <input
                                    type="text"
                                    disabled={esEdicion}
                                    value={segundoApellido}
                                    onChange={(e) => setSegundoApellido(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <Shield className="h-3.5 w-3.5 text-slate-400" /> Código Empleado
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ej: BARB-001"
                                    value={codigoEmpleado}
                                    onChange={(e) => setCodigoEmpleado(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <Mail className="h-3.5 w-3.5 text-slate-400" /> Correo Electrónico *
                                </label>
                                <input
                                    type="email"
                                    required
                                    disabled={esEdicion}
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <Phone className="h-3.5 w-3.5 text-slate-400" /> Teléfono *
                                </label>
                                <input
                                    type="tel"
                                    required
                                    disabled={esEdicion}
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-slate-50"
                                />
                            </div>
                        </div>

                        {!esEdicion && (
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                    <Lock className="h-3.5 w-3.5 text-slate-400" /> Contraseña Inicial *
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />
                            </div>
                        )}

                        <hr className="my-4 border-slate-100" />

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                <Briefcase className="h-3.5 w-3.5 text-slate-400" /> Especialidad *
                            </label>
                            <select
                                required
                                value={especialidadId}
                                onChange={(e) => {
                                    setEspecialidadId(e.target.value)
                                    setServicioIds([])
                                }}
                                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">Selecciona una especialidad</option>
                                {especialidades.map((esp) => (
                                    <option key={esp.id} value={esp.id}>
                                        {esp.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-slate-700 flex items-center gap-1">
                                <Scissors className="h-3.5 w-3.5 text-slate-400" /> Servicios Asignados *
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border border-slate-200 p-3 rounded-md max-h-40 overflow-y-auto">
                                {serviciosFiltrados.length === 0 ? (
                                    <p className="text-xs text-slate-400 col-span-2">
                                        {especialidadId ? "No hay servicios asociados a esta especialidad." : "Selecciona una especialidad primero."}
                                    </p>
                                ) : (
                                    serviciosFiltrados.map((srv) => (
                                        <label key={srv.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={servicioIds.includes(srv.id)}
                                                onChange={() => handleServicioToggle(srv.id)}
                                                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span>{srv.nombre}</span>
                                        </label>
                                    ))
                                )}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end gap-3 border-t border-slate-100 pt-4">
                        <Button type="button" variant="outline" onClick={() => navigate("/empleados")}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={guardando} className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2">
                            <Save className="h-4 w-4" />
                            {guardando ? "Guardando..." : esEdicion ? "Guardar Cambios" : "Crear Empleado"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default EmpleadoFormPage
