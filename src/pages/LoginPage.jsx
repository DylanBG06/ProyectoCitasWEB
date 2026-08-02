import { useState } from "react"
import { useAuth } from "@/context/AuthContext"

function LoginPage() {
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")

    const { login, usuario } = useAuth()

    async function handleLogin() {
        await login(correo, password)
    }

    return (
        <div>
            <input
                className="border border-gray-400 rounded px-3 py-2 block mb-2"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
            />
            <input
                type="password"
                className="border border-gray-400 rounded px-3 py-2 block mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleLogin}
            >
                Iniciar sesión
            </button>

            {usuario && <p>Bienvenido, {usuario.nombre}</p>}

        </div>
    )
}

export default LoginPage



