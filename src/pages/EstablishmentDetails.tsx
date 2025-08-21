import { useParams, Navigate } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, ExternalLink, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { establishments } from "@/data/establishmentsData";

const EstablishmentDetails = () => {
  const { id } = useParams();
  const establishment = establishments.find(e => e.id === id);

  if (!establishment) {
    return <Navigate to="/estabelecimentos" replace />;
  }

  const getSocialIcon = (type: string) => {
    switch (type) {
      case "Instagram":
        return "📷";
      case "Facebook":
        return "👥";
      case "TikTok":
        return "🎵";
      default:
        return "🔗";
    }
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "Novo":
        return "secondary";
      case "Aberto Agora":
        return "default";
      default:
        return "outline";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button variant="ghost" asChild className="mb-6">
            <a href="/estabelecimentos" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para estabelecimentos
            </a>
          </Button>
        </div>

        {/* Hero Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="aspect-[16/6] bg-muted rounded-lg overflow-hidden mb-8">
            <img 
              src={establishment.mainPhoto} 
              alt={establishment.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={establishment.logo} 
                    alt={`${establishment.name} logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
                
                <div className="flex-1">
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{establishment.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">{establishment.type}</Badge>
                    <Badge variant="secondary">Parceiro Oficial Quis</Badge>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {establishment.badges.map((badge) => (
                      <Badge key={badge} variant={getBadgeVariant(badge)} className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-lg text-muted-foreground mb-8">
                {establishment.extendedDescription}
              </p>
            </div>

            {/* Contact Info */}
            <Card className="w-full md:w-80">
              <CardHeader>
                <CardTitle>Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-sm text-muted-foreground">
                      {establishment.address.street}<br />
                      {establishment.address.neighborhood}, {establishment.address.city} - {establishment.address.state}<br />
                      CEP: {establishment.address.zipCode}
                    </p>
                    <Button variant="link" className="p-0 h-auto mt-2" asChild>
                      <a 
                        href={`https://maps.google.com/maps?q=${encodeURIComponent(establishment.address.street + ', ' + establishment.address.city)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        Ver no Google Maps
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Horário de funcionamento</p>
                    <p className="text-sm text-muted-foreground">{establishment.workingHours}</p>
                    {establishment.isOpenNow && (
                      <Badge variant="default" className="mt-1">Aberto agora</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <p className="text-sm text-muted-foreground">{establishment.phone}</p>
                  </div>
                </div>

                {establishment.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-sm text-muted-foreground">{establishment.email}</p>
                    </div>
                  </div>
                )}

                {establishment.socials.length > 0 && (
                  <div>
                    <p className="font-medium mb-2">Redes Sociais</p>
                    <div className="flex gap-2">
                      {establishment.socials.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            <span>{getSocialIcon(social.type)}</span>
                            {social.type}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quizzes Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Quizzes deste estabelecimento</CardTitle>
              <p className="text-muted-foreground">
                Pronto para jogar? Escolha um quiz exclusivo deste estabelecimento ou volte sempre para surpresas novas!
              </p>
            </CardHeader>
            <CardContent>
              {establishment.quizzes.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold mb-2">Nenhum quiz ativo neste local no momento</h3>
                  <p className="text-muted-foreground">
                    Os quizzes retornam em breve! Fique de olho nas novidades.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {establishment.quizzes
                    .filter(quiz => quiz.active)
                    .map((quiz) => (
                      <Card key={quiz.id} className="hover:shadow-elevated transition-shadow duration-300">
                        <CardHeader>
                          <CardTitle className="text-lg">{quiz.name}</CardTitle>
                          <Badge variant="outline" className="w-fit">{quiz.theme}</Badge>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-4">
                            {quiz.description}
                          </p>
                          <Button asChild className="w-full">
                            <a href={`/quiz/${quiz.id}`}>
                              Jogar
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default EstablishmentDetails;