import { Button } from "@/components/ui/button";
import { Play, Shield } from "lucide-react";
import heroImage from "@/assets/hero-quiz-bar.jpg";

const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 md:pt-24 md:pb-20 min-h-screen flex items-center bg-gradient-to-br from-background via-accent/5 to-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Desafie seu conhecimento
                </span>
                <br />
                e ganhe prêmios no seu
                <br />
                <span className="text-accent">bar favorito!</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
                Jogue quizzes, some pontos e troque por experiências e prêmios nas casas parceiras ou online. 
                <span className="text-primary font-semibold"> Diversão e recompensa andam juntas no Quis!</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="hero" size="lg" className="group">
                <Play className="mr-2 transition-transform group-hover:scale-110" size={24} />
                Quero Jogar Agora
              </Button>
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2 text-sm text-muted-foreground">
              <Shield size={16} className="text-primary" />
              <span>Cadastro gratuito e seguro</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-elevated">
              <img 
                src={heroImage} 
                alt="Pessoas jogando quiz em um ambiente de bar, se divertindo e competindo por prêmios" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold shadow-glow animate-bounce">
              🏆 +150 Bares
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold shadow-glow animate-bounce delay-300">
              🎯 +12k Jogos
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;