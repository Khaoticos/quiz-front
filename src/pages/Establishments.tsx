import { useState, useMemo, useEffect } from "react";
import { Search, MapPin, Clock, Filter, ImageOff } from "lucide-react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { establishments, establishmentTypes, neighborhoods, type Establishment } from "@/data/establishmentsData";

const Establishments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Todos");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [isLoading, setIsLoading] = useState(true);
  const [customEstablishments, setCustomEstablishments] = useState<any[]>([]);

  useEffect(() => {
    // Load custom establishments from localStorage
    const loadCustomEstablishments = () => {
      const stored = localStorage.getItem('customEstablishments');
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert custom establishments to match the expected format
        const converted = parsed.map((est: any) => ({
          id: est.id,
          name: est.name,
          type: est.type || 'Bar',
          shortDescription: est.description,
          extendedDescription: est.fullDescription || est.description,
          mainPhoto: est.image || '/placeholder.svg',
          logo: est.image || '/placeholder.svg',
          address: {
            street: est.address.split(',')[0] || est.address,
            neighborhood: est.address.split('-')[1]?.trim() || 'Centro',
            city: est.city,
            state: est.state,
            zipCode: est.zipCode || '00000-000',
          },
          phone: est.phone,
          email: est.email || '',
          workingHours: est.openingHours || 'Não informado',
          socials: [
            est.instagram && { type: 'instagram', url: est.instagram },
            est.facebook && { type: 'facebook', url: est.facebook },
            est.whatsapp && { type: 'whatsapp', url: est.whatsapp },
          ].filter(Boolean),
          badges: [],
          isOpenNow: true,
          rating: est.rating || 0,
          popularityRanking: 0,
          quizzes: est.quizzes || [],
          registrationDate: est.createdAt,
          createdAt: est.createdAt,
        }));
        setCustomEstablishments(converted);
      }
    };

    loadCustomEstablishments();
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredEstablishments = useMemo(() => {
    // Combine mock data with custom establishments
    const allEstablishments = [...establishments, ...customEstablishments];

    let filtered = allEstablishments.filter((establishment) => {
      const matchesSearch = establishment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          establishment.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === "Todos" || establishment.type === selectedType;
      const matchesNeighborhood = selectedNeighborhood === "Todos" || 
                                establishment.address.neighborhood === selectedNeighborhood;
      const matchesOpenStatus = !showOpenOnly || establishment.isOpenNow;

      return matchesSearch && matchesType && matchesNeighborhood && matchesOpenStatus;
    });

    // Sort establishments
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularityRanking - a.popularityRanking;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedNeighborhood, showOpenOnly, sortBy, customEstablishments]);

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
    <Layout className="min-h-screen bg-background" contentClassName="pt-20">
      {/* Header Section */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Encontre bares e restaurantes parceiros do Quis
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Jogue quizzes, ganhe prêmios e descubra experiências únicas em diversos bairros e regiões!
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white border rounded-xl p-8 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Procurar por nome, bairro ou tipo de local..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>
              
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Tipo de estabelecimento" />
                </SelectTrigger>
                <SelectContent>
                  {establishmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedNeighborhood} onValueChange={setSelectedNeighborhood}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Bairro" />
                </SelectTrigger>
                <SelectContent>
                  {neighborhoods.map((neighborhood) => (
                    <SelectItem key={neighborhood} value={neighborhood}>
                      {neighborhood}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Alfabético</SelectItem>
                  <SelectItem value="popularity">Mais populares</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="openOnly"
                checked={showOpenOnly}
                onChange={(e) => setShowOpenOnly(e.target.checked)}
                className="rounded border-border"
              />
              <label htmlFor="openOnly" className="text-sm font-medium">
                Apenas estabelecimentos abertos agora
              </label>
            </div>
          </div>

          {/* Results */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              {filteredEstablishments.length} estabelecimento(s) encontrado(s)
            </p>
          </div>

          {/* Establishments Grid */}
          {isLoading ? (
            // Skeleton loaders
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <Skeleton className="aspect-video w-full" />
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex gap-2 mb-6">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredEstablishments.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum estabelecimento encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou termos de busca para encontrar estabelecimentos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredEstablishments.map((establishment) => {
                const EstablishmentCard = () => {
                  const [imageLoading, setImageLoading] = useState(true);
                  const [imageError, setImageError] = useState(false);

                  return (
                    <Card className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group hover:scale-105">
                      <div className="aspect-video bg-muted overflow-hidden relative">
                        {imageLoading && !imageError && (
                          <Skeleton className="absolute inset-0 w-full h-full" />
                        )}
                        {imageError ? (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            <div className="text-center text-muted-foreground">
                              <ImageOff className="mx-auto h-12 w-12 mb-2" />
                              <p className="text-xs">Imagem não disponível</p>
                            </div>
                          </div>
                        ) : (
                          <img
                            src={establishment.mainPhoto}
                            alt={`Foto do estabelecimento ${establishment.name} em ${establishment.address.neighborhood}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            onLoad={() => setImageLoading(false)}
                            onError={() => {
                              setImageLoading(false);
                              setImageError(true);
                            }}
                          />
                        )}
                        <div className="absolute top-3 right-3 flex gap-2">
                          {establishment.isOpenNow && (
                            <Badge className="bg-success text-success-foreground border-0 shadow-sm">
                              Aberto
                            </Badge>
                          )}
                          {establishment.createdAt && (() => {
                            const createdDate = new Date(establishment.createdAt);
                            const daysDiff = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
                            return daysDiff <= 7 ? (
                              <Badge className="bg-primary text-primary-foreground border-0 shadow-sm">
                                Novo
                              </Badge>
                            ) : null;
                          })()}
                        </div>
                      </div>
                  
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <CardTitle className="text-xl font-bold line-clamp-1 text-foreground">{establishment.name}</CardTitle>
                      <Badge variant="secondary" className="text-xs font-medium">
                        {establishment.type}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {establishment.shortDescription}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4 mr-2 text-primary" />
                      <span className="line-clamp-1 font-medium">
                        {establishment.address.neighborhood}, {establishment.address.city}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {establishment.badges.filter(badge => badge !== "Aberto Agora").map((badge) => (
                        <Badge key={badge} variant={getBadgeVariant(badge)} className="text-xs font-medium">
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      asChild
                      className="w-full font-medium"
                      variant="default"
                    >
                      <a href={`/estabelecimentos/${establishment.id}`}>
                        Ver detalhes
                      </a>
                    </Button>
                  </CardContent>
                </Card>
                  );
                };

                return <EstablishmentCard key={establishment.id} />;
              })}
            </div>
          )}
        </section>
    </Layout>
  );
};

export default Establishments;