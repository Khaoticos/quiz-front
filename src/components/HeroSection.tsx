import { Button } from "@/components/ui/button";
import { Play, Shield, Trophy, Target } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 min-h-screen flex items-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.png"
          alt="Background"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/30 to-black/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Content */}
          <div className="space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Desafie seu conhecimento
                </span>
                <br />
                e ganhe prêmios no seu
                <br />
                <span className="text-accent">bar favorito!</span>
              </h1>

              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                Jogue quizzes, some pontos e troque por experiências e prêmios nas casas parceiras ou online.
                <span className="text-primary font-semibold"> Diversão e recompensa andam juntas no Quis!</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="group">
                <Play className="mr-2 transition-transform group-hover:scale-110" size={24} />
                Quero Jogar Agora
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Saiba Mais
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-white/80">
              <Shield size={16} className="text-primary" />
              <span>Cadastro gratuito e seguro</span>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
              <div className="bg-secondary text-secondary-foreground px-6 py-3 rounded-full font-bold shadow-glow flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                +150 Bares
              </div>
              <div className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold shadow-glow flex items-center gap-2">
                <Target className="w-5 h-5" />
                +12k Jogos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;