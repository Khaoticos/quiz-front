export interface Question {
  id: string;
  texto: string;
  alternativas: {
    letra: "A" | "B" | "C" | "D";
    texto: string;
    correta: boolean;
  }[];
  tempo: number;
}

export interface Quiz {
  id: string;
  nome: string;
  descricao: string;
  externalUrl: string; // URL do LMS (obrigatório - todos os quizzes são externos)
  establishmentId?: string; // ID do estabelecimento vinculado
  themeId?: string; // ID do tema/assunto
  activeDates?: string[]; // Datas específicas que o quiz estará ativo (formato ISO: YYYY-MM-DD)
  startTime?: string; // Horário de início (formato HH:mm)
  endTime?: string; // Horário de término (formato HH:mm)
}

export interface Theme {
  id: string;
  nome: string;
  descricao: string;
  icon: string;
  quizzes: Quiz[];
}

export interface UserResult {
  quizId: string;
  acertos: number;
  tempo: number;
  data: Date;
}

export interface RankingEntry {
  nome: string;
  acertos: number;
  tempo: number;
  posicao: number;
}

// Mock data for themes and quizzes
export const themes: Theme[] = [
  {
    id: "cultura-pop",
    nome: "Cultura Pop",
    descricao: "Música, séries, celebridades e tendências do momento",
    icon: "🎭",
    quizzes: [
      {
        id: "series-anos-90",
        nome: "Séries dos Anos 90",
        descricao: "Teste seus conhecimentos sobre as séries que marcaram os anos 90",
        externalUrl: "https://www-quis-net-br.filesusr.com/html/f2916f_53d7a611bb91492c8ff7422a578bab89.html",
        establishmentId: "1" // Bar do Zé
      }
    ]
  },
  {
    id: "historia-brasil",
    nome: "História do Brasil",
    descricao: "Fatos marcantes e curiosidades da nossa história",
    icon: "🇧🇷",
    quizzes: [
      {
        id: "brasil-imperio",
        nome: "Brasil Império",
        descricao: "Período imperial brasileiro e seus principais eventos",
        externalUrl: "https://www-quis-net-br.filesusr.com/html/f2916f_53d7a611bb91492c8ff7422a578bab89.html",
        establishmentId: "4" // Pub Inglês
      }
    ]
  },
  {
    id: "filmes-cinema",
    nome: "Filmes & Cinema",
    descricao: "Grandes sucessos do cinema nacional e internacional",
    icon: "🎬",
    quizzes: [
      {
        id: "oscar-winners",
        nome: "Vencedores do Oscar",
        descricao: "Filmes e artistas premiados na maior premiação do cinema",
        externalUrl: "https://www-quis-net-br.filesusr.com/html/f2916f_53d7a611bb91492c8ff7422a578bab89.html",
        establishmentId: "4" // Pub Inglês
      }
    ]
  },
  {
    id: "esportes",
    nome: "Esportes & Olimpíadas",
    descricao: "Modalidades esportivas e grandes competições mundiais",
    icon: "⚽",
    quizzes: []
  },
  {
    id: "curiosidades",
    nome: "Curiosidades Gerais",
    descricao: "Fatos interessantes e conhecimentos diversos",
    icon: "🤔",
    quizzes: []
  },
  {
    id: "ciencia-tech",
    nome: "Ciência & Tecnologia",
    descricao: "Descobertas científicas e inovações tecnológicas",
    icon: "🔬",
    quizzes: [
      {
        id: "tech-basics",
        nome: "Tecnologia Básica",
        descricao: "Conceitos fundamentais de tecnologia e computação",
        externalUrl: "https://www-quis-net-br.filesusr.com/html/f2916f_53d7a611bb91492c8ff7422a578bab89.html",
        establishmentId: "1" // Bar do Zé
      }
    ]
  },
  {
    id: "games",
    nome: "Games & Nerdices",
    descricao: "Videogames, cultura nerd e entretenimento digital",
    icon: "🎮",
    quizzes: []
  },
  {
    id: "gastronomia",
    nome: "Gastronomia & Drinks",
    descricao: "Culinária nacional e internacional, bebidas e receitas",
    icon: "🍽️",
    quizzes: [
      {
        id: "drinks-brasileiros",
        nome: "Drinks Brasileiros",
        descricao: "Coquetéis e bebidas típicas do Brasil",
        externalUrl: "https://www-quis-net-br.filesusr.com/html/f2916f_53d7a611bb91492c8ff7422a578bab89.html",
        establishmentId: "2" // Restaurante Sabor & Arte
      }
    ]
  }
];

// Mock ranking data
export const mockRanking: RankingEntry[] = [
  { nome: "João Silva", acertos: 18, tempo: 480, posicao: 1 },
  { nome: "Maria Santos", acertos: 17, tempo: 520, posicao: 2 },
  { nome: "Pedro Lima", acertos: 16, tempo: 490, posicao: 3 },
  { nome: "Ana Costa", acertos: 16, tempo: 510, posicao: 4 },
  { nome: "Carlos Pereira", acertos: 15, tempo: 460, posicao: 5 },
  { nome: "Julia Oliveira", acertos: 15, tempo: 530, posicao: 6 },
  { nome: "Rafael Souza", acertos: 14, tempo: 440, posicao: 7 },
  { nome: "Fernanda Reis", acertos: 14, tempo: 480, posicao: 8 },
  { nome: "Lucas Almeida", acertos: 13, tempo: 420, posicao: 9 },
  { nome: "Bruna Carvalho", acertos: 13, tempo: 460, posicao: 10 }
];