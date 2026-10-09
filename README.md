# Gestão Comercial

Aplicação web desenvolvida em React para apoiar o acompanhamento de comissões de vendedores, o controle de estoque e o cálculo de juros por atraso.

**Demonstração online:** https://gestao-comercial-zeta.vercel.app/

## Funcionalidades

### Comissões
- Resumo de vendas e comissões por vendedor.
- Visualização detalhada das vendas.
- Cálculo automático de comissão conforme as faixas definidas no desafio:
  - Vendas abaixo de R$ 100,00: 0%.
  - Vendas a partir de R$ 100,00 e abaixo de R$ 500,00: 1%.
  - Vendas a partir de R$ 500,00: 5%.

### Estoque
- Consulta dos produtos e das quantidades disponíveis.
- Registro de entradas e saídas.
- Validação das movimentações para evitar quantidades inválidas ou saídas superiores ao estoque disponível.
- Histórico de movimentações.

### Juros
- Cálculo de juros por atraso com taxa de 2,5% ao dia.
- Exibição dos dias de atraso, dos juros calculados e do valor atualizado.
- Validação dos campos obrigatórios.

## Tecnologias utilizadas

- React
- JavaScript
- Vite
- React Router
- CSS
- localStorage para persistência local de dados

## Como executar o projeto

É necessário ter o Node.js e o npm instalados.

1. Clone o repositório:

   ```bash
   git clone https://github.com/mi2507/gestaoComercial.git
   ```

2. Entre na pasta do projeto:

   ```bash
   cd gestaoComercial
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Acesse o endereço exibido no terminal, normalmente `http://localhost:5173`.

Para gerar a versão de produção:

```bash
npm run build
```

## Observações

O projeto utiliza dados fictícios para demonstrar as funcionalidades. O armazenamento realizado com `localStorage` é local ao navegador utilizado.

## Autora

Michelle — [GitHub](https://github.com/mi2507)