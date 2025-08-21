export interface Social {
  type: string;
  url: string;
}

export interface EstablishmentQuiz {
  id: string;
  name: string;
  theme: string;
  description: string;
  active: boolean;
}

export interface Address {
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Establishment {
  id: string;
  name: string;
  shortDescription: string;
  extendedDescription: string;
  type: string;
  address: Address;
  phone: string;
  email?: string;
  workingHours: string;
  mainPhoto: string;
  logo: string;
  socials: Social[];
  badges: string[];
  quizzes: EstablishmentQuiz[];
  registrationDate: string;
  popularityRanking: number;
  isOpenNow: boolean;
}

export const establishments: Establishment[] = [
  {
    id: "1",
    name: "Bar do Zé",
    shortDescription: "Pub descontraído com quiz toda sexta!",
    extendedDescription: "Um ambiente acolhedor no coração de Vila Madalena, conhecido pelos seus petiscos artesanais e cervejas especiais. O Bar do Zé é o lugar perfeito para relaxar após o trabalho e testar seus conhecimentos nos nossos quizzes semanais.",
    type: "Bar",
    address: {
      street: "Rua Aspicuelta, 315",
      neighborhood: "Vila Madalena",
      city: "São Paulo",
      state: "SP",
      zipCode: "05433-011"
    },
    phone: "(11) 3815-4444",
    email: "contato@bardoze.com.br",
    workingHours: "Terça a Domingo, das 17h às 01h",
    mainPhoto: "/placeholder-establishment.jpg",
    logo: "/placeholder-logo.jpg",
    socials: [
      { type: "Instagram", url: "https://instagram.com/bardoze" },
      { type: "Facebook", url: "https://facebook.com/bardoze" }
    ],
    badges: ["Novo"],
    quizzes: [
      {
        id: "quiz-bar-ze-1",
        name: "Quiz da Sexta",
        theme: "Cultura Pop",
        description: "Teste seus conhecimentos sobre música, filmes e séries!",
        active: true
      },
      {
        id: "quiz-bar-ze-2",
        name: "Desafio Cervejeiro",
        theme: "Gastronomia & Drinks",
        description: "Tudo sobre cervejas artesanais e petiscos",
        active: true
      }
    ],
    registrationDate: "2024-01-15",
    popularityRanking: 95,
    isOpenNow: true
  },
  {
    id: "2",
    name: "Restaurante Sabor & Arte",
    shortDescription: "Culinária brasileira com quizzes gastronômicos!",
    extendedDescription: "Especializado em pratos da culinária brasileira contemporânea, o Sabor & Arte oferece uma experiência única combinando gastronomia de qualidade com entretenimento inteligente através dos nossos quizzes temáticos.",
    type: "Restaurante",
    address: {
      street: "Av. Paulista, 1578",
      neighborhood: "Bela Vista",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-200"
    },
    phone: "(11) 3251-7890",
    workingHours: "Segunda a Sábado, das 12h às 23h",
    mainPhoto: "/placeholder-establishment.jpg",
    logo: "/placeholder-logo.jpg",
    socials: [
      { type: "Instagram", url: "https://instagram.com/saborarte" }
    ],
    badges: ["Aberto Agora"],
    quizzes: [
      {
        id: "quiz-sabor-arte-1",
        name: "Quiz Gastronômico",
        theme: "Gastronomia & Drinks",
        description: "Descubra curiosidades sobre a culinária brasileira",
        active: true
      }
    ],
    registrationDate: "2024-02-01",
    popularityRanking: 88,
    isOpenNow: true
  },
  {
    id: "3",
    name: "Café Cultural",
    shortDescription: "Café com atmosfera intelectual e quizzes literários",
    extendedDescription: "Um espaço dedicado aos amantes da literatura e do bom café. Com uma seleção especial de livros e cafés especiais, promovemos debates culturais e quizzes que estimulam o conhecimento.",
    type: "Café",
    address: {
      street: "Rua Oscar Freire, 820",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipCode: "01426-001"
    },
    phone: "(11) 3062-5555",
    workingHours: "Segunda a Sexta, das 7h às 22h",
    mainPhoto: "/placeholder-establishment.jpg",
    logo: "/placeholder-logo.jpg",
    socials: [
      { type: "Instagram", url: "https://instagram.com/cafecultural" },
      { type: "Facebook", url: "https://facebook.com/cafecultural" }
    ],
    badges: [],
    quizzes: [],
    registrationDate: "2024-01-20",
    popularityRanking: 72,
    isOpenNow: false
  },
  {
    id: "4",
    name: "Pub Inglês",
    shortDescription: "Ambiente britânico autêntico com quiz night!",
    extendedDescription: "Reproduzimos a atmosfera dos tradicionais pubs ingleses com cervejas importadas, fish & chips e nossa famosa quiz night às quintas-feiras. Uma experiência autêntica no coração de São Paulo.",
    type: "Pub",
    address: {
      street: "Rua Augusta, 2690",
      neighborhood: "Jardins",
      city: "São Paulo",
      state: "SP",
      zipCode: "01412-100"
    },
    phone: "(11) 3061-3333",
    workingHours: "Terça a Sábado, das 18h às 02h",
    mainPhoto: "/placeholder-establishment.jpg",
    logo: "/placeholder-logo.jpg",
    socials: [
      { type: "Instagram", url: "https://instagram.com/pubingles" }
    ],
    badges: ["Novo", "Aberto Agora"],
    quizzes: [
      {
        id: "quiz-pub-ingles-1",
        name: "Quiz Night",
        theme: "História",
        description: "Tradição inglesa com perguntas sobre história mundial",
        active: true
      },
      {
        id: "quiz-pub-ingles-2",
        name: "Premier League Quiz",
        theme: "Esportes",
        description: "Tudo sobre futebol inglês e mundial",
        active: true
      }
    ],
    registrationDate: "2024-02-10",
    popularityRanking: 91,
    isOpenNow: true
  }
];

export const establishmentTypes = [
  "Todos",
  "Bar",
  "Restaurante", 
  "Pub",
  "Café",
  "Cervejaria"
];

export const neighborhoods = [
  "Todos",
  "Vila Madalena",
  "Bela Vista",
  "Jardins",
  "Pinheiros",
  "Itaim Bibi",
  "Moema",
  "Vila Olímpia"
];