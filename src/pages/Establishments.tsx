import { useState, useMemo } from "react";
import { Search, MapPin, Clock, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { establishments, establishmentTypes, neighborhoods, type Establishment } from "@/data/establishmentsData";

const Establishments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("Todos");
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [sortBy, setSortBy] = useState("name");

  const filteredEstablishments = useMemo(() => {
    let filtered = establishments.filter((establishment) => {
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
  }, [searchTerm, selectedType, selectedNeighborhood, showOpenOnly, sortBy]);

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
      
      {/* Header Section */}
      <main className="pt-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-6">
              Encontre bares e restaurantes parceiros do Quis
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Jogue quizzes, ganhe prêmios e descubra experiências únicas em diversos bairros e regiões!
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gradient-card border rounded-xl p-8 mb-8 shadow-elevated">
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
          {filteredEstablishments.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum estabelecimento encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros ou termos de busca para encontrar estabelecimentos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredEstablishments.map((establishment) => (
                <Card key={establishment.id} className="overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-glow transition-all duration-300 cursor-pointer group hover:scale-105">
                  <div className="aspect-video bg-muted overflow-hidden relative">
                    <img 
                      src={establishment.mainPhoto} 
                      alt={establishment.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder.svg";
                      }}
                    />
                    {establishment.isOpenNow && (
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-green-500 text-white border-0 shadow-sm">
                          Aberto
                        </Badge>
                      </div>
                    )}
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
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Establishments;