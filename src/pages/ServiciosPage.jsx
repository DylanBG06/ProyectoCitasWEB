import { useEffect, useState } from "react";
import { listarServicios } from "@/api/serviciosApi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom";


function ServiciosPage() {
    const [servicios, setServicios] = useState([])

    useEffect(() => {
        async function cargarServicios() {
            const response = await listarServicios()
            setServicios(response)
        }
        cargarServicios()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Servicios</h1>

            <div className="grid grid-cols-3 gap-4">
                {servicios.map((servicio) => (
                    <Link key={servicio.id} to={`/servicios/${servicio.id}`}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{servicio.nombre}</CardTitle>
                                <CardDescription>{servicio.descripcion}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>₡{servicio.precioBase} - {servicio.duracionMinutos} min</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mb-4">
                <Link to="/servicios/crear" className="text-blue-600 underline">Crear Servicio</Link>
            </div>
        </div>
    )
}

export default ServiciosPage