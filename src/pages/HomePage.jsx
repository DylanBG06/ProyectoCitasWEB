import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

function HomePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Bienvenido al Sistema de Citas</CardTitle>
                <CardDescription>Gestiona tus citas, servicios y horarios en un solo lugar</CardDescription>
            </CardHeader>
            <CardContent>
                <Link to="/login">Login</Link>
            </CardContent>
        </Card>
    )
}

export default HomePage


