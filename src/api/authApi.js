import axiosClient from "./axiosClient";

export async function login(correo, password){
    const response = await axiosClient.post("/usuarios/login", {correo, password})
    return response.data.data
}

export async function obtenerPerfil(token) {
    const response = await axiosClient.get("/usuarios/perfil", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data.data
}