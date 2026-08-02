import axiosClient from "./axiosClient"

export async function listarEspecialidades() {
    const response = await axiosClient.get("/especialidades")
    return response.data.data
}