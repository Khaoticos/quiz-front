import { useState } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate('/');
  };

  const getDashboardPath = () => {
    if (!user) return '/';
    if (user.role === 'admin') return '/admin';
    if (user.role === 'establishment') return '/painel';
    return '/';
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const contatoElement = document.getElementById('contato');
      if (contatoElement) {
        contatoElement.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      e.preventDefault();
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const contatoElement = document.getElementById('contato');
        if (contatoElement) {
          contatoElement.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setIsMenuOpen(false);
  };

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
            <Link to="/">
              <img src="/logo.png" alt="Quis" className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link to="/" className={getLinkClass("/")}>
                Home
              </Link>
              <Link to="/quizzes" className={getLinkClass("/quizzes")}>
                Quizzes
              </Link>
              <Link to="/estabelecimentos" className={getLinkClass("/estabelecimentos")}>
                Estabelecimentos
              </Link>
              <a href="/#contato" onClick={handleContactClick} className={getLinkClass("#contato")}>
                Contato
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {(user?.role === 'admin' || user?.role === 'establishment') && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(getDashboardPath())}
                  >
                    <LayoutDashboard size={16} className="mr-2" />
                    Painel
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut size={16} className="mr-2" />
                  Sair
                </Button>
              </>
            ) : (
              <Button variant="pill" size="sm" onClick={() => navigate('/login')}>
                <User size={16} className="mr-2" />
                Entrar / Cadastrar
              </Button>
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
              <Link
                to="/"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("/")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/quizzes"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("/quizzes")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Quizzes
              </Link>
              <Link
                to="/estabelecimentos"
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("/estabelecimentos")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Estabelecimentos
              </Link>
              <a
                href="/#contato"
                onClick={handleContactClick}
                className={`block px-3 py-2 hover:bg-accent rounded-lg transition-colors duration-300 font-medium ${getLinkClass("#contato")}`}
              >
                Contato
              </a>
              <div className="px-3 py-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    {(user?.role === 'admin' || user?.role === 'establishment') && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          navigate(getDashboardPath());
                          setIsMenuOpen(false);
                        }}
                      >
                        <LayoutDashboard size={16} className="mr-2" />
                        Painel
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="w-full" onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="pill"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                  >
                    <User size={16} className="mr-2" />
                    Entrar / Cadastrar
                  </Button>
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