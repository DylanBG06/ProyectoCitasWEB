import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { actualizarAdicional, crearAdicional, obtenerAdicionalPorId } from "@/api/adicionalesApi"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, PlusCircle, Tag, FileText, DollarSign, PlusSquare } from "lucide-react"

function ServicioAdicionalFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const esEdicion = !!id

    const [nombre, setNombre] = useState("")
    const [descripcion, setDescripcion] = useState("")
    const [precio, setPrecio] = useState("")

    useEffect(() => {
        if (esEdicion) {
            async function cargarServiciosAdicionales() {
                const response = await obtenerAdicionalPorId(id)

                setNombre(response.nombre)
                setDescripcion(response.descripcion)
                setPrecio(response.precio)
            }

            cargarServiciosAdicionales()
        }
    }, [id])

    async function handleSubmit() {
        const Servicio = {
            nombre,
            descripcion,
            precio: Number(precio)
        }

        console.log(Servicio)
        
        if (esEdicion) {
            await actualizarAdicional(id, Servicio)
        } else {
            await crearAdicional(Servicio)
        }

        navigate("/servicios-adicionales")
    }

    return (
        <div className="max-w-2xl mx-auto space-y-4">
            {/* Botón para regresar al listado */}
            <Button asChild variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <Link to="/servicios-adicionales" className="flex items-center gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Volver a servicios adicionales
                </Link>
            </Button>

            <Card className="border-slate-200 shadow-md">
                <CardHeader className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <PlusSquare className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-slate-900">
                            {esEdicion ? "Editar Servicio Adicional" : "Crear Servicio Adicional"}
                        </CardTitle>
                    </div>
                    <CardDescription className="text-slate-500 text-sm">
                        {esEdicion 
                            ? "Modifica la información del servicio adicional seleccionado" 
                            : "Registra un nuevo complemento o extra para los servicios principales"}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Campo Nombre */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <Tag className="h-3.5 w-3.5 text-indigo-500" />
                            Nombre del Adicional
                        </label>
                        <input
                            placeholder="Ej. Lavado de cabello especial"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>

                    {/* Campo Descripción */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <FileText className="h-3.5 w-3.5 text-indigo-500" />
                            Descripción
                        </label>
                        <textarea
                            rows={3}
                            placeholder="Escribe una breve descripción del adicional..."
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    {/* Campo Precio */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5 text-indigo-500" />
                            Precio (₡)
                        </label>
                        <input
                            type="number"
                            placeholder="3000"
                            className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </div>
                </CardContent>

                <CardFooter className="bg-slate-50 border-t border-slate-100 flex justify-end gap-3 p-4">
                    <Button 
                        variant="outline" 
                        onClick={() => navigate("/servicios-adicionales")}
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

export default ServicioAdicionalFormPage