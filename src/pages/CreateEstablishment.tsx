import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ArrowLeft, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateEstablishment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    type: '',
    openingHours: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    instagram: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Criar objeto do estabelecimento
    const newEstablishment = {
      id: Date.now().toString(),
      name: formData.name,
      address: `${formData.street}, ${formData.number} - ${formData.neighborhood}`,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
      type: formData.type,
      openingHours: formData.openingHours,
      responsibleName: formData.responsibleName,
      instagram: formData.instagram,
      zipCode: formData.zipCode,
      image: '/placeholder.svg',
      rating: 0,
      quizzes: [],
      createdAt: new Date().toISOString(),
    };

    // Salvar no localStorage
    const existingEstablishments = JSON.parse(
      localStorage.getItem('customEstablishments') || '[]'
    );
    existingEstablishments.push(newEstablishment);
    localStorage.setItem(
      'customEstablishments',
      JSON.stringify(existingEstablishments)
    );

    toast({
      title: 'Estabelecimento cadastrado!',
      description: `${formData.name} foi adicionado com sucesso.`,
    });

    navigate('/estabelecimentos');
  };

  const handleCancel = () => {
    navigate('/admin');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-24">
        {/* Form */}
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Back Button */}
          <div style={{ marginBottom: '2rem' }}>
            <Button
              variant="outline"
              onClick={() => navigate('/admin')}
              className="text-slate-700 hover:text-white hover:bg-orange-500 border-slate-300">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Admin
            </Button>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Cadastrar Estabelecimento
                </h1>
              </div>
            </div>
            <p className="text-muted-foreground ml-14">
              Adicione um novo estabelecimento ao sistema
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="space-y-8">
              {/* Informações Básicas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        Informações Básicas
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Dados principais do estabelecimento
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            Nome do Estabelecimento{' '}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Ex: Bar do João"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Endereço e Horários */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        Endereço e Horários
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Localização e horário de funcionamento
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="street">
                            Endereço <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="street"
                            name="street"
                            placeholder="Ex: Rua das Flores"
                            value={formData.street}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="openingHours">
                          Horário de Funcionamento{' '}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="openingHours"
                          name="openingHours"
                          placeholder="Ex: Segunda a Sexta, das 18h às 02h"
                          value={formData.openingHours}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Informações de Contato */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        Informações de Contato
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Telefone e e-mail
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="instagram">
                            Instagram do Estabelecimento
                          </Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            type="text"
                            placeholder="https://www.instagram.com/"
                            value={formData.instagram}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90">
                  Cadastrar Estabelecimento
                </Button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEstablishment;
