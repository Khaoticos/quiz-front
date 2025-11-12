import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, Target } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout className="min-h-screen bg-gradient-card">
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center space-y-6 max-w-md">
          <Target className="w-24 h-24 mx-auto text-primary animate-bounce" />
          <h1 className="text-6xl font-bold">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              404
            </span>
          </h1>
          <p className="text-2xl font-semibold text-foreground">
            Ops! Esta página saiu para jogar um quiz...
          </p>
          <p className="text-lg text-muted-foreground">
            Parece que você acertou uma resposta que não existe no nosso sistema.
          </p>
          <Button variant="default" size="lg" asChild className="mt-4">
            <Link to="/">
              <Home className="mr-2 h-5 w-5" />
              Voltar para o Início
            </Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
