import axiosClient from "./axiosClient"

export async function listarRestricciones() {
    const response = await axiosClient.get("/restricciones-horario")
    return response.data.data
}

export async function obtenerRestriccionPorId(id) {
    const response = await axiosClient.get(`/restricciones-horario/${id}`)
    return response.data.data
}

export async function crearRestriccion(datos) {
    const response = await axiosClient.post("/restricciones-horario", datos)
    return response.data.data
}

export async function actualizarRestriccion(id, datos) {
    const response = await axiosClient.put(`/restricciones-horario/${id}`, datos)
    return response.data.data
}

export async function cambiarEstadoRestriccion(id, activo) {
    const response = await axiosClient.patch(`/restricciones-horario/${id}/estado`, { activo })
    return response.data.data
}