import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

function RutaProtegida({rolesPermitidos}) {
    const { usuario, loading } = useAuth()

    if(loading){
        return <p>Cargando...</p>
    }

    if(!usuario){
        return <Navigate to="/login" replace/>
    }

    if(rolesPermitidos && !rolesPermitidos.includes(usuario.rol.nombre)){
        return <Navigate to="/" replace/>
    }

    return <Outlet />

}

export default RutaProtegida