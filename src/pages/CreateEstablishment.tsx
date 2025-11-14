import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/Layout';
import { ArrowLeft, Upload, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CreateEstablishment = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    responsibleName: '',
    logo: null as File | null,
    type: '',
    briefDescription: '',
    fullDescription: '',
    openingHours: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    email: '',
    customUrl: '',
    instagram: '',
    facebook: '',
    whatsapp: '',
    internalNotes: '',
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, logo: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Criar objeto do estabelecimento
    const newEstablishment = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.briefDescription,
      address: `${formData.street}, ${formData.number} - ${formData.neighborhood}`,
      city: formData.city,
      state: formData.state,
      phone: formData.phone,
      type: formData.type,
      fullDescription: formData.fullDescription,
      openingHours: formData.openingHours,
      responsibleName: formData.responsibleName,
      email: formData.email,
      customUrl: formData.customUrl,
      instagram: formData.instagram,
      facebook: formData.facebook,
      whatsapp: formData.whatsapp,
      zipCode: formData.zipCode,
      internalNotes: formData.internalNotes,
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
    localStorage.setItem('customEstablishments', JSON.stringify(existingEstablishments));

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
              className="text-slate-700 hover:text-white hover:bg-orange-500 border-slate-300"
            >
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
                transition={{ delay: 0.1 }}
              >
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
                            Nome do Estabelecimento <span className="text-destructive">*</span>
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

                        <div className="space-y-2">
                          <Label htmlFor="responsibleName">
                            Nome do Responsável <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="responsibleName"
                            name="responsibleName"
                            placeholder="Ex: João Silva"
                            value={formData.responsibleName}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="logo">Foto/Logo do Estabelecimento</Label>
                        <div className="flex items-center gap-4">
                          <label
                            htmlFor="logo"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-background"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="text-sm text-muted-foreground mb-2">
                                {formData.logo ? formData.logo.name : 'PNG, JPG até 10MB'}
                              </p>
                              <span className="text-xs text-primary font-medium">
                                Escolher Arquivo
                              </span>
                            </div>
                            <input
                              id="logo"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </label>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="type">
                          Tipo de Estabelecimento <span className="text-destructive">*</span>
                        </Label>
                        <Select onValueChange={handleSelectChange} required>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o tipo" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bar">Bar</SelectItem>
                            <SelectItem value="pub">Pub</SelectItem>
                            <SelectItem value="restaurant">Restaurante</SelectItem>
                            <SelectItem value="cafe">Café</SelectItem>
                            <SelectItem value="brewery">Cervejaria</SelectItem>
                            <SelectItem value="other">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Descrições */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">Descrições</h2>
                      <p className="text-sm text-muted-foreground">
                        Informações sobre o estabelecimento
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="briefDescription">
                          Descrição Breve <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="briefDescription"
                          name="briefDescription"
                          placeholder="Ex: Pub aconchegante com quiz toda sexta"
                          value={formData.briefDescription}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fullDescription">Descrição Completa</Label>
                        <Textarea
                          id="fullDescription"
                          name="fullDescription"
                          placeholder="Descreva o ambiente, especialidades, diferenciais..."
                          value={formData.fullDescription}
                          onChange={handleInputChange}
                          rows={4}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="openingHours">
                          Horário de Funcionamento <span className="text-destructive">*</span>
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

              {/* Endereço */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">Endereço</h2>
                      <p className="text-sm text-muted-foreground">
                        Localização do estabelecimento
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="street">
                            Rua <span className="text-destructive">*</span>
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

                        <div className="space-y-2">
                          <Label htmlFor="number">
                            Número <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="number"
                            name="number"
                            placeholder="123"
                            value={formData.number}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="neighborhood">
                            Bairro <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="neighborhood"
                            name="neighborhood"
                            placeholder="Ex: Vila Madalena"
                            value={formData.neighborhood}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="city">
                            Cidade <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="Ex: São Paulo"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">
                            Estado <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="state"
                            name="state"
                            placeholder="Ex: SP"
                            value={formData.state}
                            onChange={handleInputChange}
                            maxLength={2}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          placeholder="00000-000"
                          value={formData.zipCode}
                          onChange={handleInputChange}
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
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        Informações de Contato
                      </h2>
                      <p className="text-sm text-muted-foreground">Telefone e redes sociais</p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Telefone <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            placeholder="(11) 99999-9999"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail do Estabelecimento</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="contato@estabelecimento.com"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="customUrl">URL Personalizada</Label>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">quis.com.br/</span>
                          <Input
                            id="customUrl"
                            name="customUrl"
                            placeholder="nome-do-bar"
                            value={formData.customUrl}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="instagram">Instagram</Label>
                          <Input
                            id="instagram"
                            name="instagram"
                            placeholder="@nomeusuario"
                            value={formData.instagram}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="facebook">Facebook</Label>
                          <Input
                            id="facebook"
                            name="facebook"
                            placeholder="facebook.com/usuario"
                            value={formData.facebook}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="whatsapp">WhatsApp</Label>
                          <Input
                            id="whatsapp"
                            name="whatsapp"
                            placeholder="(11) 99999-9999"
                            value={formData.whatsapp}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Observações Internas */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold text-foreground mb-1">
                        Observações Internas
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Notas e anotações para uso interno
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="internalNotes">Observação (opcional)</Label>
                      <Textarea
                        id="internalNotes"
                        name="internalNotes"
                        placeholder="Notas internas, instruções especiais, etc."
                        value={formData.internalNotes}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-end gap-3 pt-4"
              >
                <Button type="button" variant="outline" onClick={handleCancel}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-primary hover:bg-primary/90">
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
