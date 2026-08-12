import { Link, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Calendar, Sparkles, PlusCircle, LogOut, User, CalendarDays, Import } from "lucide-react"

function Layout() {
    const { usuario, logout } = useAuth()
    const esAdmin = usuario?.rol?.nombre === "Administrador"

    return (
        <div className="min-h-screen bg-slate-50/50 flex flex-col">
            <nav className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-6">
                    <Link to="/" className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-2 hover:text-indigo-600 transition-colors">
                        <Calendar className="h-5 w-5 text-indigo-600" />
                        <span>Urban Barber✂</span>
                    </Link>

                    <div className="flex items-center gap-1 text-sm font-medium text-slate-600">
                        <Link to="/" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors">
                            Inicio
                        </Link>
                        <Link to="/login" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors">
                            Login
                        </Link>
                        <Link to="/citas" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4 text-indigo-600" />
                            Citas
                        </Link>
                        <Link to="/servicios" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4 text-emerald-500" />
                            Servicios
                        </Link>
                        <Link to="/servicios-adicionales" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <PlusCircle className="h-4 w-4 text-indigo-500" />
                            Servicios adicionales
                        </Link>
                        {esAdmin && <Link to="/empleados" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <PlusCircle className="h-4 w-4 text-indigo-500" />
                            Empleados
                        </Link>
                        }
                        <Link to="/horarios" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4 text-indigo-600" />
                            Horarios de atencion
                        </Link>

                        {esAdmin && <Link to="/restricciones" className="px-3 py-1.5 rounded-md hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5">
                            <CalendarDays className="h-4 w-4 text-indigo-600" />
                            Restricciones
                        </Link>
                        }

                        <Link to="/perfil">Mi Perfil</Link>

                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {usuario && (
                        <>
                            <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                                <User className="h-4 w-4 text-slate-500" />
                                <span className="text-sm text-muted-foreground">
                                    Bienvenido, <span className="font-medium text-foreground">{usuario.nombre}</span>
                                </span>
                            </div>
                            <Button
                                variant="outline"
                                onClick={logout}
                                className="text-rose-600 border-rose-200 hover:bg-rose-50 hover:text-rose-700 transition-colors"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Cerrar Sesion
                            </Button>
                        </>
                    )}
                </div>

            </nav>

            <main className="p-6 max-w-7xl mx-auto w-full flex-1">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout