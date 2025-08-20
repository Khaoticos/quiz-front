import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Mail, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* CTA Section */}
      <div className="border-b border-background/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Pronto para se divertir e ganhar?
            </h2>
            <p className="text-lg text-background/80 max-w-3xl mx-auto">
              Cadastre-se agora e participe do próximo quiz em um bar ou restaurante parceiro. 
              Arrisque-se nos desafios, chame os amigos e descubra quem sabe mais!
            </p>
            <Button variant="secondary" size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Play className="mr-2" size={20} />
              Quero criar minha conta
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-secondary">Quis</h3>
            <p className="text-background/70 leading-relaxed mb-6">
              A plataforma que conecta diversão e prêmios nos seus bares e restaurantes favoritos. 
              Jogue, desafie amigos e ganhe recompensas incríveis!
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110">
                <Instagram size={20} />
              </button>
              <button className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110">
                <Twitter size={20} />
              </button>
              <button className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 hover:scale-110">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-secondary">Links Úteis</h4>
            <ul className="space-y-2">
              <li><a href="#como-funciona" className="text-background/70 hover:text-secondary transition-colors duration-300">Como Funciona</a></li>
              <li><a href="#quizzes" className="text-background/70 hover:text-secondary transition-colors duration-300">Quizzes</a></li>
              <li><a href="#parceiros" className="text-background/70 hover:text-secondary transition-colors duration-300">Estabelecimentos</a></li>
              <li><a href="#faq" className="text-background/70 hover:text-secondary transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contato">
            <h4 className="text-lg font-semibold mb-4 text-secondary">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-background/70">
                <MessageCircle size={16} className="mr-2" />
                <span>WhatsApp</span>
              </li>
              <li className="flex items-center text-background/70">
                <Mail size={16} className="mr-2" />
                <span>contato@quis.app</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-background/60">
              <a href="#" className="hover:text-secondary transition-colors duration-300">Termos de Uso</a>
              <span>|</span>
              <a href="#" className="hover:text-secondary transition-colors duration-300">Política de Privacidade / LGPD</a>
              <span>|</span>
              <a href="#contato" className="hover:text-secondary transition-colors duration-300">Contato</a>
            </div>
            <div className="text-sm text-background/60 text-center md:text-right">
              © 2024 Quis. Todos os direitos reservados.
            </div>
          </div>
          <div className="mt-4 text-xs text-background/50 text-center">
            Prêmios e promoções variam conforme cada local participante. Consulte as regras com o estabelecimento. 
            Plataforma em conformidade com a LGPD.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;