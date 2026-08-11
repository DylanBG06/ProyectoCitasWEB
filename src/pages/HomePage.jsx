import { Link } from "react-router-dom"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarCheck, LogIn } from "lucide-react"

function HomePage() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center p-4">
            <Card className="w-full max-w-lg text-center shadow-md border-slate-200">
                <CardHeader className="space-y-3">
                    <div className="mx-auto p-3 bg-indigo-50 text-indigo-600 rounded-full w-fit">
                        <CalendarCheck className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
                        Bienvenido a Urban Barber
                    </CardTitle>
                    <CardDescription className="text-slate-500 text-sm">
                        Gestiona tus citas, servicios y horarios en un solo lugar
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                    <Button asChild className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-6 shadow-sm">
                        <Link to="/login" className="flex items-center gap-2">
                            <LogIn className="h-4 w-4" />
                            Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}

export default HomePage