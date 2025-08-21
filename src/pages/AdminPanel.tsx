import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Plus, Building, Search, Edit, Trash2 } from 'lucide-react';

interface Estabelecimento {
  id: string;
  nome_local: string;
  nome_responsavel: string;
  email_contato: string;
  tipo_local: string;
  endereco: any;
  status: string;
  created_at: string;
}

const AdminPanel = () => {
  const { profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listar');
  const [estabelecimentos, setEstabelecimentos] = useState<Estabelecimento[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingData, setLoadingData] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    nome_local: '',
    nome_responsavel: '',
    descricao_breve: '',
    descricao_completa: '',
    tipo_local: '',
    telefone: '',
    email_contato: '',
    url_personalizada: '',
    endereco: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    horario_funcionamento: {},
    redes_sociais: {},
    observacao: '',
    aceite_termos: false
  });

  useEffect(() => {
    if (!loading && (!profile || profile.tipo_perfil !== 'admin')) {
      navigate('/login');
      return;
    }

    if (profile?.tipo_perfil === 'admin') {
      fetchEstabelecimentos();
    }
  }, [profile, loading, navigate]);

  const fetchEstabelecimentos = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('estabelecimentos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEstabelecimentos(data || []);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao carregar estabelecimentos",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.aceite_termos) {
      toast({
        title: "Erro",
        description: "É necessário aceitar os termos de uso",
        variant: "destructive",
      });
      return;
    }

    try {
      // Generate random password
      const senha = Math.random().toString(36).slice(-12) + 'A1!';
      
      // Create auth user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email_contato,
        password: senha,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });

      if (authError) throw authError;

      // Create user profile
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          auth_user_id: authData.user?.id,
          nome: formData.nome_responsavel,
          email: formData.email_contato,
          tipo_perfil: 'estabelecimento'
        })
        .select()
        .single();

      if (userError) throw userError;

      // Create establishment
      const { error: estabError } = await supabase
        .from('estabelecimentos')
        .insert({
          user_id: userData.id,
          admin_id: profile?.id,
          ...formData,
          senha_enviada_em: new Date().toISOString()
        });

      if (estabError) throw estabError;

      toast({
        title: "Cadastro realizado com sucesso!",
        description: `Senha automática enviada para ${formData.email_contato}: ${senha}`,
      });

      // Reset form
      setFormData({
        nome_local: '',
        nome_responsavel: '',
        descricao_breve: '',
        descricao_completa: '',
        tipo_local: '',
        telefone: '',
        email_contato: '',
        url_personalizada: '',
        endereco: {
          rua: '',
          numero: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: ''
        },
        horario_funcionamento: {},
        redes_sociais: {},
        observacao: '',
        aceite_termos: false
      });

      setActiveTab('listar');
      fetchEstabelecimentos();

    } catch (error: any) {
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Erro inesperado",
        variant: "destructive",
      });
    }
  };

  const filteredEstabelecimentos = estabelecimentos.filter(est =>
    est.nome_local.toLowerCase().includes(searchTerm.toLowerCase()) ||
    est.tipo_local.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">Bem-vindo, {profile?.nome}</p>
          </div>
          <Button variant="outline" onClick={signOut} className="gap-2">
            <LogOut size={16} />
            Sair
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-4 mb-6">
          <Button 
            variant={activeTab === 'listar' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('listar')}
            className="gap-2"
          >
            <Building size={16} />
            Listar Estabelecimentos
          </Button>
          <Button 
            variant={activeTab === 'cadastrar' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('cadastrar')}
            className="gap-2"
          >
            <Plus size={16} />
            Cadastrar Estabelecimento
          </Button>
        </div>

        {activeTab === 'listar' && (
          <Card>
            <CardHeader>
              <CardTitle>Estabelecimentos Cadastrados</CardTitle>
              <CardDescription>
                Gerencie todos os estabelecimentos parceiros
              </CardDescription>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome ou tipo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loadingData ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p>Carregando estabelecimentos...</p>
                </div>
              ) : filteredEstabelecimentos.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Building className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>Nenhum estabelecimento encontrado</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredEstabelecimentos.map((estabelecimento) => (
                    <div key={estabelecimento.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold">{estabelecimento.nome_local}</h3>
                          <p className="text-sm text-muted-foreground">
                            {estabelecimento.nome_responsavel} • {estabelecimento.tipo_local}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {estabelecimento.email_contato}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit size={16} />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {activeTab === 'cadastrar' && (
          <Card>
            <CardHeader>
              <CardTitle>Cadastrar Novo Estabelecimento</CardTitle>
              <CardDescription>
                Preencha os dados do estabelecimento parceiro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome_local">Nome do Local *</Label>
                    <Input
                      id="nome_local"
                      value={formData.nome_local}
                      onChange={(e) => setFormData({...formData, nome_local: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nome_responsavel">Nome do Responsável *</Label>
                    <Input
                      id="nome_responsavel"
                      value={formData.nome_responsavel}
                      onChange={(e) => setFormData({...formData, nome_responsavel: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tipo_local">Tipo do Local *</Label>
                    <Select 
                      value={formData.tipo_local} 
                      onValueChange={(value) => setFormData({...formData, tipo_local: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bar">Bar</SelectItem>
                        <SelectItem value="Restaurante">Restaurante</SelectItem>
                        <SelectItem value="Cervejaria">Cervejaria</SelectItem>
                        <SelectItem value="Café">Café</SelectItem>
                        <SelectItem value="Pub">Pub</SelectItem>
                        <SelectItem value="Bistrô">Bistrô</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone *</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email_contato">E-mail de Contato *</Label>
                    <Input
                      id="email_contato"
                      type="email"
                      value={formData.email_contato}
                      onChange={(e) => setFormData({...formData, email_contato: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="url_personalizada">URL Personalizada *</Label>
                    <Input
                      id="url_personalizada"
                      value={formData.url_personalizada}
                      onChange={(e) => setFormData({...formData, url_personalizada: e.target.value})}
                      placeholder="nome-do-local"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao_breve">Descrição Breve</Label>
                  <Input
                    id="descricao_breve"
                    value={formData.descricao_breve}
                    onChange={(e) => setFormData({...formData, descricao_breve: e.target.value})}
                    placeholder="Ex: Pub descontraído com quiz toda sexta!"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="descricao_completa">Descrição Completa</Label>
                  <Textarea
                    id="descricao_completa"
                    value={formData.descricao_completa}
                    onChange={(e) => setFormData({...formData, descricao_completa: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rua">Rua *</Label>
                    <Input
                      id="rua"
                      value={formData.endereco.rua}
                      onChange={(e) => setFormData({
                        ...formData, 
                        endereco: {...formData.endereco, rua: e.target.value}
                      })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="numero">Número *</Label>
                    <Input
                      id="numero"
                      value={formData.endereco.numero}
                      onChange={(e) => setFormData({
                        ...formData, 
                        endereco: {...formData.endereco, numero: e.target.value}
                      })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bairro">Bairro *</Label>
                    <Input
                      id="bairro"
                      value={formData.endereco.bairro}
                      onChange={(e) => setFormData({
                        ...formData, 
                        endereco: {...formData.endereco, bairro: e.target.value}
                      })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cidade">Cidade *</Label>
                    <Input
                      id="cidade"
                      value={formData.endereco.cidade}
                      onChange={(e) => setFormData({
                        ...formData, 
                        endereco: {...formData.endereco, cidade: e.target.value}
                      })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="estado">Estado *</Label>
                    <Input
                      id="estado"
                      value={formData.endereco.estado}
                      onChange={(e) => setFormData({
                        ...formData, 
                        endereco: {...formData.endereco, estado: e.target.value}
                      })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cep">CEP *</Label>
                    <Input
                      id="cep"
                      value={formData.endereco.cep}
                      onChange={(e) => setFormData({
                        ...formData, 
                        endereco: {...formData.endereco, cep: e.target.value}
                      })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacao">Observações</Label>
                  <Textarea
                    id="observacao"
                    value={formData.observacao}
                    onChange={(e) => setFormData({...formData, observacao: e.target.value})}
                    placeholder="Recados internos ou observações"
                    rows={2}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="aceite_termos"
                    checked={formData.aceite_termos}
                    onCheckedChange={(checked) => setFormData({...formData, aceite_termos: checked as boolean})}
                  />
                  <Label htmlFor="aceite_termos" className="text-sm">
                    Aceito os termos de uso e tratamento de dados *
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Cadastrar Estabelecimento
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;