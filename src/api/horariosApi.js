import axiosClient from "./axiosClient";

export async function listarHorarios() {
    const response = await axiosClient.get("/horarios-atencion")
    return response.data.data
}

export async function obtenerHorariosPorId(id) {
    const response = await axiosClient.get(`/horarios-atencion/${id}`)
    return response.data.data
}

export async function crearHorario(datosHorario) {
    const response = await axiosClient.post("/horarios-atencion", datosHorario)
    return response.data.data
}

export async function actualizarHorario(id, datosHorario){
    const response = await axiosClient.put(`/horarios-atencion/${id}`, datosHorario)
    return response.data.data
}

export async function cambiarEstadoHorario(id, activo) {
    const response = await axiosClient.patch(`/horarios-atencion/${id}/estado`, {activo})
    return response.data.data
}