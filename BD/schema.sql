-- TABELA DE PERFIS DE USUÁRIOS
CREATE TABLE IF NOT EXISTS public.perfis (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    foto_perfil TEXT DEFAULT 'default.png',
    tema_pref VARCHAR(10) DEFAULT 'escuro' CHECK (tema_pref IN ('escuro', 'claro')),
    tipo_usuario VARCHAR(10) DEFAULT 'comum' CHECK (tipo_usuario IN ('comum', 'admin')),
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- TRIGGER DE CRIAÇÃO AUTOMÁTICA
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.perfis (id, usuario, email, foto_perfil, tema_pref, tipo_usuario)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.email,
    COALESCE(new.raw_user_meta_data->>'foto_perfil', 'default.png'),
    COALESCE(new.raw_user_meta_data->>'tema_pref', 'escuro'),
    'comum'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- POLÍTICAS DE SEGURANÇA (RLS)
ALTER TABLE public.perfis ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Leitura do proprio perfil" ON public.perfis FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Atualizacao do proprio perfil" ON public.perfis FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Insercao do proprio perfil" ON public.perfis FOR INSERT WITH CHECK (auth.uid() = id);