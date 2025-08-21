import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { profile, signOut } = useAuth();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const getLinkClass = (path: string) => 
    `text-foreground hover:text-primary transition-colors duration-300 font-medium ${
      isActive(path) ? "text-primary" : ""
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border shadow-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Quis
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="/" className={getLinkClass("/")}>
                Home
              </a>
              <a href="/quizzes" className={getLinkClass("/quizzes")}>
                Quizzes
              </a>
              <a href="/estabelecimentos" className={getLinkClass("/estabelecimentos")}>
                Estabelecimentos
              </a>
              <a href="#contato" className={getLinkClass("#contato")}>
                Contato
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            {profile ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Olá, {profile.nome}
                </span>
                {profile.tipo_perfil === 'admin' && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="gap-2">
                      <User size={16} />
                      Painel Admin
                    </Button>
                  </Link>
                )}
                <Button variant="outline" size="sm" onClick={signOut} className="gap-2">
                  <LogOut size={16} />
                  Sair
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="pill" size="sm">
                  Entrar / Cadastrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-primary hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 shadow-elevated">
              <a
                href="/"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("/")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="/quizzes"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("/quizzes")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Quizzes
              </a>
              <a
                href="/estabelecimentos"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("/estabelecimentos")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Estabelecimentos
              </a>
              <a
                href="#contato"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("#contato")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <div className="px-3 py-2 space-y-2">
                {profile ? (
                  <>
                    <div className="text-sm text-muted-foreground px-3 py-2">
                      Olá, {profile.nome}
                    </div>
                    {profile.tipo_perfil === 'admin' && (
                      <Link to="/admin" onClick={() => setIsMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full gap-2">
                          <User size={16} />
                          Painel Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="outline" size="sm" className="w-full gap-2" onClick={() => {
                      signOut();
                      setIsMenuOpen(false);
                    }}>
                      <LogOut size={16} />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="pill" size="sm" className="w-full">
                      Entrar / Cadastrar
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;