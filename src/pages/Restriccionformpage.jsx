import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { crearRestriccion } from "@/api/restriccionesApi"
import { listarTiposRestriccion } from "@/api/tiposRestriccionApi"
import { listarEmpleados } from "@/api/empleadosApi"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

function RestriccionFormPage() {
    const navigate = useNavigate()

    const [tipos, setTipos] = useState([])
    const [empleados, setEmpleados] = useState([])

    const [tipoRestriccionId, setTipoRestriccionId] = useState("")
    const [empleadoId, setEmpleadoId] = useState("")
    const [fecha, setFecha] = useState("")
    const [horaInicio, setHoraInicio] = useState("")
    const [horaFin, setHoraFin] = useState("")
    const [todoElDia, setTodoElDia] = useState(false)
    const [motivo, setMotivo] = useState("")

    useEffect(() => {
        async function cargarCatalogos() {
            const resTipos = await listarTiposRestriccion()
            const resEmpleados = await listarEmpleados()
            setTipos(resTipos)
            setEmpleados(resEmpleados)
        }
        cargarCatalogos()
    }, [])

    async function handleSubmit() {
        const datos = {
            tipoRestriccionId: Number(tipoRestriccionId),
            empleadoId: empleadoId ? Number(empleadoId) : null,
            fecha,
            horaInicio: todoElDia ? "00:00" : horaInicio,
            horaFin: todoElDia ? "23:59" : horaFin,
            todoElDia,
            motivo
        }

        await crearRestriccion(datos)
        navigate("/restricciones")
    }

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Nueva Restricción</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label>Tipo de restricción</Label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                            value={tipoRestriccionId}
                            onChange={(e) => setTipoRestriccionId(e.target.value)}
                        >
                            <option value="">Selecciona un tipo</option>
                            {tipos.map((t) => (
                                <option key={t.id} value={t.id}>{t.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Empleado (opcional, dejar vacío si es general)</Label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                            value={empleadoId}
                            onChange={(e) => setEmpleadoId(e.target.value)}
                        >
                            <option value="">General del establecimiento</option>
                            {empleados.map((e) => (
                                <option key={e.id} value={e.id}>
                                    {e.usuario?.nombre} {e.usuario?.primerApellido}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Fecha</Label>
                        <Input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="todoElDia"
                            checked={todoElDia}
                            onChange={(e) => setTodoElDia(e.target.checked)}
                        />
                        <Label htmlFor="todoElDia">Bloquear todo el día</Label>
                    </div>

                    {!todoElDia && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <Label>Hora inicio</Label>
                                <input
                                    type="time"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                                    value={horaInicio}
                                    onChange={(e) => setHoraInicio(e.target.value)}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <Label>Hora fin</Label>
                                <input
                                    type="time"
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                                    value={horaFin}
                                    onChange={(e) => setHoraFin(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <Label>Motivo</Label>
                        <Input value={motivo} onChange={(e) => setMotivo(e.target.value)} placeholder="Ej. Feriado nacional" />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => navigate("/restricciones")}>Cancelar</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500" onClick={handleSubmit}>Crear</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default RestriccionFormPage
