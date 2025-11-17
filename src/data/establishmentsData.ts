export interface EstablishmentQuiz {
  id: string;
  name: string;
  theme: string;
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
  type: string;
  address: Address;
  phone: string;
  email?: string;
  workingHours: string;
  mainPhoto: string;
  logo: string;
  badges: string[];
  quizzes: EstablishmentQuiz[];
  registrationDate: string;
  popularityRanking: number;
  isOpenNow: boolean;
  highlights?: string[];
  createdAt?: string;
  responsible?: string;
  active?: boolean;
}

export const establishments: Establishment[] = [
  {
    id: "1",
    name: "Bar do Zé",
    shortDescription: "Pub descontraído com quiz toda sexta!",
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
    mainPhoto: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    logo: "/placeholder-logo.jpg",
    badges: ["Novo"],
    quizzes: [
      {
        id: "quiz-bar-ze-1",
        name: "Quiz da Sexta",
        theme: "Cultura Pop",
        active: true
      },
      {
        id: "quiz-bar-ze-2",
        name: "Desafio Cervejeiro",
        theme: "Gastronomia & Drinks",
        active: true
      }
    ],
    registrationDate: "2024-01-14",
    popularityRanking: 95,
    isOpenNow: true,
    responsible: "José Silva",
    active: true,
    highlights: [
      "Quiz Night todas as sextas às 20h",
      "Happy Hour: 17h às 19h com 30% off",
      "Mais de 50 rótulos de cervejas artesanais",
      "Petiscos premiados"
    ]
  },
  {
    id: "2",
    name: "Restaurante Sabor & Arte",
    shortDescription: "Culinária brasileira com quizzes gastronômicos!",
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
    mainPhoto: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop",
    logo: "/placeholder-logo.jpg",
    badges: ["Aberto Agora"],
    quizzes: [
      {
        id: "quiz-sabor-arte-1",
        name: "Quiz Gastronômico",
        theme: "Gastronomia & Drinks",
        active: true
      }
    ],
    registrationDate: "2024-01-31",
    popularityRanking: 88,
    isOpenNow: true,
    responsible: "Maria Santos",
    active: true,
    highlights: [
      "Chef premiado pela Veja SP",
      "Menu degustação disponível",
      "Ingredientes orgânicos e locais",
      "Carta de vinhos selecionados"
    ]
  },
  {
    id: "3",
    name: "Café Cultural",
    shortDescription: "Café com atmosfera intelectual e quizzes literários",
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
    mainPhoto: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop",
    logo: "/placeholder-logo.jpg",
    badges: [],
    quizzes: [],
    registrationDate: "2024-01-19",
    popularityRanking: 72,
    isOpenNow: false,
    responsible: "Ana Costa",
    active: false,
    highlights: [
      "Café especial de origem única",
      "Saraus mensais",
      "Clube de leitura toda segunda",
      "Doces artesanais"
    ]
  },
  {
    id: "4",
    name: "Pub Inglês",
    shortDescription: "Ambiente britânico autêntico com quiz night!",
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
    mainPhoto: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop",
    logo: "/placeholder-logo.jpg",
    badges: ["Novo", "Aberto Agora"],
    quizzes: [
      {
        id: "quiz-pub-ingles-1",
        name: "Quiz Night",
        theme: "História",
        active: true
      },
      {
        id: "quiz-pub-ingles-2",
        name: "Premier League Quiz",
        theme: "Esportes",
        active: true
      }
    ],
    registrationDate: "2024-02-09",
    popularityRanking: 91,
    isOpenNow: true,
    responsible: "Carlos Lima",
    active: true,
    highlights: [
      "Quiz Night toda quinta às 20h",
      "Chopp Guinness autêntico",
      "Fish & Chips tradicional",
      "Ambiente londrino autêntico"
    ]
  }
];

export const establishmentTypes = [
  "Todos",
  "Bar",
  "Restaurante",
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