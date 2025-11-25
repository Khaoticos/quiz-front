import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Layout from '@/components/Layout';
import {
  Building2,
  FileQuestion,
  BarChart3,
  Settings,
  Plus,
  List,
} from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPanel = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Mock data
  const stats = {
    activeEstablishments: 24,
    todayQuizzes: 156,
    satisfactionRate: 89,
  };

  const actionCards = [
    {
      title: 'Cadastrar Estabelecimento',
      description: 'Adicione novos estabelecimentos ao sistema',
      icon: Plus,
      iconBg: 'bg-orange-500',
      iconColor: 'text-white',
      onClick: () => navigate('/admin/estabelecimentos/novo'),
    },
    {
      title: 'Cadastrar Quiz',
      description: 'Adicione novos quizzes ao sistema',
      icon: FileQuestion,
      iconBg: 'bg-green-500',
      iconColor: 'text-white',
      onClick: () => navigate('/admin/quizzes/novo'),
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b bg-card">
          <div className="container mx-auto px-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Building2 size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    Painel Administrativo
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    Quis - Sistema de Gestão
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Bem-vindo, {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-16 max-w-5xl">
          {/* Central de Gerenciamento */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-foreground mb-2">
              Central de Gerenciamento
            </h2>
            <p className="text-muted-foreground">
              Gerencie estabelecimentos, visualize estatísticas e configure o
              sistema
            </p>
          </div>

          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {actionCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}>
                  <button
                    className="w-full text-left group"
                    onClick={card.onClick}>
                    <Card className="border hover:shadow-md transition-all cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`p-3 rounded-lg ${card.iconBg} flex-shrink-0`}>
                            <Icon size={24} className={card.iconColor} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                              {card.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-primary mb-1">
                  {stats.activeEstablishments}
                </p>
                <p className="text-sm text-muted-foreground">
                  Estabelecimentos Ativos
                </p>
              </CardContent>
            </Card>

            <Card className="border">
              <CardContent className="p-6 text-center">
                <p className="text-4xl font-bold text-foreground mb-1">
                  {stats.todayQuizzes}
                </p>
                <p className="text-sm text-muted-foreground">
                  Quizzes Cadastrados Hoje
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
