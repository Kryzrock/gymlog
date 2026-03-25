import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: ruta no encontrada —", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 px-4">
        <p className="text-8xl font-bold text-muted-foreground/20">404</p>
        <h1 className="text-2xl font-bold">Página no encontrada</h1>
        <p className="text-muted-foreground">La ruta que buscás no existe.</p>
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Volver al inicio
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
