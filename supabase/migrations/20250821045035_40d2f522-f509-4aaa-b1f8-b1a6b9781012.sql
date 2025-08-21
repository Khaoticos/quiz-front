-- Criar enum para tipos de usuário
CREATE TYPE public.user_type AS ENUM ('admin', 'estabelecimento', 'cliente');

-- Criar tabela de usuários
CREATE TABLE public.users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    tipo_perfil user_type NOT NULL DEFAULT 'cliente',
    status TEXT DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de estabelecimentos
CREATE TABLE public.estabelecimentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    admin_id UUID REFERENCES public.users(id) NOT NULL,
    nome_local TEXT NOT NULL,
    nome_responsavel TEXT NOT NULL,
    foto_url TEXT,
    descricao_breve TEXT,
    descricao_completa TEXT,
    tipo_local TEXT NOT NULL,
    horario_funcionamento JSONB,
    endereco JSONB NOT NULL,
    telefone TEXT NOT NULL,
    email_contato TEXT NOT NULL,
    url_personalizada TEXT UNIQUE NOT NULL,
    redes_sociais JSONB DEFAULT '{}',
    observacao TEXT,
    aceite_termos BOOLEAN DEFAULT FALSE,
    senha_enviada_em TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.estabelecimentos ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para users
CREATE POLICY "Users podem ver seu próprio perfil" ON public.users
    FOR SELECT USING (auth.uid() = auth_user_id);

CREATE POLICY "Admins podem ver todos os usuários" ON public.users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE auth_user_id = auth.uid() AND tipo_perfil = 'admin'
        )
    );

CREATE POLICY "Users podem atualizar seu próprio perfil" ON public.users
    FOR UPDATE USING (auth.uid() = auth_user_id);

-- Políticas RLS para estabelecimentos
CREATE POLICY "Estabelecimentos podem ver seus próprios dados" ON public.estabelecimentos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE auth_user_id = auth.uid() AND id = estabelecimentos.user_id
        )
    );

CREATE POLICY "Admins podem ver todos os estabelecimentos" ON public.estabelecimentos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE auth_user_id = auth.uid() AND tipo_perfil = 'admin'
        )
    );

CREATE POLICY "Admins podem inserir estabelecimentos" ON public.estabelecimentos
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE auth_user_id = auth.uid() AND tipo_perfil = 'admin'
        )
    );

CREATE POLICY "Admins podem atualizar estabelecimentos" ON public.estabelecimentos
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE auth_user_id = auth.uid() AND tipo_perfil = 'admin'
        )
    );

CREATE POLICY "Estabelecimentos podem atualizar seus próprios dados" ON public.estabelecimentos
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE auth_user_id = auth.uid() AND id = estabelecimentos.user_id
        )
    );

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_estabelecimentos_updated_at BEFORE UPDATE ON public.estabelecimentos
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Inserir admin padrão
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'admin@quis.com.br',
    crypt('Admin@2024', gen_salt('bf')),
    NOW(),
    NOW(),
    NOW()
);

INSERT INTO public.users (auth_user_id, nome, email, tipo_perfil)
VALUES (
    'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    'Administrador Quis',
    'admin@quis.com.br',
    'admin'
);