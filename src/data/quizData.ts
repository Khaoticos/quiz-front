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
  perguntas: Question[];
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
        perguntas: [
          {
            id: "1",
            texto: "Qual série protagonizada por Will Smith fez sucesso nos anos 90?",
            alternativas: [
              { letra: "A", texto: "The Fresh Prince of Bel-Air", correta: true },
              { letra: "B", texto: "Family Matters", correta: false },
              { letra: "C", texto: "Full House", correta: false },
              { letra: "D", texto: "Saved by the Bell", correta: false }
            ],
            tempo: 30
          },
          {
            id: "2",
            texto: "Quem cantava o tema de abertura de 'Friends'?",
            alternativas: [
              { letra: "A", texto: "Alanis Morissette", correta: false },
              { letra: "B", texto: "The Rembrandts", correta: true },
              { letra: "C", texto: "R.E.M.", correta: false },
              { letra: "D", texto: "Counting Crows", correta: false }
            ],
            tempo: 30
          }
        ]
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
        perguntas: [
          {
            id: "1",
            texto: "Em que ano ocorreu a Proclamação da República?",
            alternativas: [
              { letra: "A", texto: "1889", correta: true },
              { letra: "B", texto: "1822", correta: false },
              { letra: "C", texto: "1964", correta: false },
              { letra: "D", texto: "1500", correta: false }
            ],
            tempo: 30
          },
          {
            id: "2",
            texto: "Quem foi o primeiro presidente civil após a ditadura militar?",
            alternativas: [
              { letra: "A", texto: "Juscelino Kubitschek", correta: false },
              { letra: "B", texto: "José Sarney", correta: true },
              { letra: "C", texto: "Fernando Collor", correta: false },
              { letra: "D", texto: "Tancredo Neves", correta: false }
            ],
            tempo: 30
          }
        ]
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
        perguntas: [
          {
            id: "1",
            texto: "Qual filme ganhou o Oscar de Melhor Filme em 2020?",
            alternativas: [
              { letra: "A", texto: "1917", correta: false },
              { letra: "B", texto: "Joker", correta: false },
              { letra: "C", texto: "Parasita", correta: true },
              { letra: "D", texto: "Era Uma Vez em... Hollywood", correta: false }
            ],
            tempo: 30
          }
        ]
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
        perguntas: [
          {
            id: "1",
            texto: "O que significa a sigla CPU em informática?",
            alternativas: [
              { letra: "A", texto: "Control Power Unit", correta: false },
              { letra: "B", texto: "Central Processing Unit", correta: true },
              { letra: "C", texto: "Computer Personal User", correta: false },
              { letra: "D", texto: "Connected Program Unit", correta: false }
            ],
            tempo: 30
          }
        ]
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
        perguntas: [
          {
            id: "1",
            texto: "Caipirinha é tipicamente feita com qual fruta?",
            alternativas: [
              { letra: "A", texto: "Abacaxi", correta: false },
              { letra: "B", texto: "Limão", correta: true },
              { letra: "C", texto: "Morango", correta: false },
              { letra: "D", texto: "Uva", correta: false }
            ],
            tempo: 30
          }
        ]
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