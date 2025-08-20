import { Star, Users, MapPin } from "lucide-react";

const testimonials = [
  {
    name: "Marina Santos",
    role: "Jogadora frequente",
    content: "Ganhei um voucher de drinks depois de ser o campeão do quiz do sábado. É sempre uma experiência divertida!",
    rating: 5,
  },
  {
    name: "Carlos Lima",
    role: "Entusiasta de quizzes",
    content: "Comecei a frequentar o bar do meu bairro por causa do Quis, virou tradição entre os amigos!",
    rating: 5,
  },
  {
    name: "Ana Rodrigues",
    role: "Proprietária - Bar do Centro",
    content: "Oferecer o quiz toda semana dobrou a presença dos clientes. Todo mundo adora competir!",
    rating: 5,
  },
];

const partners = [
  { name: "Bar do Centro", category: "Bar & Lounge" },
  { name: "Restaurante Vila", category: "Restaurante" },
  { name: "Cervejaria Artesanal", category: "Cervejaria" },
  { name: "Pub Irlandês", category: "Pub" },
  { name: "Bistro Gourmet", category: "Bistro" },
  { name: "Sports Bar", category: "Sports Bar" },
];

const PartnersSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Estabelecimentos Parceiros
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Jogue quizzes nos melhores bares e restaurantes da cidade – cada um com prêmios e dinâmicas exclusivas para sua comunidade.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="bg-gradient-card rounded-xl p-6 text-center shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 group"
            >
              <div className="w-16 h-16 mx-auto bg-gradient-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-bold text-foreground mb-1 text-sm">{partner.name}</h3>
              <p className="text-xs text-muted-foreground">{partner.category}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center bg-card rounded-xl p-6 shadow-card">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">+12k</div>
            <div className="text-sm text-muted-foreground">Jogos Realizados</div>
          </div>
          <div className="text-center bg-card rounded-xl p-6 shadow-card">
            <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">+150</div>
            <div className="text-sm text-muted-foreground">Bares Parceiros</div>
          </div>
          <div className="text-center bg-card rounded-xl p-6 shadow-card">
            <div className="text-3xl md:text-4xl font-bold text-accent mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Satisfação</div>
          </div>
          <div className="text-center bg-card rounded-xl p-6 shadow-card">
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">24h</div>
            <div className="text-sm text-muted-foreground">Suporte Ativo</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-foreground">
            O que nossos usuários dizem
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gradient-card rounded-xl p-6 shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-secondary fill-current" />
                ))}
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mr-4">
                  <Users className="text-primary-foreground" size={20} />
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;