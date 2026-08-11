import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axiosClient from "@/api/axiosClient"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function RegistroPage() {
    const navigate = useNavigate()

    const [nombre, setNombre] = useState("")
    const [primerApellido, setPrimerApellido] = useState("")
    const [segundoApellido, setSegundoApellido] = useState("")
    const [correo, setCorreo] = useState("")
    const [telefono, setTelefono] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [guardando, setGuardando] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")
        setGuardando(true)

        try {
            await axiosClient.post("/usuarios/registro", {
                nombre,
                primerApellido,
                segundoApellido: segundoApellido || null,
                correo,
                telefono,
                password
            })

            navigate("/login")
        } catch (err) {
            const errores = err.response?.data?.validationErrors
            if (errores && errores.length > 0) {
                setError(errores[0].message)
            } else {
                setError(err.response?.data?.message || "No se pudo completar el registro.")
            }
        }
    }

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Crear cuenta</CardTitle>
                    <CardDescription>Regístrate como cliente de Urban Barber</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                                {error}
                            </p>
                        )}

                        <div className="space-y-1.5">
                            <Label htmlFor="nombre">Nombre</Label>
                            <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="primerApellido">Primer Apellido</Label>
                            <Input id="primerApellido" value={primerApellido} onChange={(e) => setPrimerApellido(e.target.value)} required />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                            <Input id="segundoApellido" value={segundoApellido} onChange={(e) => setSegundoApellido(e.target.value)} />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="correo">Correo</Label>
                            <Input id="correo" type="email" value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="telefono">Teléfono</Label>
                            <Input id="telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="password">Contraseña</Label>
                            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-3">
                        <Button type="submit" disabled={guardando} className="w-full">
                            {guardando ? "Creando cuenta..." : "Registrarme"}
                        </Button>
                        <Link to="/login" className="text-sm text-center text-slate-500 hover:underline">
                            ¿Ya tienes cuenta? Inicia sesión
                        </Link>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}

export default RegistroPage
