# CBF — Sistema de Usuários

Sistema web inspirado na Confederação Brasileira de Futebol (CBF), desenvolvido para gerenciamento de usuários, autenticação e controle de acesso.

O projeto utiliza uma interface baseada no universo do futebol brasileiro e reúne recursos de cadastro, login, gerenciamento de usuários e integração com banco de dados.

## Sobre o Projeto

O projeto foi desenvolvido com o objetivo de aplicar na prática conceitos de desenvolvimento web full stack, utilizando Next.js e React na construção da interface e PostgreSQL para armazenamento dos dados.

A aplicação possui uma estrutura organizada entre páginas, componentes e serviços, além de recursos de autenticação e controle de acesso.

## Funcionalidades

- Cadastro de usuários
- Login e autenticação
- Controle de sessão
- Gerenciamento de usuários
- Controle de acesso por perfil
- Proteção de páginas e recursos
- Integração com banco de dados
- Interface responsiva
- Componentes reutilizáveis
- Navegação entre as áreas do sistema

## Segurança

O sistema utiliza autenticação baseada em **JWT** para controle de sessão e **bcrypt** para proteção das senhas.

O acesso às áreas do sistema é controlado de acordo com o perfil do usuário, evitando que recursos protegidos sejam acessados sem a devida autorização.

## Banco de Dados

O projeto utiliza **PostgreSQL** para armazenamento e gerenciamento das informações da aplicação.

A comunicação com o banco é realizada através do pacote `pg`.

Entre os dados gerenciados pelo sistema estão as informações relacionadas aos usuários e seus respectivos perfis e permissões.

## Stack

- **Next.js 15**
- **React 19**
- **Tailwind CSS v4**
- **PostgreSQL**
- **Node.js**
- **JWT**
- **bcrypt**
- **Font Awesome**

## Estrutura do Projeto

A aplicação utiliza o App Router do Next.js e organiza o código em diferentes áreas de responsabilidade.

Principais diretórios:

```text
/app
/components
/lib
/public
