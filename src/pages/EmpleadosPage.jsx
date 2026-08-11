import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { listarEmpleados, cambiarEstadoEmpleado } from "@/api/empleadosApi"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { UserCheck, UserPlus, Edit, Mail, Phone, Scissors, Shield } from "lucide-react"

function EmpleadosPage() {
    const [empleados, setEmpleados] = useState([])
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    async function cargarEmpleados() {
        const response = await listarEmpleados()
        setEmpleados(response)
        setCargando(false)
    }

    useEffect(() => {
        cargarEmpleados()
    }, [])

    async function handleToggleEstado(id, estadoActual) {
        const accion = estadoActual ? "desactivar" : "activar"
        if (window.confirm(`¿Deseas ${accion} a este empleado?`)) {
            await cambiarEstadoEmpleado(id, !estadoActual)
            await cargarEmpleados()
        }
    }

    if (cargando) {
        return (
            <div className="max-w-5xl mx-auto text-center py-12">
                <p className="text-slate-500 text-sm animate-pulse">Cargando personal...</p>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        <UserCheck className="h-6 w-6 text-indigo-600" />
                        Personal y Barberos
                    </h1>
                    <p className="text-slate-500 text-sm">
                        Administra el equipo de trabajo y sus servicios asignados
                    </p>
                </div>
                <Button
                    onClick={() => navigate("/empleados/nuevo")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
                >
                    <UserPlus className="h-4 w-4" />
                    <span>Nuevo Empleado</span>
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {empleados.length === 0 ? (
                    <Card className="col-span-full border-slate-200">
                        <CardContent className="text-center py-12 text-slate-500 text-sm">
                            No hay empleados registrados actualmente.
                        </CardContent>
                    </Card>
                ) : (
                    empleados.map((emp) => (
                        <Card key={emp.id} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start gap-2">
                                    <CardTitle className="text-lg font-semibold text-slate-900">
                                        {emp.usuario.nombre} {emp.usuario.primerApellido}
                                    </CardTitle>
                                    <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                                        <Shield className="h-3 w-3 mr-1" />
                                        {emp.especialidad?.nombre}
                                    </Badge>
                                </div>
                                <CardDescription className="text-xs text-slate-500 space-y-1">
                                    <div className="flex items-center gap-1">
                                        <Mail className="h-3 w-3 text-slate-400" />
                                        <span>{emp.usuario.correo}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Phone className="h-3 w-3 text-slate-400" />
                                        <span>{emp.usuario.telefono}</span>
                                    </div>
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0 space-y-4">
                                {emp.servicios && emp.servicios.length > 0 && (
                                    <div className="space-y-1.5">
                                        <span className="text-xs font-medium text-slate-600 flex items-center gap-1">
                                            <Scissors className="h-3 w-3 text-indigo-500" />
                                            Servicios asignados:
                                        </span>
                                        <div className="flex flex-wrap gap-1">
                                            {emp.servicios.map((s) => (
                                                <Badge key={s.id} variant="secondary" className="text-[10px]">
                                                    {s.nombre}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs gap-1 border-slate-200 text-slate-700"
                                        onClick={() => navigate(`/empleados/${emp.id}/editar`)}
                                    >
                                        <Edit className="h-3.5 w-3.5" />
                                        Editar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={`h-8 text-xs ${emp.activo ? "text-red-600 hover:bg-red-50" : "text-emerald-600 hover:bg-emerald-50"}`}
                                        onClick={() => handleToggleEstado(emp.id, emp.activo)}
                                    >
                                        {emp.activo ? "Desactivar" : "Activar"}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    )
}

export default EmpleadosPage
