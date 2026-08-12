import { useAuth } from "@/context/AuthContext"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Shield } from "lucide-react"

function ProfilePage() {
    const { usuario } = useAuth()

    if (!usuario) {
        return <p className="text-center py-12 text-slate-500">Cargando perfil...</p>
    }

    return (
        <div className="max-w-md mx-auto">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-full">
                            <User className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-xl">
                                {usuario.nombre} {usuario.primerApellido} {usuario.segundoApellido || ""}
                            </CardTitle>
                            <CardDescription>
                                <Badge variant="outline" className="mt-1">
                                    <Shield className="h-3 w-3 mr-1" />
                                    {usuario.rol?.nombre}
                                </Badge>
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Mail className="h-4 w-4 text-slate-400" />
                        <span>{usuario.correo}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                        <Phone className="h-4 w-4 text-slate-400" />
                        <span>{usuario.telefono || "No registrado"}</span>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProfilePage
