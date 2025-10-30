# AutoPorta Pro 
## Calculadora de Preços de Portas de Enrolar 🚪💰

[![Next.js](https://img.shields.io/badge/Next.js-15.5.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)]
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?logo=typescript)]
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-teal?logo=tailwind-css)]
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 🏠 Visão Geral
A **Calculadora de Preços de Portas de Enrolar** é um web app desenvolvido com **Next.js, React, TypeScript e Tailwind CSS**, permitindo calcular rapidamente o preço de portas automáticas, tanto para **instalação completa** quanto para **kit serralheiro**.  

Ideal para empresas de serralheria, o aplicativo gera orçamentos precisos de forma rápida, sem necessidade de cálculos manuais.

---

## ⚡ Funcionalidades
- Cálculo automático de preço com base em:
  - Altura e largura do vão;
  - Tipo de porta: **Kit instalado** ou **Kit serralheiro**;
  - Componentes: guia U, tubo, soleira, motor (tabela de potência), metro quadrado da lâmina.
- Bloqueio de seleção: ao escolher **kit serralheiro**, a opção **kit instalado** fica indisponível e vice-versa.
- Exportação do orçamento em **PDF**.
- Sistema baseado em **JSON estático**, fácil de atualizar.

---

## 🛠 Tecnologias
- **Next.js 15.5.2** – Framework React com SSR/SSG.
- **React 18** – Interface interativa.
- **TypeScript** – Tipagem estática.
- **Tailwind CSS 3.3** – Estilização responsiva e moderna.
- **JSON** – Banco de dados estático de preços.
- **jsPDF** – Geração de PDFs.
- **Clerk (opcional)** – Autenticação de usuários.

---

## 🚀 Como Rodar

### Pré-requisitos
- Node.js >= 18
- npm ou yarn

### Passos
```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/calculadora-portas.git
cd calculadora-portas

# Instalar dependências
npm install
# ou
yarn

# Rodar em desenvolvimento
npm run dev
# ou
yarn dev
Abrir no navegador:

arduino
Copiar código
http://localhost:3000
Para produção:

bash
Copiar código
npm run build
npm start
📊 Estrutura do Projeto
bash
Copiar código
/calculadora-portas
│
├─ /public          # Assets (imagens, GIFs)
├─ /src
│   ├─ /components  # Componentes React
│   ├─ /pages       # Páginas Next.js
│   ├─ /styles      # CSS global / Tailwind
│   └─ /data        # JSON com preços e tabelas
├─ package.json
├─ tsconfig.json
└─ next.config.js
🔢 Como Funciona o Cálculo
Usuário insere altura e largura do vão.

Seleciona tipo de serviço: kit instalado ou kit serralheiro.

Sistema calcula automaticamente:

Preço do guia U

Preço do tubo

Preço da soleira

Preço do motor, de acordo com a tabela de potência

Preço do metro quadrado da lâmina

Resultado exibido em tela com opção de gerar PDF.

📌 Considerações
Totalmente estático, baseado em JSON, fácil de atualizar.

Ideal para empresas de serralheria e portas automáticas.

Possível evolução:

Integração com banco de dados dinâmico;

Histórico de orçamentos e controle de estoque;

Login para clientes e funcionários.

📎 Exemplos de Uso
Kit instalado: Altura 3m, Largura 4m → Preço R$ 4.800

Kit serralheiro: Altura 2,5m, Largura 3,5m → Preço R$ 3.200

🤝 Contribuição
Contribuições são bem-vindas!

Fork do projeto

Nova branch: git checkout -b feature/nova-funcionalidade

Commit: git commit -m 'Adiciona nova funcionalidade'

Push: git push origin feature/nova-funcionalidade

Abrir Pull Request

📄 Licença
Este projeto está licenciado sob a MIT License.