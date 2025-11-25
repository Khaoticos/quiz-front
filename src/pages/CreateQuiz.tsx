import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import {
  ArrowLeft,
  FileQuestion,
  Calendar as CalendarIcon,
  Clock,
  X,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { establishments } from '@/data/establishmentsData';
import { themes } from '@/data/quizData';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { toast } = useToast();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    establishmentId: '',
    themeId: '',
    externalUrl: '',
    activeDates: [] as string[],
    startTime: '',
    endTime: '',
  });
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do quiz se estiver em modo de edição
  useEffect(() => {
    if (isEditMode) {
      const stored = localStorage.getItem('customQuizzes');
      if (stored) {
        const quizzes = JSON.parse(stored);
        const quiz = quizzes.find((q: any) => q.id === id);
        if (quiz) {
          const dates =
            quiz.activeDates?.map((dateStr: string) => new Date(dateStr)) || [];
          setSelectedDates(dates);
          setFormData({
            title: quiz.nome,
            establishmentId: quiz.establishmentId || '',
            themeId: quiz.themeId || '',
            externalUrl: quiz.externalUrl,
            activeDates: quiz.activeDates || [],
            startTime: quiz.startTime || '',
            endTime: quiz.endTime || '',
          });
        } else {
          toast({
            title: 'Quiz não encontrado',
            description: 'O quiz que você tentou editar não existe.',
            variant: 'destructive',
          });
          navigate('/admin/quizzes');
        }
      }
    }
    setLoading(false);
  }, [id, isEditMode, navigate, toast]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    const dateStr = format(date, 'yyyy-MM-dd');
    const isAlreadySelected = formData.activeDates.includes(dateStr);

    if (isAlreadySelected) {
      // Remove a data
      setFormData((prev) => ({
        ...prev,
        activeDates: prev.activeDates.filter((d) => d !== dateStr),
      }));
      setSelectedDates((prev) =>
        prev.filter((d) => format(d, 'yyyy-MM-dd') !== dateStr)
      );
    } else {
      // Adiciona a data
      setFormData((prev) => ({
        ...prev,
        activeDates: [...prev.activeDates, dateStr],
      }));
      setSelectedDates((prev) => [...prev, date]);
    }
  };

  const removeDate = (dateStr: string) => {
    setFormData((prev) => ({
      ...prev,
      activeDates: prev.activeDates.filter((d) => d !== dateStr),
    }));
    setSelectedDates((prev) =>
      prev.filter((d) => format(d, 'yyyy-MM-dd') !== dateStr)
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar URL do LMS
    if (
      !formData.externalUrl.startsWith('http://') &&
      !formData.externalUrl.startsWith('https://')
    ) {
      toast({
        title: 'URL inválida',
        description:
          'Por favor, insira uma URL válida começando com http:// ou https://',
        variant: 'destructive',
      });
      return;
    }

    // Validar datas
    if (formData.activeDates.length === 0) {
      toast({
        title: 'Datas não selecionadas',
        description: 'Por favor, selecione pelo menos uma data para o quiz.',
        variant: 'destructive',
      });
      return;
    }

    // Validar horários
    if (!formData.startTime || !formData.endTime) {
      toast({
        title: 'Horários não preenchidos',
        description:
          'Por favor, preencha o horário de início e término do quiz.',
        variant: 'destructive',
      });
      return;
    }

    // Validar se horário de término é depois do horário de início
    if (formData.startTime >= formData.endTime) {
      toast({
        title: 'Horários inválidos',
        description:
          'O horário de término deve ser posterior ao horário de início.',
        variant: 'destructive',
      });
      return;
    }

    const existingQuizzes = JSON.parse(
      localStorage.getItem('customQuizzes') || '[]'
    );

    if (isEditMode) {
      // Modo de edição - atualizar quiz existente
      const quizIndex = existingQuizzes.findIndex((q: any) => q.id === id);
      if (quizIndex !== -1) {
        const oldEstablishmentId = existingQuizzes[quizIndex].establishmentId;

        existingQuizzes[quizIndex] = {
          ...existingQuizzes[quizIndex],
          nome: formData.title,
          establishmentId: formData.establishmentId,
          themeId: formData.themeId,
          externalUrl: formData.externalUrl,
          activeDates: formData.activeDates,
          startTime: formData.startTime,
          endTime: formData.endTime,
          updatedAt: new Date().toISOString(),
          updatedBy: user?.email,
        };

        localStorage.setItem('customQuizzes', JSON.stringify(existingQuizzes));

        // Atualizar também no estabelecimento
        const establishmentQuizzes = JSON.parse(
          localStorage.getItem('establishmentQuizzes') || '{}'
        );

        // Remover do estabelecimento antigo se mudou
        if (
          oldEstablishmentId &&
          oldEstablishmentId !== formData.establishmentId
        ) {
          if (establishmentQuizzes[oldEstablishmentId]) {
            establishmentQuizzes[oldEstablishmentId] = establishmentQuizzes[
              oldEstablishmentId
            ].filter((q: any) => q.id !== id);
          }
        }

        // Atualizar ou adicionar no novo estabelecimento
        if (!establishmentQuizzes[formData.establishmentId]) {
          establishmentQuizzes[formData.establishmentId] = [];
        }

        const estQuizIndex = establishmentQuizzes[
          formData.establishmentId
        ].findIndex((q: any) => q.id === id);

        const quizData = {
          id: id,
          name: formData.title,
          theme: themes.find((t) => t.id === formData.themeId)?.nome || 'Geral',
          active: true,
        };

        if (estQuizIndex !== -1) {
          establishmentQuizzes[formData.establishmentId][estQuizIndex] =
            quizData;
        } else {
          establishmentQuizzes[formData.establishmentId].push(quizData);
        }

        localStorage.setItem(
          'establishmentQuizzes',
          JSON.stringify(establishmentQuizzes)
        );

        toast({
          title: 'Quiz atualizado!',
          description: `${formData.title} foi atualizado com sucesso.`,
        });

        navigate('/admin/quizzes');
      }
    } else {
      // Modo de criação - criar novo quiz
      const newQuiz = {
        id: Date.now().toString(),
        nome: formData.title,
        establishmentId: formData.establishmentId,
        themeId: formData.themeId,
        externalUrl: formData.externalUrl,
        activeDates: formData.activeDates,
        startTime: formData.startTime,
        endTime: formData.endTime,
        createdAt: new Date().toISOString(),
        createdBy: user?.email,
      };

      existingQuizzes.push(newQuiz);
      localStorage.setItem('customQuizzes', JSON.stringify(existingQuizzes));

      // Também adicionar o quiz ao estabelecimento selecionado
      const establishmentQuizzes = JSON.parse(
        localStorage.getItem('establishmentQuizzes') || '{}'
      );
      if (!establishmentQuizzes[formData.establishmentId]) {
        establishmentQuizzes[formData.establishmentId] = [];
      }
      establishmentQuizzes[formData.establishmentId].push({
        id: newQuiz.id,
        name: formData.title,
        theme: themes.find((t) => t.id === formData.themeId)?.nome || 'Geral',
        active: true,
      });
      localStorage.setItem(
        'establishmentQuizzes',
        JSON.stringify(establishmentQuizzes)
      );

      toast({
        title: 'Quiz cadastrado!',
        description: `${formData.title} foi adicionado com sucesso.`,
      });

      navigate('/admin/quizzes');
    }
  };

  const handleCancel = () => {
    navigate(isEditMode ? '/admin/quizzes' : '/admin');
  };

  // Filtrar apenas estabelecimentos ativos
  const activeEstablishments = establishments.filter((e) => e.active !== false);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Carregando...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-24">
        {/* Form */}
        <div className="container mx-auto px-6 py-8 max-w-3xl">
          {/* Back Button */}
          <div style={{ marginBottom: '2rem' }}>
            <Button
              variant="outline"
              onClick={() => navigate(isEditMode ? '/admin/quizzes' : '/admin')}
              className="text-slate-700 hover:text-white hover:bg-orange-500 border-slate-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {isEditMode
                ? 'Voltar para Gerenciar Quizzes'
                : 'Voltar para Admin'}
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileQuestion size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {isEditMode ? 'Editar Quiz' : 'Cadastrar Quiz'}
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground ml-14">
              {isEditMode
                ? 'Atualize as informações do quiz'
                : 'Adicione um novo quiz ao sistema'}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Informações do Quiz */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        Informações do Quiz
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Dados principais do quiz
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">
                          Título do Quiz{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="title"
                          name="title"
                          placeholder="Ex: Quiz de Conhecimentos Gerais"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="establishmentId">
                          Estabelecimento Vinculado{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          onValueChange={handleSelectChange('establishmentId')}
                          value={formData.establishmentId}
                          required>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um estabelecimento" />
                          </SelectTrigger>
                          <SelectContent>
                            {activeEstablishments.map((establishment) => (
                              <SelectItem
                                key={establishment.id}
                                value={establishment.id}>
                                {establishment.name} - {establishment.type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          O quiz será associado a este estabelecimento
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="themeId">
                          Assunto/Tema{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Select
                          onValueChange={handleSelectChange('themeId')}
                          value={formData.themeId}
                          required>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um tema" />
                          </SelectTrigger>
                          <SelectContent>
                            {themes.map((theme) => (
                              <SelectItem key={theme.id} value={theme.id}>
                                {theme.icon} {theme.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="externalUrl">
                          Link do Quiz{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="externalUrl"
                          name="externalUrl"
                          type="url"
                          placeholder="https://exemplo.com/quiz/12345"
                          value={formData.externalUrl}
                          onChange={handleInputChange}
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          URL completa do quiz na plataforma
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Informação Adicional */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="text-blue-600 dark:text-blue-400 text-xl">
                        ℹ️
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          Quiz Interativo
                        </p>
                        <p className="text-xs text-blue-700 dark:text-blue-300">
                          Este quiz será exibido através de um iframe
                          incorporado. Certifique-se de que o link permite
                          incorporação em outros sites.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90">
                  {isEditMode ? 'Salvar Alterações' : 'Cadastrar Quiz'}
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuiz;
