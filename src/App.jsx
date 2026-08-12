import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Layout from "./components/Layout"
import RutaProtegida from "./components/RutaProtegida"
import CitasPage from "./pages/CitasPage"
import ServiciosPage from "./pages/ServiciosPage"
import ServicioDetallePage from "./pages/ServicioDetallePage"
import ServicioFormPage from "./pages/ServicioFormPage"
import ServicioAdicionalFormPage from "./pages/AdicionalFormPage"
import ServiciosAdicionalesPage from "./pages/AdicionalesPage"
import ServicioAdicionalDetallePage from "./pages/AdicionalDetallePage"
import EmpleadosPage from "./pages/EmpleadosPage"
import EmpleadoFormPage from "./pages/EmpleadoFormPage"
import RegistroPage from "./pages/RegistroPage"
import HorariosPage from "./pages/HorariosPage"
import HorarioFormPage from "./pages/HorarioFormPage"
import RestriccionDetallePage from "./pages/Restricciondetallepage "
import RestriccionesPage from "./pages/RestriccionesPage"
import RestriccionFormPage from "./pages/Restriccionformpage"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/citas" element={<CitasPage />} />
        </Route>

        <Route element={<RutaProtegida />}>
          <Route path="/servicios" element={<ServiciosPage />} />
          <Route path="/servicios/:id" element={<ServicioDetallePage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/servicios/crear" element={<ServicioFormPage />} />
          <Route path="/servicios/:id/editar" element={<ServicioFormPage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/servicios-adicionales/crear" element={<ServicioAdicionalFormPage />} />
          <Route path="/servicios-adicionales/:id/editar" element={<ServicioAdicionalFormPage />} />
        </Route>

        <Route element={<RutaProtegida />}>
          <Route path="/servicios-adicionales" element={<ServiciosAdicionalesPage />} />
          <Route path="/servicios-adicionales/:id" element={<ServicioAdicionalDetallePage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador", "Empleado"]} />}>
          <Route path="/empleados" element={<EmpleadosPage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/empleados/nuevo" element={<EmpleadoFormPage />} />
          <Route path="/empleados/:id/editar" element={<EmpleadoFormPage />} />
        </Route>

        <Route path="/registro" element={<RegistroPage />} />

        <Route element={<RutaProtegida />}>
          <Route path="/horarios" element={<HorariosPage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/horarios/nuevo" element={<HorarioFormPage />} />
          <Route path="/horarios/:id/editar" element={<HorarioFormPage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador", "Empleado"]} />}>
          <Route path="/restricciones" element={<RestriccionesPage />} />
          <Route path="/restricciones/:id" element={<RestriccionDetallePage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/restricciones/nueva" element={<RestriccionFormPage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App