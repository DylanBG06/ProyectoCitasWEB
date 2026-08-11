import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { actualizarServicio, crearServicio, obtenerServicioPorId } from "@/api/serviciosApi"
import { listarEspecialidades } from "@/api/especialidadesApi"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ArrowLeft, Save, PlusCircle, Sparkles, Clock, DollarSign, Tag, FileText } from "lucide-react"

function ServicioFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const esEdicion = !!id

    const [especialidades, setEspecialidades] = useState([])
    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precioBase, setPrecioBase] = useState("")
    const [duracionMinutos, setDuracionMinutos] = useState("")
    const [especialidadId, setEspecialidadId] = useState("")
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        async function CargarDatosIniciales() {
            try {
                // 1. Cargar las especialidades primero
                const espResponse = await listarEspecialidades()
                setEspecialidades(espResponse || [])

                // 2. Cargar los datos del servicio si estamos editando
                if (esEdicion) {
                    const servicioResponse = await obtenerServicioPorId(id)

                    setNombre(servicioResponse.nombre || "")
                    setDescripcion(servicioResponse.descripcion || "")
                    setPrecioBase(servicioResponse.precioBase || "")
                    setDuracionMinutos(servicioResponse.duracionMinutos || "")

                    // Evaluar las posibles claves de retorno del backend
                    const espIdEncontrado = 
                        servicioResponse.especialidadId ?? 
                        servicioResponse.especialidad?.id ?? 
                        servicioResponse.idEspecialidad ?? 
                        ""

                    setEspecialidadId(String(espIdEncontrado))
                }
            } catch (error) {
                console.error("Error al cargar los datos en el formulario:", error)
            } finally {
                setCargando(false)
            }
        }

        CargarDatosIniciales()
    }, [id, esEdicion])

    async function handleSubmit() {
        const Servicio = {
            nombre,
            descripcion,
            precioBase: Number(precioBase),
            duracionMinutos: Number(duracionMinutos),
            especialidadId: Number(especialidadId),
            imagen: "placeholder.png"
        }

        try {
            if (esEdicion) {
                await actualizarServicio(id, Servicio)
            } else {
                await crearServicio(Servicio)
            }
            navigate("/servicios")
        } catch (error) {
            console.error("Error al guardar el servicio:", error)
        }
    }

    if (cargando) {
        return (
            <div className="max-w-2xl mx-auto text-center py-12">
                <p className="text-slate-500 text-sm animate-pulse">Cargando formulario...</p>
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <Link to="/servicios" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a servicios
                </Link>
            </Button>

            <Card className="border-slate-200 shadow-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Sparkles className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-900">
                            {esEdicion ? "Editar Servicio" : "Crear Servicio"}
                        </CardTitle>
                    </div>
                    <CardDescription className="text-slate-500 text-sm">
                        {esEdicion 
                            ? "Modifica los datos del servicio seleccionado" 
                            : "Completa la información básica para registrar un nuevo servicio en el catálogo"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="nombre" className="flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5 text-indigo-500" />
                            Nombre del Servicio
                        </Label>
                        <Input
                            id="nombre"
                            placeholder="Ej. Corte Barber House Tradicional"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="descripcion" className="flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-indigo-500" />
                            Descripción
                        </Label>
                        <Textarea
                            id="descripcion"
                            rows={3}
                            placeholder="Escribe una breve descripción del servicio..."
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="precioBase" className="flex items-center gap-1.5">
                                <DollarSign className="h-3.5 w-3.5 text-indigo-500" />
                                Precio Base (₡)
                            </Label>
                            <Input
                                id="precioBase"
                                type="number"
                                placeholder="10000"
                                value={precioBase}
                                onChange={(e) => setPrecioBase(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duracionMinutos" className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-indigo-500" />
                                Duración (Minutos)
                            </Label>
                            <Input
                                id="duracionMinutos"
                                type="number"
                                placeholder="45"
                                value={duracionMinutos}
                                onChange={(e) => setDuracionMinutos(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                            Especialidad
                        </Label>
                        <Select 
                            value={especialidadId ? String(especialidadId) : ""} 
                            onValueChange={setEspecialidadId}
                        >
                            <SelectTrigger className="bg-white">
                                <SelectValue placeholder="Selecciona una especialidad">
                                    {
                                        especialidades.find(e => 
                                            String(e.id ?? e.idEspecialidad ?? e.id_especialidad) === String(especialidadId)
                                        )?.nombre ?? 
                                        especialidades.find(e => 
                                            String(e.id ?? e.idEspecialidad ?? e.id_especialidad) === String(especialidadId)
                                        )?.nombreEspecialidad
                                    }
                                </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                                {especialidades.map((esp) => {
                                    const itemKey = esp.id ?? esp.idEspecialidad ?? esp.id_especialidad;
                                    const itemNombre = esp.nombre ?? esp.nombreEspecialidad ?? esp.descripcion;

                                    return (
                                        <SelectItem key={itemKey} value={String(itemKey)}>
                                            {itemNombre}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>

                <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end gap-3 p-4">
                    <Button 
                        variant="outline" 
                        onClick={() => navigate("/servicios")}
                        className="border-slate-300 text-slate-700"
                    >
                        Cancelar
                    </Button>
                    <Button
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-sm flex items-center gap-2"
                        onClick={handleSubmit}
                    >
                        {esEdicion ? (
                            <>
                                <Save className="h-4 w-4" />
                                Guardar Cambios
                            </>
                        ) : (
                            <>
                                <PlusCircle className="h-4 w-4" />
                                Crear
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ServicioFormPage