import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerServicioPorId } from "@/api/serviciosApi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

function ServicioDetallePage() {
    const { id } = useParams()
    const [servicio, setServicio] = useState(null)

    useEffect(() => {
        async function cargarServicio() {
            const response = await obtenerServicioPorId(id)
            setServicio(response)
        }

        cargarServicio()
    }, [id])

    if (!servicio) {
        return <p>Cargando...</p>
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{servicio.nombre}</CardTitle>
                <CardDescription>{servicio.descripcion}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Precio: ₡{servicio.precioBase}</p>
                <p>Duración: {servicio.duracionMinutos} min</p>
            </CardContent>
        </Card>
    )
}

export default ServicioDetallePage