Arquitetura e Estrutura Geral
O banco de dados foi projetado para gerenciar a autenticação e os perfis dos usuários de forma segura e sincronizada. A estrutura é dividida em duas áreas principais:

Schema de Autenticação (auth.users): Tabela nativa gerenciada diretamente pelo serviço de autenticação do Supabase. Ela guarda as credenciais de acesso (como e-mail e senha criptografada) e gera um identificador único em formato UUID para cada conta criada.

Schema Público (public.perfis): Tabela customizada para armazenar as informações públicas e personalizáveis dos usuários. Ela guarda o nome de usuário exclusivo, o e-mail cadastrado, a foto de perfil (em formato Data URL/Base64 ou URL de imagem) e a data de criação do registro.

A chave primária (id) da tabela de perfis possui uma relação direta de chave estrangeira com a tabela de usuários da autenticação, garantindo que cada perfil esteja estritamente vinculado a uma conta de usuário ativa.

Automação com Triggers e Funções PL/pgSQL
Para garantir a integridade dos dados e evitar falhas de duplicação por chamadas manuais no front-end, a criação do perfil é realizada de forma automática pelo banco de dados.

Funcionamento da Trigger: Quando um novo usuário realiza o registro através da tela de cadastro, o Supabase registra a conta na tabela interna de autenticação.

Execução da Função: No momento exato dessa inserção, uma gatilho (trigger) é acionado para rodar uma função em linguagem PL/pgSQL.

Injeção de Dados: A função extrai o identificador único (UUID), o e-mail e o nome de usuário informados nos metadados do cadastro e insere automaticamente uma nova linha correspondente na tabela pública de perfis.

Caso a conta seja excluída da área de autenticação, o vínculo em cascata remove automaticamente o registro correspondente da tabela pública.

Políticas de Segurança e Controle de Acesso (RLS)
A segurança do banco de dados é gerida pela camada Row Level Security (RLS) da tabela de perfis. Esse recurso garante que o acesso aos dados siga regras rígidas de permissão:

Permissão de Leitura Pública (SELECT): Configurada para permitir que visitantes anônimos e usuários autenticados possam consultar informações de perfil. Essa permissão é essencial para que o formulário de login consiga validar o e-mail do usuário antes de efetuar a autenticação e para que as fotos/nomes apareçam no cabeçalho e nas lendas da aplicação.

Permissão de Alteração (UPDATE): Restrita exclusivamente ao dono da conta. A política valida se o ID do usuário que está tentando atualizar a foto de perfil é exatamente o mesmo ID contido no token de sessão ativo gerado pelo Supabase Auth.

Integração com a Aplicação Front-End
A comunicação entre a interface web e o banco de dados ocorre através da biblioteca cliente do Supabase (supabase-js):

No Login: O front-end consulta a tabela pública para transformar o nome de usuário digitado no e-mail correspondente e, em seguida, envia as credenciais para validação no serviço de autenticação.

Na Exibição da Interface: O script verifica o token de sessão ativo e consulta os dados na tabela pública para renderizar o nome de exibição e a foto do usuário no cabeçalho ou no painel de perfil.

Na Edição de Dados: Quando o usuário escolhe uma nova foto na página de perfil, a imagem é convertida e enviada via comando de atualização diretamente para a linha do perfil correspondente ao ID autenticado.