import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Layout from "./components/Layout"
import RutaProtegida from "./components/RutaProtegida"
import CitasPage from "./pages/CitasPage"
import ServiciosPage from "./pages/ServiciosPage"
import ServicioDetallePage from "./pages/ServicioDetallePage"
import ServicioFormPage from "./pages/ServicioFormPage"

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
        </Route>

      </Route>
    </Routes>
  )
}

export default App