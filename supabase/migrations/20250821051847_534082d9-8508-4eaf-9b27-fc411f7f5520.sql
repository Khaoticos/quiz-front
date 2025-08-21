-- Corrigir recursão infinita nas políticas RLS da tabela users
-- Remover todas as políticas existentes que causam recursão
DROP POLICY IF EXISTS "Admins podem ver todos os usuários" ON public.users;
DROP POLICY IF EXISTS "Users podem ver seu próprio perfil" ON public.users;
DROP POLICY IF EXISTS "Users podem atualizar seu próprio perfil" ON public.users;

-- Criar função segura para verificar se um usuário é admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.users 
    WHERE auth_user_id = _user_id 
    AND tipo_perfil = 'admin'
  );
$$;

-- Criar políticas RLS sem recursão
CREATE POLICY "Users podem ver seu próprio perfil"
ON public.users
FOR SELECT
TO authenticated
USING (auth_user_id = auth.uid());

CREATE POLICY "Users podem atualizar seu próprio perfil"
ON public.users
FOR UPDATE
TO authenticated
USING (auth_user_id = auth.uid());

-- Política especial para admins verem todos os usuários (usando função segura)
CREATE POLICY "Admins podem ver todos os usuários"
ON public.users
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Permitir inserção de novos usuários (para cadastro)
CREATE POLICY "Permitir inserção de novos usuários"
ON public.users
FOR INSERT
TO authenticated
WITH CHECK (auth_user_id = auth.uid());