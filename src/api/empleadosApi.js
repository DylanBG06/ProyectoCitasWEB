import axiosClient from "./axiosClient"

// Listar todos los empleados
export async function listarEmpleados() {
    const response = await axiosClient.get("/empleados")
    return response.data.data
}

// Listar únicamente empleados activos
export async function listarEmpleadosActivos() {
    const response = await axiosClient.get("/empleados/activos")
    return response.data.data
}

// Obtener un empleado por ID
export async function obtenerEmpleadoPorId(id) {
    const response = await axiosClient.get(`/empleados/${id}`)
    return response.data.data
}

// Consultar la agenda de un empleado
export async function consultarAgendaEmpleado(id) {
    const response = await axiosClient.get(`/empleados/${id}/agenda`)
    return response.data.data
}

// Crear un nuevo empleado
export async function crearEmpleado(empleado) {
    const response = await axiosClient.post("/empleados", empleado)
    return response.data.data
}

// Actualizar datos del empleado
export async function actualizarEmpleado(id, empleado) {
    const response = await axiosClient.put(`/empleados/${id}`, empleado)
    return response.data.data
}

// Activar o desactivar empleado
export async function cambiarEstadoEmpleado(id, nuevoEstado) {
    const response = await axiosClient.patch(`/empleados/${id}/estado`, {
        activo: Boolean(nuevoEstado)
    })
    return response.data.data
}

// Registrar usuario
export async function registrarUsuario(datosUsuario) {
    // Se usa la ruta relativa para aprovechar el baseURL de axiosClient
    const response = await axiosClient.post("/usuarios/registro", datosUsuario)
    return response.data.data
}