import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { listarServicios } from "@/api/serviciosApi"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, Plus, Sparkles, Image as ImageIcon, Search, Pencil, ExternalLink } from "lucide-react"
import { useAuth } from "@/context/AuthContext"

function ServiciosPage() {
    const [servicios, setServicios] = useState([])
    const [busqueda, setBusqueda] = useState("")
    const [cargando, setCargando] = useState(true)
    const { usuario } = useAuth()
    const esAdmin = usuario?.rol?.nombre === "Administrador"

    useEffect(() => {
        async function cargarServicios() {
            try {
                const response = await listarServicios()
                setServicios(response)
            } catch (error) {
                console.error("Error al cargar servicios:", error)
            } finally {
                setCargando(false)
            }
        }
        cargarServicios()
    }, [])

    const serviciosFiltrados = servicios.filter((servicio) =>
        servicio.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
        servicio.descripcion?.toLowerCase().includes(busqueda.toLowerCase())
    )

    const formatearMoneda = (monto) => {
        return new Intl.NumberFormat("es-CR", {
            style: "currency",
            currency: "CRC",
            maximumFractionDigits: 0
        }).format(monto || 0)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                        <Sparkles className="h-6 w-6 text-indigo-600" />
                        Servicios
                    </h1>
                    <p className="text-sm text-slate-500">
                        Catálogo de servicios disponibles en el sistema
                    </p>
                </div>

                {esAdmin && <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm">
                    <Link to="/servicios/crear" className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Crear Servicio
                    </Link>
                </Button>
                }
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                    placeholder="Buscar por nombre o descripción..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="pl-9 bg-white"
                />
            </div>

            {cargando ? (
                <div className="text-center py-12">
                    <p className="text-slate-500 text-sm animate-pulse">Cargando servicios...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {serviciosFiltrados.map((servicio) => (
                        <Card key={servicio.id} className="h-full border-slate-200 overflow-hidden hover:border-indigo-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
                            <div>
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
                                            variant={servicio.activo !== false ? "default" : "destructive"}
                                            className={servicio.activo !== false ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                                        >
                                            {servicio.activo !== false ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </div>
                                </div>

                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg font-bold text-slate-900 flex items-center justify-between gap-2">
                                        <span className="truncate">{servicio.nombre}</span>
                                    </CardTitle>
                                    <CardDescription className="line-clamp-2 text-slate-500 text-xs leading-relaxed">
                                        {servicio.descripcion || "Sin descripción disponible."}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="pt-0">
                                    <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                        <span className="text-lg font-extrabold text-slate-900">
                                            {formatearMoneda(servicio.precioBase)}
                                        </span>
                                        <div className="flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                                            <Clock className="h-3.5 w-3.5 text-indigo-500" />
                                            <span>{servicio.duracionMinutos} min</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </div>

                            <CardFooter className="bg-slate-50 border-t border-slate-100 p-3 flex justify-between items-center gap-2">
                                <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-indigo-600">
                                    <Link to={`/servicios/${servicio.id}`} className="flex items-center gap-1 text-xs">
                                        <ExternalLink className="h-3.5 w-3.5" />
                                        Ver Detalle
                                    </Link>
                                </Button>

                                {esAdmin && <Button asChild variant="outline" size="sm" className="border-slate-200">
                                    <Link to={`/servicios/${servicio.id}/editar`} className="flex items-center gap-1 text-xs text-slate-600">
                                        <Pencil className="h-3.5 w-3.5" />
                                        Editar
                                    </Link>
                                </Button>
                                }
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {!cargando && serviciosFiltrados.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-dashed border-slate-300 space-y-2">
                    <p className="text-slate-600 font-medium text-sm">No se encontraron servicios.</p>
                </div>
            )}
        </div>
    )
}

export default ServiciosPage