import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { obtenerRestriccionPorId } from "@/api/restriccionesApi"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

function RestriccionDetallePage() {
    const { id } = useParams()
    const [restriccion, setRestriccion] = useState(null)

    useEffect(() => {
        async function cargar() {
            const response = await obtenerRestriccionPorId(id)
            setRestriccion(response)
        }
        cargar()
    }, [id])

    if (!restriccion) {
        return <p className="text-center py-12 text-slate-500">Cargando...</p>
    }

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>{restriccion.tipoRestriccion?.nombre}</CardTitle>
                    <Badge variant={restriccion.activo ? "default" : "destructive"}>
                        {restriccion.activo ? "Activa" : "Inactiva"}
                    </Badge>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-slate-700">
                    <p><strong>Fecha:</strong> {restriccion.fecha}</p>
                    <p>
                        <strong>Horario:</strong>{" "}
                        {restriccion.todoElDia ? "Todo el día" : `${restriccion.horaInicio} - ${restriccion.horaFin}`}
                    </p>
                    <p><strong>Motivo:</strong> {restriccion.motivo}</p>
                    {restriccion.empleado && (
                        <p>
                            <strong>Empleado:</strong> {restriccion.empleado.usuario?.nombre} {restriccion.empleado.usuario?.primerApellido}
                        </p>
                    )}
                    {!restriccion.empleado && (
                        <p className="text-slate-500 italic">Aplica a todo el establecimiento</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}

export default RestriccionDetallePage
