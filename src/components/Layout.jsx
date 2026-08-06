import { Link, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"

function Layout() {
    const { usuario, logout } = useAuth()

    return (
        <div>
            <nav className="bg-white border-b px-6 py-3 flex items-center justify-between">
                <div className="flex gap-4">
                    <Link to="/" className="font-semibold">Inicio</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/servicios">Servicios</Link>
                    <Link to="/servicios-adicionales">Servicios adicionales</Link>
                </div>

                <div className="flex items-center gap-3">
                    {usuario && (
                        <>
                            <span className="text-sm text-muted-foreground">
                                Bienvenido, <span className="font-medium text-foreground">{usuario.nombre}</span>
                            </span>
                            <Button variant="outline"
                                onClick={logout}
                            >
                                Cerrar Sesion
                            </Button>
                        </>
                    )}
                </div>

            </nav>

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}

export default Layout