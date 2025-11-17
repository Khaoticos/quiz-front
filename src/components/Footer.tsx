import { Button } from "@/components/ui/button";
import { Play, MessageCircle, Mail, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white" style={{ backgroundColor: '#072244' }}>
      {/* CTA Section */}
      <div className="border-b border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para se divertir e ganhar?
            </h2>
            <p className="text-lg text-white/80 max-w-3xl mx-auto mb-10">
              Cadastre-se agora e participe do próximo quiz em um bar ou restaurante parceiro.
              Arrisque-se nos desafios, chame os amigos e descubra quem sabe mais!
            </p>
            <Link to="/quizzes">
              <Button variant="secondary" size="lg" className="text-white hover:opacity-90" style={{ backgroundColor: '#F97F2A' }}>
                <Play className="mr-2" size={20} />
                Jogar Agora
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <img src="/logo.png" alt="Quis" className="h-12 w-auto mb-4" />
            <p className="text-white/70 leading-relaxed mb-6">
              A plataforma que conecta diversão e prêmios nos seus bares e restaurantes favoritos.
              Jogue, desafie amigos e ganhe recompensas incríveis!
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110">
                <Instagram size={20} />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110">
                <Twitter size={20} />
              </button>
              <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:opacity-80 transition-all duration-300 hover:scale-110">
                <MessageCircle size={20} />
              </button>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Links Úteis</h4>
            <ul className="space-y-2">
              <li><a href="#como-funciona" className="text-white/70 hover:text-white transition-colors duration-300">Como Funciona</a></li>
              <li><a href="#quizzes" className="text-white/70 hover:text-white transition-colors duration-300">Quizzes</a></li>
              <li><a href="#parceiros" className="text-white/70 hover:text-white transition-colors duration-300">Estabelecimentos</a></li>
              <li><a href="#faq" className="text-white/70 hover:text-white transition-colors duration-300">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div id="contato">
            <h4 className="text-lg font-semibold mb-4 text-white">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-white/70">
                <MessageCircle size={16} className="mr-2" />
                <span>WhatsApp</span>
              </li>
              <li className="flex items-center text-white/70">
                <Mail size={16} className="mr-2" />
                <span>contato@quis.app</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-white/60">
              <a href="#" className="hover:text-white transition-colors duration-300">Termos de Uso</a>
              <span>|</span>
              <a href="#" className="hover:text-white transition-colors duration-300">Política de Privacidade / LGPD</a>
              <span>|</span>
              <a href="#contato" className="hover:text-white transition-colors duration-300">Contato</a>
            </div>
            <div className="text-sm text-white/60 text-center md:text-right">
              © 2024 Quis. Todos os direitos reservados.
            </div>
          </div>
          <div className="mt-4 text-xs text-white/50 text-center">
            Prêmios e promoções variam conforme cada local participante. Consulte as regras com o estabelecimento.
            Plataforma em conformidade com a LGPD.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;