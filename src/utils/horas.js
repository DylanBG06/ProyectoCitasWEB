export function restarSeisHoras(horaTexto) {
        const [horas, minutos] = horaTexto.split(":").map(Number)
        let nuevaHora = horas - 6
        if (nuevaHora < 0) nuevaHora += 24
        return `${String(nuevaHora).padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`
    }