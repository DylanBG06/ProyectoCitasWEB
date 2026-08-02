import axiosClient from "./axiosClient";

export async function listarServicios() {
    const response = await axiosClient.get("/servicios")
    return response.data.data
}

export async function listarServiciosActivos() {
    const response = await axiosClient.get("/servicios/activos")
    return response.data.data
}

export async function obtenerServicioPorId(id) {
    const response = await axiosClient.get(`/servicios/${id}`)
    return response.data.data
}

export async function crearServicio(datosServicio) {
    const response = await axiosClient.post("/servicios", datosServicio)
    return response.data.data
}

export async function actualizarServicio(id, datos) {
    const response = await axiosClient.put(`/servicios/${id}`, datos)
    return response.data.data
}

export async function cambiarEstadoServicio(id, activo) {
    const response = await axiosClient.patch(`/servicios/${id}/estado`, {activo})
    return response.data.data
}