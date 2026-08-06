import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Link } from "react-router-dom";
import { cambiarEstadoAdicional } from "@/api/adicionalesApi";
import { obtenerAdicionalPorId } from "@/api/adicionalesApi";


function ServicioAdicionalDetallePage() {
    const { id } = useParams()
    const [servicio, setServicio] = useState(null)

    useEffect(() => {
        async function cargarServicioAdicional() {
            const response = await obtenerAdicionalPorId(id)
            setServicio(response)
        }

        cargarServicioAdicional()
    }, [id])

    async function handleCambiarEstado() {
        const response = await cambiarEstadoAdicional(id, !servicio.activo)
        setServicio(response)
    }

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
                <p>Precio: ₡{servicio.precio}</p>
                <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${servicio.activo
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                    {servicio.activo ? "Activo" : "Inactivo"}
                </span>
            </CardContent>
            <Link to={`/servicios-adicionales/${servicio.id}/editar`}>Editar</Link>
            <button onClick={handleCambiarEstado}>
                {servicio.activo ? "Desactivar" : "Activar"}
            </button>
        </Card>
    )
}

export default ServicioAdicionalDetallePage