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

        <Route element={<RutaProtegida />}>
          <Route path="/servicios-adicionales" element={<ServiciosAdicionalesPage />} />
        </Route>

        <Route element={<RutaProtegida rolesPermitidos={["Administrador"]} />}>
          <Route path="/servicios-adicionales/crear" element={<ServicioAdicionalFormPage />} />
          <Route path="/servicios-adicionales/:id/editar" element={<ServicioAdicionalFormPage />} />
        </Route>

        <Route element={<RutaProtegida />}>
          <Route path="/servicios-adicionales" element={<ServiciosAdicionalesPage />} />
          <Route path="/servicios-adicionales/:id" element={<ServicioAdicionalDetallePage />} />
        </Route>

      </Route>
    </Routes>
  )
}

export default App