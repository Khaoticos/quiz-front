import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { MapPin, Clock, Phone, Mail, ExternalLink, ArrowLeft, Instagram, Facebook, Music, Link, Star, Target, Sparkles, TrendingUp, Zap, Wifi, CreditCard, Accessibility, ParkingCircle, PartyPopper, CheckCircle2, Trophy, Gift, Image as ImageIcon } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { establishments } from "@/data/establishmentsData";

const EstablishmentDetails = () => {
  const { id } = useParams();
  const establishment = establishments.find(e => e.id === id);
  const [allQuizzes, setAllQuizzes] = useState<any[]>([]);

  useEffect(() => {
    if (!establishment) return;

    // Get custom quizzes from localStorage
    const customQuizzes = JSON.parse(localStorage.getItem('customQuizzes') || '[]');
    const establishmentQuizzes = JSON.parse(localStorage.getItem('establishmentQuizzes') || '{}');

    // Filter custom quizzes by establishment
    const customEstablishmentQuizzes = (establishmentQuizzes[id] || []);

    // Combine establishment quizzes with custom quizzes
    const combined = [...establishment.quizzes, ...customEstablishmentQuizzes];
    setAllQuizzes(combined);
  }, [id, establishment]);

  if (!establishment) {
    return <Navigate to="/estabelecimentos" replace />;
  }

  const getSocialIcon = (type: string) => {
    const iconProps = { className: "w-4 h-4" };
    switch (type) {
      case "Instagram":
        return <Instagram {...iconProps} />;
      case "Facebook":
        return <Facebook {...iconProps} />;
      case "TikTok":
        return <Music {...iconProps} />;
      default:
        return <Link {...iconProps} />;
    }
  };

  const getSocialColors = (type: string) => {
    switch (type) {
      case "Instagram":
        return "hover:bg-gradient-to-tr hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white hover:border-transparent";
      case "Facebook":
        return "hover:bg-[#1877F2] hover:text-white hover:border-transparent";
      case "TikTok":
        return "hover:bg-black hover:text-white hover:border-transparent";
      default:
        return "hover:bg-primary hover:text-white hover:border-transparent";
    }
  };

  const getBadgeIcon = (badge: string) => {
    const iconProps = { className: "w-3 h-3" };
    switch (badge) {
      case "Novo":
        return <Sparkles {...iconProps} />;
      case "Popular":
        return <TrendingUp {...iconProps} />;
      case "Destaque":
        return <Star {...iconProps} />;
      case "Promoção":
        return <Zap {...iconProps} />;
      default:
        return null;
    }
  };

  const getBadgeStyles = (badge: string) => {
    switch (badge) {
      case "Novo":
        return "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30 text-blue-200 hover:from-blue-500/30 hover:to-cyan-500/30 backdrop-blur-md";
      case "Popular":
        return "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/30 text-orange-200 hover:from-orange-500/30 hover:to-red-500/30 backdrop-blur-md";
      case "Destaque":
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-400/30 text-yellow-200 hover:from-yellow-500/30 hover:to-amber-500/30 backdrop-blur-md";
      case "Promoção":
        return "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30 text-purple-200 hover:from-purple-500/30 hover:to-pink-500/30 backdrop-blur-md animate-pulse";
      default:
        return "bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20";
    }
  };

  const getFeatureIcon = (feature: string) => {
    const iconProps = { className: "w-5 h-5" };
    const featureLower = feature.toLowerCase();

    if (featureLower.includes("wi-fi") || featureLower.includes("wifi")) {
      return <Wifi {...iconProps} />;
    } else if (featureLower.includes("cartão") || featureLower.includes("cartões")) {
      return <CreditCard {...iconProps} />;
    } else if (featureLower.includes("acessível") || featureLower.includes("acessibilidade")) {
      return <Accessibility {...iconProps} />;
    } else if (featureLower.includes("estacionamento") || featureLower.includes("parking") || featureLower.includes("valet")) {
      return <ParkingCircle {...iconProps} />;
    } else if (featureLower.includes("música") || featureLower.includes("musica") || featureLower.includes("transmissão") || featureLower.includes("jogos")) {
      return <PartyPopper {...iconProps} />;
    } else {
      return <CheckCircle2 {...iconProps} />;
    }
  };

  return (
    <Layout className="min-h-screen bg-background" contentClassName="pt-20">
        {/* Back Button */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 animate-in fade-in slide-in-from-left-4 duration-500">
          <Button variant="ghost" asChild className="mb-6 hover:translate-x-1 transition-transform">
            <a href="/estabelecimentos" className="flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para estabelecimentos
            </a>
          </Button>
        </div>

        {/* Hero Section - Momento Instagramável */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="relative aspect-[2/1] bg-muted rounded-xl overflow-hidden mb-8 shadow-2xl group">
            {/* Background Image */}
            <img
              src={establishment.mainPhoto}
              alt={establishment.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />

            {/* Gradient Overlay - Dark to transparent */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-end gap-4 md:gap-6 mb-4">
                {/* Logo */}
                <div className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-xl overflow-hidden flex-shrink-0 shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                  <img
                    src={establishment.logo}
                    alt={`${establishment.name} logo`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>

                {/* Title and Badges */}
                <div className="flex-1">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
                    {establishment.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge
                      variant="outline"
                      className="bg-gradient-to-r from-white/15 to-white/5 backdrop-blur-xl border-2 border-white/30 text-white hover:from-white/25 hover:to-white/15 hover:scale-105 transition-all duration-300 shadow-xl font-semibold animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: '0ms' }}
                    >
                      <Target className="w-3 h-3 mr-1.5" />
                      {establishment.type}
                    </Badge>
                    <Badge
                      className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 backdrop-blur-xl border-2 border-primary/40 text-white shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300 font-bold animate-in fade-in slide-in-from-bottom-2"
                      style={{ animationDelay: '100ms' }}
                    >
                      <Star className="w-3 h-3 mr-1.5 fill-current animate-pulse" />
                      Parceiro Oficial Quis
                    </Badge>
                    {establishment.isOpenNow && (
                      <Badge
                        className="bg-gradient-to-r from-green-500 to-emerald-500 backdrop-blur-xl border-2 border-green-300/40 text-white shadow-xl shadow-green-500/50 hover:scale-105 transition-all duration-300 font-semibold animate-in fade-in slide-in-from-bottom-2"
                        style={{ animationDelay: '200ms' }}
                      >
                        <span className="inline-block w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        Aberto Agora
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {establishment.badges.map((badge, index) => (
                      <Badge
                        key={badge}
                        variant="secondary"
                        className={`${getBadgeStyles(badge)} text-xs font-semibold transition-all duration-300 hover:scale-110 shadow-lg border-2 animate-in fade-in slide-in-from-bottom-2`}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {getBadgeIcon(badge) && (
                          <span className="mr-1.5 inline-flex">{getBadgeIcon(badge)}</span>
                        )}
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-4 md:gap-6 text-white/90 text-sm md:text-base">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="drop-shadow-lg">{establishment.address.neighborhood}, {establishment.address.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="drop-shadow-lg">{establishment.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Main Info */}
            <div className="flex-1 animate-in fade-in slide-in-from-left-4 duration-700" style={{ animationDelay: '200ms' }}>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {establishment.extendedDescription}
              </p>

              {/* Quizzes Section - Inside Left Column */}
              <div className="mb-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-2">Quizzes deste estabelecimento</h3>
                  <p className="text-sm text-muted-foreground">
                    Pronto para jogar? Escolha um quiz exclusivo deste estabelecimento ou volte sempre para surpresas novas!
                  </p>
                </div>

                {allQuizzes.length === 0 ? (
                  <div className="text-center py-8 px-4 rounded-lg bg-muted/50 animate-in fade-in zoom-in-95 duration-500">
                    <Target className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h4 className="text-base font-semibold mb-2">Nenhum quiz ativo neste local no momento</h4>
                    <p className="text-sm text-muted-foreground">
                      Os quizzes retornam em breve! Fique de olho nas novidades.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {allQuizzes
                      .filter(quiz => quiz.active)
                      .map((quiz, index) => (
                        <Card
                          key={quiz.id}
                          className="border-2 border-primary/10 hover:border-primary/30 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-in fade-in slide-in-from-left-2 duration-500"
                          style={{ animationDelay: `${400 + index * 100}ms` }}
                        >
                          <CardContent className="p-5">
                            <div className="flex items-start justify-between gap-4 mb-3">
                              <div className="flex-1">
                                <h4 className="text-lg font-bold mb-2">
                                  {quiz.name}
                                </h4>
                                <Badge variant="outline" className="mb-2">{quiz.theme}</Badge>
                                <p className="text-sm text-muted-foreground">
                                  {quiz.description}
                                </p>
                              </div>
                            </div>
                            <Button asChild className="w-full">
                              <a href={`/quiz/${quiz.id}`}>
                                Jogar Agora
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </div>

              {/* Features Section - Inside Left Column */}
              {establishment.features && establishment.features.length > 0 && (
                <div>
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                      </div>
                      Comodidades
                    </h3>
                    <p className="text-sm text-muted-foreground">O que oferecemos para você</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {establishment.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/5 to-transparent hover:from-primary/10 hover:to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-300 hover:scale-105 cursor-default group animate-in fade-in zoom-in-95 duration-500"
                        style={{ animationDelay: `${500 + index * 50}ms` }}
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-all duration-300 flex-shrink-0">
                          {getFeatureIcon(feature)}
                        </div>
                        <span className="text-xs font-medium leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <Card className="w-full md:w-80 bg-gradient-to-br from-primary/5 via-background to-background border-2 border-primary/20 shadow-xl hover:shadow-2xl hover:border-primary/40 transition-all duration-300 animate-in fade-in slide-in-from-right-4 duration-700" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  Informações de Contato
                </CardTitle>
                <p className="text-sm text-muted-foreground">Entre em contato ou visite-nos</p>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* CTA Button - Destaque Principal */}
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold text-base animate-in fade-in zoom-in-95 duration-500"
                  asChild
                  style={{ animationDelay: '400ms' }}
                >
                  <a
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(establishment.address.street + ', ' + establishment.address.city)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <MapPin className="w-5 h-5" />
                    Como Chegar
                  </a>
                </Button>

                {/* Divider */}
                <div className="border-t border-primary/10 animate-in fade-in duration-300" style={{ animationDelay: '500ms' }} />

                <div className="flex items-start gap-3 group cursor-default hover:bg-primary/5 p-3 rounded-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '550ms' }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <MapPin className="w-5 h-5 text-primary group-hover:animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">Endereço</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {establishment.address.street}<br />
                      {establishment.address.neighborhood}, {establishment.address.city} - {establishment.address.state}<br />
                      CEP: {establishment.address.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 group cursor-default hover:bg-primary/5 p-3 rounded-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '600ms' }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Clock className="w-5 h-5 text-primary group-hover:animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">Horário de funcionamento</p>
                    <p className="text-sm text-muted-foreground">{establishment.workingHours}</p>
                    {establishment.isOpenNow && (
                      <Badge variant="default" className="mt-2 bg-green-500 hover:bg-green-600">
                        <span className="inline-block w-2 h-2 bg-white rounded-full mr-1.5 animate-pulse" />
                        Aberto agora
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 group cursor-default hover:bg-primary/5 p-3 rounded-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '650ms' }}>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                    <Phone className="w-5 h-5 text-primary group-hover:animate-pulse" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm mb-1">Telefone</p>
                    <a
                      href={`tel:${establishment.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {establishment.phone}
                    </a>
                  </div>
                </div>

                {establishment.email && (
                  <div className="flex items-start gap-3 group cursor-default hover:bg-primary/5 p-3 rounded-lg transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: '700ms' }}>
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <Mail className="w-5 h-5 text-primary group-hover:animate-pulse" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm mb-1">E-mail</p>
                      <a
                        href={`mailto:${establishment.email}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                      >
                        {establishment.email}
                      </a>
                    </div>
                  </div>
                )}

                {establishment.socials.length > 0 && (
                  <div className="pt-3 animate-in fade-in duration-500" style={{ animationDelay: '750ms' }}>
                    <div className="border-t border-primary/10 mb-5" />
                    <p className="font-semibold text-sm mb-3 px-3">Redes Sociais</p>
                    <div className="flex flex-wrap gap-2">
                      {establishment.socials.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                          className={`transition-all duration-300 hover:scale-110 hover:shadow-lg border-2 animate-in fade-in zoom-in-95 ${getSocialColors(social.type)}`}
                          style={{ animationDelay: `${800 + index * 50}ms` }}
                        >
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2"
                          >
                            {getSocialIcon(social.type)}
                            <span className="font-medium">{social.type}</span>
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

        {/* Photo Gallery Section */}
        {establishment.photoGallery && establishment.photoGallery.length > 0 && (
          <section className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '500ms' }}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-primary" />
                </div>
                Galeria de Fotos
              </h2>
              <p className="text-muted-foreground">Conheça o ambiente antes de visitar</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {establishment.photoGallery.map((photo, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer animate-in fade-in zoom-in-95 duration-500"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <img
                    src={photo}
                    alt={`${establishment.name} - Foto ${index + 1}`}
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </section>
        )}
    </Layout>
  );
};

export default EstablishmentDetails;