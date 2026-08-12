import axiosClient from "./axiosClient"

export async function listarTiposRestriccion() {
    const response = await axiosClient.get("/tipos-restriccion-horario")
    return response.data.data
}