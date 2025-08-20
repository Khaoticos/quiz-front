import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <a href="#como-funciona" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                Como Funciona
              </a>
              <a href="#quizzes" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                Quizzes
              </a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors duration-300 font-medium">
                Contato
              </a>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button variant="pill" size="sm">
              Entrar / Cadastrar
            </Button>
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
                href="#como-funciona"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Como Funciona
              </a>
              <a
                href="#quizzes"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Quizzes
              </a>
              <a
                href="#contato"
                className="block px-3 py-2 text-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors duration-300 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </a>
              <div className="px-3 py-2">
                <Button variant="pill" size="sm" className="w-full">
                  Entrar / Cadastrar
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;