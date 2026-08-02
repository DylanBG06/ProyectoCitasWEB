import { createContext, useContext, useState } from "react";
import { login as loginAPI, obtenerPerfil } from "@/api/authApi";
import { useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    async function login(correo, password) {
        const resultado = await loginAPI(correo, password)
        const perfil = await obtenerPerfil(resultado.token)

        setToken(resultado.token)

        setUsuario(perfil)

        localStorage.setItem("token", resultado.token)
        localStorage.setItem("usuario", JSON.stringify(perfil))

    }


    function logout() {
        setUsuario(null)
        setToken(null)

        localStorage.removeItem("token")
        localStorage.removeItem("usuario")

    }

    useEffect(() => {
        const tokenGuardado = localStorage.getItem("token")
        const usuarioGuardado = localStorage.getItem("usuario")

        if(usuarioGuardado && tokenGuardado){
            setToken(tokenGuardado)
            setUsuario(JSON.parse(usuarioGuardado))
        }

        setLoading(false)
    }, [])

    return (
        <AuthContext.Provider value={{ usuario, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )

}   

export function useAuth() {
    return useContext(AuthContext)
}


