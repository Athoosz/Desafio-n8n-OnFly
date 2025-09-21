![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# ✈ Onfly Desafio - n8n Custom Node: Random Number Generator 🚀

Este repositório contém um custom node para n8n que gera números aleatórios inteiros dentro de um mínimo e máximo usando a API do random.org

## Índice

- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Como Testar (Passo a Passo)](#como-testar-passo-a-passo)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Funciona o Node Customizado](#como-funciona-o-node-customizado)

## Funcionalidades

- **Geração de números aleatórios** via random.org
- **Parâmetros configuráveis**: Min e Max
- **Validação de entrada**: Min ≤ Max
- **Interface amigável** integrada ao n8n

## Pré-requisitos

Para testar este node customizado, você precisa ter instalado:

- **Git** – [Download aqui](https://git-scm.com/downloads)
- **Docker Desktop** – [Download aqui](https://www.docker.com/products/docker-desktop)
- **Node.js 20+** – [Download aqui](https://nodejs.org/)
- **npm** – [Download aqui](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)



## Configuração do Ambiente

Antes de iniciar o serviço, é importante configurar as variáveis de ambiente e o banco de dados:


### Variáveis de Ambiente

O arquivo `.env.example` está presente no projeto como modelo. **⚠☣ O correto é nunca colocar dados sensíveis diretamente no arquivo `.env` do repositório.**

Para configurar, copie o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
```

Em seguida, edite o arquivo `.env` e preencha os valores conforme sua necessidade:

- `DOMAIN_NAME`: domínio principal para acesso ao n8n (ex: `localhost.com`)
- `SUBDOMAIN`: subdomínio para acesso ao n8n (ex: `n8n`)
- `GENERIC_TIMEZONE`: timezone padrão (ex: `America/Sao_Paulo`)
- `SSL_EMAIL`: e-mail para geração de certificado SSL (ex: `seu-email@exemplo.com`)
- `ENV_DB_USER`: usuário do banco de dados PostgreSQL
- `ENV_DB_PASSWORD`: senha do banco de dados PostgreSQL  
- `ENV_DB_NAME`: nome do banco de dados PostgreSQL

### Banco de Dados

O serviço PostgreSQL é configurado automaticamente pelo Docker Compose com as seguintes configurações padrão:

- Usuário: definido em `ENV_DB_USER` no arquivo `.env`
- Senha: definida em `ENV_DB_PASSWORD` no arquivo `.env`
- Banco: definido em `ENV_DB_NAME` no arquivo `.env`
- Porta: `5432`

Essas configurações já estão definidas no arquivo `compose.yaml` e devem ser preenchidas no seu arquivo `.env` local.
O banco é utilizado pelo n8n para salvar workflows, credenciais e dados internos do usuário local.



## Como Testar (Passo a Passo)

### 1️⃣ Clone o Repositório
```bash
git clone https://github.com/Athoosz/Desafio-n8n-OnFly.git
cd Desafio-n8n-OnFly
```

### 2️⃣ Instale as Dependências
```bash
npm install
```

### 3️⃣ Build Rápida (Para Usuários Windows)
```powershell
.\build.ps1
```

**Ou manualmente:**
```bash
npm run build
docker build -t n8n-custom .
```

### 4️⃣ Inicie o n8n
```bash
docker-compose up -d
```

### 5️⃣ Acesse o n8n
Abra seu navegador e acesse: **http://localhost:5678**
Ou, dentro do Docker Desktop, clique no link do n8n disponibilizado.

### 6️⃣ Encontre o Node "Random" na Interface do n8n
1. Crie um workflow para testar.
2. Clique em **"Add Node"** (botão +).
3. Digite **"Random"** na busca.
4. Você verá o node **"Random"** disponível! 🎉

### 7️⃣ Teste o Node
1. Arraste o node "Random" para o canvas.
2. Configure os parâmetros **Min** e **Max**.
3. Execute e veja os números aleatórios sendo gerados!

## Estrutura do Projeto

```
├── .n8n/
│   └── custom/
│       └── Random/
│           ├── Random.node.ts     # Código principal do node
│           └── randomNode.svg     # Ícone do node
├── dist/                          # Arquivos compilados
├── Dockerfile                     # Configuração Docker
├── compose.yaml                   # Docker Compose
├── build.ps1                      # Script de build (Windows)
├── gulpfile.js                    # Build dos ícones
└── package.json                   # Configurações npm
```

## Como Funciona o Node Customizado

O node **Random** aceita dois parâmetros:
- **Min**: Valor mínimo do número aleatório a ser gerado
- **Max**: Valor máximo do número aleatório a ser gerado

**Retorno:**
```json
{
  "randomNumber": 7,
  "min": 1,
  "max": 10
}
```
