import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import {
  ArrowLeft,
  FileQuestion,
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { themes } from '@/data/quizData';
import { establishments } from '@/data/establishmentsData';

interface CustomQuiz {
  id: string;
  nome: string;
  descricao: string;
  establishmentId?: string;
  themeId?: string;
  externalUrl: string;
  createdAt: string;
  createdBy?: string;
}

const QuizManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<CustomQuiz[]>([]);
  const [filteredQuizzes, setFilteredQuizzes] = useState<CustomQuiz[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [quizToDelete, setQuizToDelete] = useState<CustomQuiz | null>(null);

  // Carregar quizzes do localStorage
  useEffect(() => {
    loadQuizzes();
  }, []);

  // Filtrar quizzes baseado no termo de busca
  useEffect(() => {
    if (!searchTerm) {
      setFilteredQuizzes(quizzes);
    } else {
      const filtered = quizzes.filter(
        (quiz) =>
          quiz.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
          quiz.descricao.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredQuizzes(filtered);
    }
  }, [searchTerm, quizzes]);

  const loadQuizzes = () => {
    const stored = localStorage.getItem('customQuizzes');
    if (stored) {
      const parsedQuizzes = JSON.parse(stored);
      setQuizzes(parsedQuizzes);
      setFilteredQuizzes(parsedQuizzes);
    }
  };

  const handleDelete = (quiz: CustomQuiz) => {
    setQuizToDelete(quiz);
  };

  const confirmDelete = () => {
    if (!quizToDelete) return;

    // Remover do localStorage de quizzes customizados
    const updatedQuizzes = quizzes.filter((q) => q.id !== quizToDelete.id);
    localStorage.setItem('customQuizzes', JSON.stringify(updatedQuizzes));

    // Remover também do localStorage de quizzes dos estabelecimentos
    const establishmentQuizzes = JSON.parse(
      localStorage.getItem('establishmentQuizzes') || '{}'
    );

    if (quizToDelete.establishmentId && establishmentQuizzes[quizToDelete.establishmentId]) {
      establishmentQuizzes[quizToDelete.establishmentId] = establishmentQuizzes[
        quizToDelete.establishmentId
      ].filter((q: any) => q.id !== quizToDelete.id);
      localStorage.setItem(
        'establishmentQuizzes',
        JSON.stringify(establishmentQuizzes)
      );
    }

    toast({
      title: 'Quiz excluído!',
      description: `${quizToDelete.nome} foi removido com sucesso.`,
    });

    setQuizzes(updatedQuizzes);
    setQuizToDelete(null);
  };

  const getThemeName = (themeId?: string) => {
    if (!themeId) return 'Sem tema';
    const theme = themes.find((t) => t.id === themeId);
    return theme ? `${theme.icon} ${theme.nome}` : 'Tema desconhecido';
  };

  const getEstablishmentName = (establishmentId?: string) => {
    if (!establishmentId) return 'Sem estabelecimento';
    const establishment = establishments.find((e) => e.id === establishmentId);
    return establishment ? establishment.name : 'Estabelecimento desconhecido';
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          {/* Back Button */}
          <div style={{ marginBottom: '2rem' }}>
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="text-slate-700 hover:text-white hover:bg-orange-500 border-slate-300"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Admin
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileQuestion size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Gerenciar Quizzes
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {quizzes.length} {quizzes.length === 1 ? 'quiz cadastrado' : 'quizzes cadastrados'}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => navigate('/admin/quizzes/novo')}
                className="bg-primary hover:bg-primary/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Quiz
              </Button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar quizzes por nome ou descrição..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quizzes Grid */}
          {filteredQuizzes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-dashed">
                <CardContent className="p-12 text-center">
                  <FileQuestion size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {searchTerm ? 'Nenhum quiz encontrado' : 'Nenhum quiz cadastrado'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {searchTerm
                      ? 'Tente buscar com outros termos'
                      : 'Comece criando seu primeiro quiz'}
                  </p>
                  {!searchTerm && (
                    <Button
                      onClick={() => navigate('/admin/quizzes/novo')}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Quiz
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="border hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1 min-w-0 pr-4">
                          <h3 className="font-semibold text-foreground text-lg mb-1 truncate">
                            {quiz.nome}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {quiz.descricao}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-2">Tema:</span>
                          <span className="text-foreground font-medium">
                            {getThemeName(quiz.themeId)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-2">Estabelecimento:</span>
                          <span className="text-foreground font-medium truncate">
                            {getEstablishmentName(quiz.establishmentId)}
                          </span>
                        </div>
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-2">Criado em:</span>
                          <span className="text-foreground">
                            {new Date(quiz.createdAt).toLocaleDateString('pt-BR')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigate(`/admin/quizzes/${quiz.id}/editar`)
                          }
                          className="flex-1"
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(quiz.externalUrl, '_blank')}
                          className="flex-1"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Abrir
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(quiz)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!quizToDelete} onOpenChange={() => setQuizToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o quiz "{quizToDelete?.nome}"? Esta ação não pode
              ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default QuizManagement;
