import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Layout from '@/components/Layout';
import {
  FileQuestion,
  BarChart3,
  Calendar,
  LogOut,
  TrendingUp,
  Eye,
  Edit,
  Trash2,
  Plus,
  Users,
  Trophy,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

const EstablishmentPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'events' | 'stats'>('overview');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data for establishment
  const stats = {
    totalQuizzes: 12,
    activeQuizzes: 8,
    totalParticipants: 342,
    upcomingEvents: 3,
  };

  const myQuizzes = [
    {
      id: '1',
      title: 'Quiz de Cultura Pop',
      theme: 'Cultura Pop',
      questions: 15,
      participants: 87,
      status: 'active',
      nextDate: '2025-11-15',
    },
    {
      id: '2',
      title: 'Trivia Musical',
      theme: 'Música',
      questions: 20,
      participants: 123,
      status: 'active',
      nextDate: '2025-11-18',
    },
    {
      id: '3',
      title: 'Quiz de Esportes',
      theme: 'Esportes',
      questions: 18,
      participants: 65,
      status: 'draft',
      nextDate: null,
    },
  ];

  const upcomingEvents = [
    {
      id: '1',
      quiz: 'Quiz de Cultura Pop',
      date: '2025-11-15',
      time: '20:00',
      participants: 24,
      maxParticipants: 50,
    },
    {
      id: '2',
      quiz: 'Trivia Musical',
      date: '2025-11-18',
      time: '21:00',
      participants: 18,
      maxParticipants: 40,
    },
    {
      id: '3',
      quiz: 'Quiz Temático: Anos 90',
      date: '2025-11-22',
      time: '20:30',
      participants: 12,
      maxParticipants: 30,
    },
  ];

  const topParticipants = [
    { id: '1', name: 'João Silva', score: 850, quizzes: 12 },
    { id: '2', name: 'Maria Santos', score: 780, quizzes: 10 },
    { id: '3', name: 'Pedro Costa', score: 720, quizzes: 8 },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Painel do Estabelecimento</h1>
                <p className="text-sm text-muted-foreground mt-1">Bem-vindo, {user?.name}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
              >
                <LogOut size={16} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <FileQuestion size={22} className="text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      {stats.activeQuizzes} ativos
                    </Badge>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm text-muted-foreground">Meus Quizzes</p>
                    <p className="text-2xl font-semibold tracking-tight">{stats.totalQuizzes}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <Users size={22} className="text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      <TrendingUp size={12} className="mr-1" />
                      +18%
                    </Badge>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm text-muted-foreground">Participantes</p>
                    <p className="text-2xl font-semibold tracking-tight">{stats.totalParticipants}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <Calendar size={22} className="text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      Este mês
                    </Badge>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm text-muted-foreground">Próximos Eventos</p>
                    <p className="text-2xl font-semibold tracking-tight">{stats.upcomingEvents}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <BarChart3 size={22} className="text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs font-medium">
                      <TrendingUp size={12} className="mr-1" />
                      +5%
                    </Badge>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm text-muted-foreground">Taxa de Engajamento</p>
                    <p className="text-2xl font-semibold tracking-tight">87%</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
              { id: 'quizzes', label: 'Meus Quizzes', icon: FileQuestion },
              { id: 'events', label: 'Eventos', icon: Calendar },
              { id: 'stats', label: 'Estatísticas', icon: Trophy },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'default' : 'outline'}
                  onClick={() => setActiveTab(tab.id as any)}
                  className="min-w-fit"
                >
                  <Icon size={16} className="mr-2" />
                  {tab.label}
                </Button>
              );
            })}
          </div>

          {/* Content based on active tab */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* My Quizzes */}
            {(activeTab === 'overview' || activeTab === 'quizzes') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className={activeTab === 'quizzes' ? 'lg:col-span-2' : ''}
              >
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Meus Quizzes</CardTitle>
                        <CardDescription>Gerenciar quizzes do estabelecimento</CardDescription>
                      </div>
                      <Button size="sm">
                        <Plus size={16} className="mr-2" />
                        Novo Quiz
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {myQuizzes.map((quiz) => (
                        <div
                          key={quiz.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer group"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium truncate">{quiz.title}</p>
                              <Badge variant={quiz.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                                {quiz.status === 'active' ? 'Ativo' : 'Rascunho'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{quiz.theme}</p>
                            <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                              <span>{quiz.questions} perguntas</span>
                              <span>{quiz.participants} participantes</span>
                              {quiz.nextDate && (
                                <span className="flex items-center gap-1">
                                  <Clock size={12} />
                                  {quiz.nextDate}
                                </span>
                              )}
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Upcoming Events */}
            {(activeTab === 'overview' || activeTab === 'events') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={activeTab === 'events' ? 'lg:col-span-2' : ''}
              >
                <Card className="shadow-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Próximos Eventos</CardTitle>
                        <CardDescription>Eventos agendados de quiz</CardDescription>
                      </div>
                      <Button size="sm" variant="outline">
                        <Plus size={16} className="mr-2" />
                        Agendar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/50 transition-colors cursor-pointer group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate mb-2">{event.quiz}</p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar size={12} />
                                {event.date}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={12} />
                                {event.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users size={12} />
                                {event.participants}/{event.maxParticipants}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Eye size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Top Participants */}
            {(activeTab === 'overview' || activeTab === 'stats') && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className={activeTab === 'stats' ? 'lg:col-span-2' : 'lg:col-span-2'}
              >
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle>Top Participantes</CardTitle>
                    <CardDescription>Jogadores com melhor desempenho</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topParticipants.map((participant, index) => (
                        <div
                          key={participant.id}
                          className="flex items-center gap-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-lg">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{participant.name}</p>
                            <p className="text-xs text-muted-foreground">{participant.quizzes} quizzes</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-lg text-primary">{participant.score}</p>
                            <p className="text-xs text-muted-foreground">pontos</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EstablishmentPanel;
