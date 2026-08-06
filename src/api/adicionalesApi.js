import axiosClient from "./axiosClient";

export async function listarAdicionales() {
    const response = await axiosClient.get("/servicios-adicionales")
    return response.data.data
}

export async function listarAdicionalesActivos() {
    const response = await axiosClient.get("/servicios-adicionales/activos")
    return response.data.data
}

export async function obtenerAdicionalPorId(id) {
    const response = await axiosClient.get(`/servicios-adicionales/${id}`)
    return response.data.data
}

export async function crearAdicional(datos) {
    const response = await axiosClient.post("/servicios-adicionales", datos)
    return response.data.data
}

export async function actualizarAdicional(id, datos) {
    const response = await axiosClient.put(`/servicios-adicionales/${id}`, datos)
    return response.data.data
}

export async function cambiarEstadoAdicional(id, activo) {
    const response = await axiosClient.patch(`/servicios-adicionales/${id}/estado`, {activo})
    return response.data.data
}

