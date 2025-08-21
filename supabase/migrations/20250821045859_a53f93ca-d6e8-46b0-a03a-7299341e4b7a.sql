-- Corrigir a inserção do admin - o auth.users já existe, apenas criar o perfil
-- Primeiro verificar se já existe o admin no auth.users
DO $$
BEGIN
    -- Se não existir o admin no users public, criar
    IF NOT EXISTS (SELECT 1 FROM public.users WHERE email = 'admin@quis.com.br') THEN
        INSERT INTO public.users (nome, email, tipo_perfil)
        VALUES ('Administrador Quis', 'admin@quis.com.br', 'admin');
    END IF;
END $$;