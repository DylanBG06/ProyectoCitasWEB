import { useEffect, useState } from "react";
import { listarAdicionales } from "@/api/adicionalesApi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"

function ServiciosAdicionalesPage() {
    const [serviciosAdicionales, setServiciosAdicionales] = useState([])

    useEffect(() => {
        async function cargarServicios() {
            const response = await listarAdicionales()
            setServiciosAdicionales(response)
        }
        cargarServicios()
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Servicios Adicionales</h1>

            <div className="grid grid-cols-3 gap-4">
                {serviciosAdicionales.map((servicio) => (
                    <Link key={servicio.id} to={`/servicios-adicionales/${servicio.id}`}>
                        <Card>
                            <CardHeader>
                                <CardTitle>{servicio.nombre}</CardTitle>
                                <CardDescription>{servicio.descripcion}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>₡{servicio.precio}</p>
                                <Badge variant={servicio.activo ? "default" : "destructive"}>
                                    {servicio.activo ? "Activo" : "Inactivo"}
                                </Badge>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            <div className="mb-4">
                <Link to="/servicios-adicionales/crear" className="text-blue-600 underline">Crear Servicio adicional</Link>
            </div>
        </div>
    )
}

export default ServiciosAdicionalesPage