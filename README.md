# Projeto Integrador - Senac

Este é um projeto educacional desenvolvido como parte do **Projeto Integrador**
do curso de Desenvolvimento de Software do Senac. O projeto tem como objetivo
criar um sistema de gerenciamento para uma barbearia, demonstrando as
habilidades adquiridas ao longo do curso.

## Descrição do Projeto

A aplicação desenvolvida inclui funcionalidades para gerenciar serviços,
clientes, funcionários e agendamentos em uma barbearia. A aplicação é construída
utilizando **React** para o frontend e **Next.js** com **Prisma** para o
backend. O projeto está sendo apresentado antecipadamente a pedido do professor
para que a turma possa visualizar como o projeto será.

## Funcionalidades

- **Serviços**: Adicionar e visualizar serviços oferecidos pela barbearia.
- **Clientes**: Adicionar e visualizar informações dos clientes, como nome e
  telefone.
- **Funcionários**: Adicionar e visualizar informações dos funcionários da
  barbearia.
- **Agendamentos**: Adicionar e visualizar agendamentos, incluindo detalhes como
  data, hora, cliente e funcionário.

## Tecnologias Utilizadas

- **Frontend**:

  - [React](https://reactjs.org/)
  - [Material-UI](https://mui.com/)
  - [Day.js](https://day.js.org/)
  - [Axios](https://axios-http.com/)
  - [React-hook-form](https://react-hook-form.com/)
  - [Zod](https://zod.dev/)
  - [TanStack Query (ReactQuery)](https://tanstack.com/query/latest)

- **Backend**:
  - [Next.js](https://nextjs.org/)
  - [Prisma](https://www.prisma.io/)
  - [bcrypt](https://www.npmjs.com/package/bcrypt)

## Configuração

### Requisitos

- Node.js
- npm ou yarn

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/usuario/repositorio.git
   cd repositorio
   ```

2. Instale as dependências:
   ```bash
    npm install
    # ou
    yarn install
   ```
3. Configure o banco de dados e as variáveis de ambiente. Crie um arquivo .env
   na raiz do projeto e adicione as seguintes variáveis:
   ```bash
    DATABASE_URL=seu_url_do_banco_de_dados
    NEXT_PUBLIC_EMAIL='EMAIL_ADMIN'
    NEXT_PUBLIC_PASSWORD='SENHA_ADMIN'
   ```
4. Execute as migrations do Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. Inicie o servidor de desenvolvimento:

   ```bash
      npm run dev
      # ou
      yarn dev

   ```

## Estrutura do Projeto

- **`/src/appp`**: Contém as páginas da aplicação Next.js.
- **`/src/components`**: Contém os componentes React utilizados na aplicação.
- **`/src/app/api`**: Contém as funções de API e configurações do Prisma.
- **`/src/hooks`**: Contém hooks personalizados, como `useAlert`.
- **`/src/service`**: Contém as requisições da aplicação.
- **`/src/contexts`**: Contém os contextos da aplicação como o Provider de
  Requisição.
- **`/src/zod`**: Contém os schemas de cada tipo de formulário.
- **`/src/theme.ts`**: Contém os tema da aplicação.
- **`/src/utils`**: Contém os funções úteis para a aplicação.

## Testes

Adicione testes para garantir que a aplicação funcione conforme o esperado.
Utilize a biblioteca de testes de sua escolha (por exemplo, Jest ou React
Testing Library).

## Contribuições

Contribuições são bem-vindas! Se você encontrar algum problema ou quiser
adicionar uma nova funcionalidade, sinta-se à vontade para abrir uma issue ou
enviar um pull request.
