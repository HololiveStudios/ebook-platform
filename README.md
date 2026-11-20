# Ebook Platform - Distribuição e Venda de Livros Digitais

## 1. Objetivo e Finalidade
Plataforma web para vitrine, download protegido e leitura online de eBooks e materiais didáticos.

## 2. Tecnologias Utilizadas
- React, TypeScript, Vite, Tailwind CSS, Firebase (Hosting/Firestore/Storage), Lucide React

## 3. Arquitetura e Estrutura de Diretórios
SPA em React integrada ao Firebase para hospedagem dos arquivos PDF/EPUB no Firebase Storage.

## 4. Principais Arquivos e Responsabilidades
- `src/App.tsx`: Catálogo de livros e leitor.
- `firebase.json`: Configurações de hosting e regras de dados.

## 5. Funcionalidades Identificadas
- Vitrine categorizada de livros digitais
- Download autorizado e leitor web integrado
- Painel simples para upload de novos títulos

## 6. Como Compilar ou Executar
```bash
npm install
npm run dev
```

## 7. Estado Atual do Projeto
**Completo**

## 8. Pendências e Limitações Identificadas
Implementar leitor nativo com marcadores de página e anotações.
