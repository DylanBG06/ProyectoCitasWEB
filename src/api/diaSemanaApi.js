import axiosClient from "./axiosClient"

export async function listarDiasSemana() {
    const response = await axiosClient.get("/dias-semana")
    return response.data.data
}