import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { LogOut, Building, Save, Eye, EyeOff } from 'lucide-react';

const EstablishmentPanel = () => {
  const { profile, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [establishment, setEstablishment] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(false);
  const [activeTab, setActiveTab] = useState('perfil');
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    if (!loading && (!profile || profile.tipo_perfil !== 'estabelecimento')) {
      navigate('/login');
      return;
    }

    if (profile?.tipo_perfil === 'estabelecimento') {
      fetchEstablishment();
    }
  }, [profile, loading, navigate]);

  const fetchEstablishment = async () => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('estabelecimentos')
        .select('*')
        .eq('user_id', profile?.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setEstablishment(data);
    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao carregar dados do estabelecimento",
        variant: "destructive",
      });
    } finally {
      setLoadingData(false);
    }
  };

  const handleUpdateEstablishment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!establishment) return;

    try {
      const { error } = await supabase
        .from('estabelecimentos')
        .update({
          descricao_breve: establishment.descricao_breve,
          descricao_completa: establishment.descricao_completa,
          telefone: establishment.telefone,
          horario_funcionamento: establishment.horario_funcionamento,
          redes_sociais: establishment.redes_sociais,
        })
        .eq('id', establishment.id);

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Dados atualizados com sucesso",
      });

    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao atualizar dados",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Erro", 
        description: "A nova senha deve ter no mínimo 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "Sucesso!",
        description: "Senha alterada com sucesso",
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordChange(false);

    } catch (error: any) {
      toast({
        title: "Erro",
        description: "Erro ao alterar senha",
        variant: "destructive",
      });
    }
  };

  if (loading || loadingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  if (!establishment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <Building className="mx-auto h-12 w-12 mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">Estabelecimento não encontrado</h2>
            <p className="text-muted-foreground mb-4">
              Não encontramos dados do seu estabelecimento. Entre em contato com o administrador.
            </p>
            <Button onClick={signOut}>Sair</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {establishment.nome_local}
            </h1>
            <p className="text-muted-foreground">Painel do Estabelecimento</p>
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
            variant={activeTab === 'perfil' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('perfil')}
          >
            Perfil do Estabelecimento
          </Button>
          <Button 
            variant={activeTab === 'senha' ? 'default' : 'outline'} 
            onClick={() => setActiveTab('senha')}
          >
            Alterar Senha
          </Button>
        </div>

        {activeTab === 'perfil' && (
          <Card>
            <CardHeader>
              <CardTitle>Dados do Estabelecimento</CardTitle>
              <CardDescription>
                Atualize as informações editáveis do seu estabelecimento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateEstablishment} className="space-y-6">
                {/* Informações não editáveis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Nome do Local</Label>
                    <p className="text-sm">{establishment.nome_local}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Responsável</Label>
                    <p className="text-sm">{establishment.nome_responsavel}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Tipo</Label>
                    <p className="text-sm">{establishment.tipo_local}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">E-mail</Label>
                    <p className="text-sm">{establishment.email_contato}</p>
                  </div>
                </div>

                {/* Informações editáveis */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="descricao_breve">Descrição Breve</Label>
                    <Input
                      id="descricao_breve"
                      value={establishment.descricao_breve || ''}
                      onChange={(e) => setEstablishment({
                        ...establishment,
                        descricao_breve: e.target.value
                      })}
                      placeholder="Ex: Pub descontraído com quiz toda sexta!"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao_completa">Descrição Completa</Label>
                    <Textarea
                      id="descricao_completa"
                      value={establishment.descricao_completa || ''}
                      onChange={(e) => setEstablishment({
                        ...establishment,
                        descricao_completa: e.target.value
                      })}
                      rows={4}
                      placeholder="Descrição detalhada do estabelecimento..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={establishment.telefone || ''}
                      onChange={(e) => setEstablishment({
                        ...establishment,
                        telefone: e.target.value
                      })}
                    />
                  </div>
                </div>

                <Button type="submit" className="gap-2">
                  <Save size={16} />
                  Salvar Alterações
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {activeTab === 'senha' && (
          <Card>
            <CardHeader>
              <CardTitle>Alterar Senha</CardTitle>
              <CardDescription>
                Por segurança, altere sua senha após o primeiro acesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showPasswordChange ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">
                    Recomendamos alterar a senha padrão enviada por e-mail
                  </p>
                  <Button onClick={() => setShowPasswordChange(true)}>
                    Alterar Senha
                  </Button>
                </div>
              ) : (
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value
                      })}
                      placeholder="Mínimo 8 caracteres"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value
                      })}
                      placeholder="Digite novamente a nova senha"
                      required
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit">
                      Alterar Senha
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowPasswordChange(false)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EstablishmentPanel;