import { Search, Trophy, Gift } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Escolha seu quiz",
    description: "Escolha o quiz do seu interesse: generalistas, temáticos ou exclusivos do seu bar/restaurante favorito.",
  },
  {
    icon: Trophy,
    title: "Jogue e some pontos",
    description: "Jogue e some pontos – desafie seus amigos, entre em rankings e a cada rodada fique mais perto de ganhar.",
  },                      
  {
    icon: Gift,
    title: "Troque por prêmios",
    description: "Troque seus pontos por prêmios definidos pelos estabelecimentos participantes. Cada lugar tem uma surpresa esperando por você!",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-16 md:py-24 bg-gradient-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Como funciona?
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center shadow-glow group-hover:shadow-elevated transition-all duration-300 group-hover:scale-110">
                    <IconComponent size={32} className="text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm shadow-card">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-card rounded-xl p-6 shadow-card max-w-4xl mx-auto border-l-4 border-primary">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">💡 Dica importante:</span> No Quis, cada bar e restaurante parceiro pode criar sua própria premiação – consulte as regras e participe!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;