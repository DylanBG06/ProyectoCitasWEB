import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { crearHorario, actualizarHorario, obtenerHorariosPorId } from "@/api/horariosApi"
import { listarDiasSemana } from "@/api/diaSemanaApi"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { restarSeisHoras } from "@/utils/horas"

function HorarioFormPage() {
    const navigate = useNavigate()
    const { id } = useParams()
    const esEdicion = !!id

    const [dias, setDias] = useState([])
    const [diaSemanaId, setDiaSemanaId] = useState("")
    const [horaInicio, setHoraInicio] = useState("")
    const [horaFin, setHoraFin] = useState("")
    const [cargando, setCargando] = useState(true)

    useEffect(() => {
        async function cargarDias() {
            const response = await listarDiasSemana()
            setDias(response)
        }
        cargarDias()
    }, [])

    useEffect(() => {
        if (esEdicion) {
            async function cargarHorario() {
                const response = await obtenerHorariosPorId(id)
                setDiaSemanaId(String(response.diaSemanaId))
                setHoraInicio(response.horaInicio.substring(11, 16))
                setHoraFin(response.horaFin.substring(11, 16))
                setCargando(false)
            }
            cargarHorario()
        } else {
            setCargando(false)
        }
    }, [id, esEdicion])

    async function handleSubmit() {
        const datos = {
            diaSemanaId: Number(diaSemanaId),
            horaInicio: restarSeisHoras(horaInicio),
            horaFin: restarSeisHoras(horaFin)
        }
        console.log("Enviando:", datos)

        if (esEdicion) {
            await actualizarHorario(id, datos)
        } else {
            await crearHorario(datos)
        }

        navigate("/horarios")
    }

    if (cargando) {
        return <p className="text-center py-12 text-slate-500">Cargando...</p>
    }


    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>{esEdicion ? "Editar Horario" : "Nuevo Horario"}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <Label>Día de la semana</Label>
                        <select
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                            value={diaSemanaId}
                            onChange={(e) => setDiaSemanaId(e.target.value)}
                        >
                            <option value="">Selecciona un día</option>
                            {dias.map((d) => (
                                <option key={d.id} value={d.id}>{d.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-1.5">
                        <Label>Hora de inicio</Label>
                        <input
                            type="time"
                            value={horaInicio}
                            onChange={(e) => {
                                console.log("Valor crudo del input:", e.target.value)
                                setHoraInicio(e.target.value)
                            }}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Hora de fin</Label>
                        <input
                            type="time"
                            className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md"
                            value={horaFin}
                            onChange={(e) => setHoraFin(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => navigate("/horarios")}>Cancelar</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500" onClick={handleSubmit}>
                        {esEdicion ? "Guardar Cambios" : "Crear"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default HorarioFormPage
