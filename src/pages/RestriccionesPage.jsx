import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { listarRestricciones } from "@/api/restriccionesApi"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, PlusCircle } from "lucide-react"

function RestriccionesPage() {
    const [restricciones, setRestricciones] = useState([])
    const [cargando, setCargando] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        async function cargar() {
            const response = await listarRestricciones()
            setRestricciones(response)
            setCargando(false)
        }
        cargar()
    }, [])

    if (cargando) {
        return <p className="text-center py-12 text-slate-500">Cargando restricciones...</p>
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <ShieldAlert className="h-6 w-6 text-indigo-600" />
                    Restricciones de Horario
                </h1>
                <Button onClick={() => navigate("/restricciones/nueva")} className="bg-indigo-600 hover:bg-indigo-700 gap-2">
                    <PlusCircle className="h-4 w-4" />
                    Nueva Restricción
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restricciones.length === 0 ? (
                    <Card className="col-span-full">
                        <CardContent className="text-center py-8 text-slate-500 text-sm">
                            No hay restricciones registradas todavía.
                        </CardContent>
                    </Card>
                ) : (
                    restricciones.map((r) => (
                        <Link key={r.id} to={`/restricciones/${r.id}`}>
                            <Card className="hover:shadow-md transition-shadow">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-base">{r.tipoRestriccion?.nombre}</CardTitle>
                                    <Badge variant={r.activo ? "default" : "destructive"}>
                                        {r.activo ? "Activa" : "Inactiva"}
                                    </Badge>
                                </CardHeader>
                                <CardContent className="space-y-1 text-sm text-slate-600">
                                    <p>Fecha: {r.fecha.substring(0, 10)}</p>
                                    <p>
                                        {r.todoElDia ? "Todo el día" : `${r.horaInicio.substring(11, 16)} - ${r.horaFin.substring(11, 16)}`}
                                    </p>
                                    <p className="text-xs text-slate-500">{r.motivo}</p>
                                    {r.empleado && (
                                        <p className="text-xs text-indigo-600">
                                            Empleado: {r.empleado.usuario?.nombre} {r.empleado.usuario?.primerApellido}
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default RestriccionesPage
