import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, Mail, LogIn, CheckCircle2} from "lucide-react" 
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"


function LoginPage() {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")

    const { login, usuario } = useAuth()
    const navigate = useNavigate()

    async function handleLogin() {
        try {
            await login(correo, password)
            navigate("/servicios")
        } catch (error) {
            console.error("Error al iniciar sesión:", error)
        }
    }
    return (
        <div className="flex min-h-[75vh] items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg border-slate-200">
                <CardHeader className="space-y-2 text-center">
                    <div className="mx-auto p-3 bg-indigo-50 text-indigo-600 rounded-full w-fit">
                        <Lock className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                        Iniciar Sesión
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-sm">
                        Ingresa tus credenciales para acceder al sistema
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Correo Electrónico
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                placeholder="correo@ejemplo.com"
                                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                            Contraseña
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <Button
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2 shadow-sm transition-colors flex items-center justify-center gap-2"
                        onClick={handleLogin}
                    >
                        <LogIn className="h-4 w-4" />
                        Iniciar sesión
                    </Button>

                    <Link to="/registro" className="text-sm text-center text-slate-500 hover:underline">
                            ¿No tienes cuenta? Regístrate
                        </Link>
                </CardContent>

                {usuario && (
                    <CardFooter className="pt-0">
                        <div className="w-full p-3 bg-emerald-50 border border-emerald-200 rounded-md flex items-center gap-2 text-emerald-700 text-sm font-medium">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <p>Bienvenido, <span className="font-semibold">{usuario.nombre}</span></p>
                        </div>
                    </CardFooter>
                )}
            </Card>
        </div>
    )
}

export default LoginPage