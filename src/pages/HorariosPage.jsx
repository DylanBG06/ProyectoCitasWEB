import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { listarHorarios, cambiarEstadoHorario } from "@/api/horariosApi"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, PlusCircle } from "lucide-react"

function HorariosPage() {
    const [horarios, setHorarios] = useState([])
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    async function cargarHorarios() {
        const response = await listarHorarios()
        setHorarios(response)
        setCargando(false)
    }

    useEffect(() => {
        cargarHorarios()
    }, [])

    async function handleToggleEstado(id, estadoActual) {
        await cambiarEstadoHorario(id, !estadoActual)
        await cargarHorarios()
    }

    if (cargando) {
        return <p className="text-center py-12 text-slate-500">Cargando horarios...</p>
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Clock className="h-6 w-6 text-indigo-600" />
                    Horarios de Atención
                </h1>
                <Button onClick={() => navigate("/horarios/nuevo")} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Nuevo Horario
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {horarios.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="text-center py-8 text-slate-500 text-sm">
                            No hay horarios registrados todavía.
                        </CardContent>
                    </Card>
                ) : (
                    horarios.map((h) => (
                        <Card key={h.id}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-base">{h.diaSemana?.nombre}</CardTitle>
                                <Badge variant={h.activo ? "default" : "destructive"}>
                                    {h.activo ? "Activo" : "Inactivo"}
                                </Badge>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <p className="text-sm text-slate-600">
                                    {h.horaInicio} - {h.horaFin}
                                </p>
                                <div className="flex gap-2">
                                    <Button asChild variant="outline" size="sm">
                                        <Link to={`/horarios/${h.id}/editar`}>Editar</Link>
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className={h.activo ? "text-red-600" : "text-emerald-600"}
                                        onClick={() => handleToggleEstado(h.id, h.activo)}
                                    >
                                        {h.activo ? "Desactivar" : "Activar"}
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

export default HorariosPage
