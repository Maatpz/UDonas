# 👗 DonaS - Catálogo de Moda Feminina

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![License](https://img.shields.io/badge/license-MIT-green)


Landing page moderna para a marca de moda feminina **DonaS**, com painel administrativo completo para gerenciamento de produtos.
Sistema completo de catálogo de produtos com painel administrativo, autenticação, analytics de visitantes e integração com WhatsApp e Shopee. Perfeito para pequenos e médios negócios que querem uma presença online profissional.

---
## ✨ Funcionalidades

| Feature | Descrição |
|---------|-----------|
| 🛍️ **Catálogo Responsivo** | Landing page moderna e totalmente responsiva para exibir produtos |
| 🔐 **Painel Admin Seguro** | Sistema de autenticação com JWT e bcrypt |
| 📦 **Gerenciamento de Produtos** | CRUD completo de produtos com imagens, categorias, tamanhos e cores |
| 📊 **Analytics de Visitantes** | Contador de visitas únicas do dia com reset automático |
| 🎨 **Filtro por Categorias** | Navegação rápida entre categorias de produtos |
| ✅ **Ativar/Desativar Produtos** | Controle de visibilidade sem precisar deletar |
| 📏 **Tamanhos e Cores** | Especificação de variações de produtos |
| 💬 **Integração WhatsApp** | Botão direto para compra via WhatsApp |
| 🛒 **Integração Shopee** | Link opcional para produtos na Shopee |
| 🎯 **Upload de Imagens** | Suporte a Vercel Blob para armazenamento de imagens |
| 🌐 **SEO Otimizado** | Metadata configurada para melhor indexação |

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS v4** - Estilização moderna
- **Shadcn/UI** - Componentes de interface
- **Lucide React** - Ícones SVG

### Backend
- **Next.js API Routes** - Serverless functions
- **Neon PostgreSQL** - Banco de dados serverless
- **JWT** - Autenticação stateless
- **Bcrypt** - Hash de senhas

### DevOps & Infra
- **Vercel** - Hospedagem e deploy
- **Vercel Blob** - Storage de imagens
- **Git** - Controle de versão

---

## 📦 Instalação

### Pré-requisitos

- Node.js 18+ instalado
- Conta no [Neon](https://neon.tech) (banco de dados gratuito)
- Conta no [Vercel](https://vercel.com)
- Git instalado

## 🎨 Customização

### Alterar Cores do Tema

Edite o arquivo `app/globals.css`:

```css
@theme inline {
  --color-primary: #8B5CF6;    /* Roxo principal */
  --color-secondary: #EC4899;  /* Rosa secundário */
  /* ... outras cores */
}
```

## 📂 Estrutura do Projeto

```
catalogo-donas/
├── app/                          # Next.js App Router
│   ├── admin/                    # Painel administrativo
│   │   ├── login/               # Página de login
│   │   └── page.tsx             # Dashboard admin
│   ├── api/                      # API Routes
│   │   ├── auth/                # Autenticação
│   │   ├── products/            # CRUD de produtos
│   │   └── page-views/          # Analytics de visitantes
│   ├── page.tsx                 # Landing page (home)
│   ├── layout.tsx               # Layout global
│   └── globals.css              # Estilos globais
├── components/                   # Componentes React
│   ├── admin/                   # Componentes do admin
│   │   ├── stats-card.tsx       # Card de estatísticas
│   │   ├── category-filter.tsx  # Filtro de categorias
│   │   ├── product-card.tsx     # Card de produto (admin)
│   │   └── product-form-fields.tsx # Formulário de produto
│   ├── ui/                      # Componentes Shadcn/UI
│   ├── products.tsx             # Catálogo de produtos (landing)
│   ├── admin-dashboard.tsx      # Dashboard administrativo
│   ├── page-view-tracker.tsx    # Tracker de visitantes
│   └── scroll-to-top.tsx        # Botão voltar ao topo
├── lib/                         # Bibliotecas e utilitários
│   ├── auth.ts                  # Funções de autenticação
│   └── db.ts                    # Conexão com banco de dados
├── public/                      # Arquivos estáticos
│   └── *.jpg                    # Imagens dos produtos
└── README.md                    # 
```

---

## 🗄️ Schema do Banco de Dados

### Tabela: `admins`
```sql
CREATE TABLE admins (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `products`
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT,
  active BOOLEAN DEFAULT true,
  sizes TEXT[],
  colors TEXT[],
  shopee_url TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tabela: `page_views`
```sql
CREATE TABLE page_views (
  id SERIAL PRIMARY KEY,
  ip_address VARCHAR(45),
  user_agent TEXT,
  visited_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔒 Segurança

- ✅ Senhas criptografadas com bcrypt (10 rounds)
- ✅ Autenticação JWT com secret seguro
- ✅ Validação de inputs nas APIs
- ✅ Queries parametrizadas (proteção contra SQL injection)
- ✅ HTTPS obrigatório em produção
- ✅ Rate limiting via Vercel (built-in)

<!-- ## 🗺️ Roadmap

- [ ] Sistema de carrinho de compras
- [ ] Integração com Mercado Pago / Stripe
- [ ] Sistema de cupons de desconto
- [ ] Notificações por email (novos pedidos)
- [ ] Relatórios de vendas e analytics avançado
- [ ] Sistema de avaliações de produtos
--- -->

## 👨‍💻 Autor

Desenvolvido por https://github.com/Maatpz

**Contato:**
- Email: matheuspizzolato29@gmail.com
- LinkedIn: https://www.linkedin.com/in/matheus-pizzolato/