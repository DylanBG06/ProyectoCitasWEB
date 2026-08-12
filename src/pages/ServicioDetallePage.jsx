import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { obtenerServicioPorId, cambiarEstadoServicio } from "@/api/serviciosApi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Clock, Edit, Power, ArrowLeft, Image as ImageIcon, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

function ServicioDetallePage() {
    const { id } = useParams()
    const [servicio, setServicio] = useState(null)
    const { usuario } = useAuth()
    const esAdmin = usuario?.rol?.nombre === "Administrador"

    useEffect(() => {
        async function cargarServicio() {
            const response = await obtenerServicioPorId(id)
            setServicio(response)
        }

        cargarServicio()
    }, [id])

    async function handleCambiarEstado() {
        const response = await cambiarEstadoServicio(id, !servicio.activo)
        setServicio(response)
    }

    if (!servicio) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-2 text-slate-500">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <p className="text-sm font-medium">Cargando...</p>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto space-y-4">
            {/* Botón para regresar al catálogo */}
            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <Link to="/servicios" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a servicios
                </Link>
            </Button>

            <Card className="border-slate-200 shadow-md overflow-hidden">
                {/* Visualización de la imagen del servicio */}
                <div className="relative w-full h-56 bg-slate-100 border-b border-slate-200 flex items-center justify-center">
                    {servicio.imagenUrl || servicio.imagen ? (
                        <img
                            src={servicio.imagenUrl || servicio.imagen}
                            alt={servicio.nombre}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                            <ImageIcon className="h-10 w-10" />
                            <span className="text-xs">Sin imagen asignada</span>
                        </div>
                    )}
                    <div className="absolute top-4 right-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${servicio.activo
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-rose-100 text-rose-800 border border-rose-200"
                            }`}>
                            {servicio.activo ? "Activo" : "Inactivo"}
                        </span>
                    </div>
                </div>

                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-slate-900">{servicio.nombre}</CardTitle>
                    <CardDescription className="text-slate-600 text-sm leading-relaxed">{servicio.descripcion}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Precio Base</span>
                            <span className="text-xl font-extrabold text-slate-900">₡{servicio.precioBase}</span>
                        </div>
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Duración Estimada</span>
                            <div className="flex items-center gap-1.5 text-slate-900 font-bold mt-0.5">
                                <Clock className="h-4 w-4 text-indigo-600" />
                                <span>{servicio.duracionMinutos} min</span>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="bg-slate-50 border-t border-slate-100 flex items-center justify-between p-4">
                    {esAdmin && <Button asChild variant="outline" className="border-slate-300">
                        <Link to={`/servicios/${servicio.id}/editar`} className="flex items-center gap-2">
                            <Edit className="h-4 w-4 text-slate-600" />
                            Editar
                        </Link>
                    </Button>
                    }


                    {esAdmin && <Button
                        onClick={handleCambiarEstado}
                        variant={servicio.activo ? "destructive" : "default"}
                        className={!servicio.activo ? "bg-emerald-600 hover:bg-emerald-500" : ""}
                    >
                        <Power className="h-4 w-4 mr-2" />
                        {servicio.activo ? "Desactivar" : "Activar"}
                    </Button>
                    }
                </CardFooter>
            </Card>
        </div>
    )
}

export default ServicioDetallePage