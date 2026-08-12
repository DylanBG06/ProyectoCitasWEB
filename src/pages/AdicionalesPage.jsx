import { useEffect, useState } from "react";
import { listarAdicionales } from "@/api/adicionalesApi";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlusCircle, Plus, Image as ImageIcon, ExternalLink } from "lucide-react"
import { useAuth } from "@/context/AuthContext";

function ServiciosAdicionalesPage() {
    const [serviciosAdicionales, setServiciosAdicionales] = useState([])
    const { usuario } = useAuth()
    const esAdmin = usuario?.rol?.nombre === "Administrador"

    useEffect(() => {
        async function cargarServicios() {
            const response = await listarAdicionales()
            setServiciosAdicionales(response)
        }
        cargarServicios()
    }, [])

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <PlusCircle className="h-6 w-6 text-indigo-600" />
                        Servicios Adicionales
                    </h1>
                    <p className="text-sm text-slate-500">
                        Complementos y extras disponibles para los servicios principales
                    </p>
                </div>

                <div>
                    {esAdmin && <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm">
                        <Link to="/servicios-adicionales/crear" className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Crear Servicio adicional
                        </Link>
                    </Button>
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {serviciosAdicionales.map((servicio) => (
                    <Card key={servicio.id} className="h-full border-slate-200 overflow-hidden hover:border-indigo-400 hover:shadow-md transition-all duration-200 flex flex-col justify-between">

                        <div className="relative w-full h-40 bg-slate-100 overflow-hidden border-b border-slate-100 flex items-center justify-center">
                            {servicio.imagenUrl || servicio.imagen ? (
                                <img
                                    src={servicio.imagenUrl || servicio.imagen}
                                    alt={servicio.nombre}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-1 text-slate-400">
                                    <ImageIcon className="h-8 w-8" />
                                    <span className="text-xs">Sin imagen</span>
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                <Badge
                                    variant={servicio.activo ? "default" : "destructive"}
                                    className={servicio.activo ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                >
                                    {servicio.activo ? "Activo" : "Inactivo"}
                                </Badge>
                            </div>
                        </div>

                        <CardHeader className="pb-3">
                            <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {servicio.nombre}
                            </CardTitle>
                            <CardDescription className="line-clamp-2 text-slate-500 text-xs leading-relaxed">
                                {servicio.descripcion}
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Precio</span>
                                <span className="text-lg font-extrabold text-slate-900">
                                    ₡{servicio.precio}
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-slate-50 border-t border-slate-100 p-3 flex justify-between items-center gap-2">
                            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-indigo-600">
                                <Link to={`/servicios-adicionales/${servicio.id}`} className="flex items-center gap-1 text-xs">
                                <ExternalLink className="h-3.5 w-3.5" />
                                Ver Detalle</Link>
                            </Button>

                            {esAdmin && (
                                <Button asChild variant="outline" size="sm">
                                    <Link to={`/servicios-adicionales/${servicio.id}/editar`}>Editar</Link>
                                </Button>
                            )}
                        </CardFooter>
                        

                    </Card>
                ))}
            </div>

            {serviciosAdicionales.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300">
                    <p className="text-slate-500 text-sm">No se encontraron servicios adicionales registrados.</p>
                </div>
            )}
        </div>
    )
}

export default ServiciosAdicionalesPage