# ---- Estágio 1: Builder ----
# Usa uma imagem Node completa para instalar dependências e compilar o projeto
FROM node:18 AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instala as dependências de produção e desenvolvimento
RUN npm install

# Copia todo o código fonte do projeto
COPY . .

# Executa o build da aplicação NestJS
RUN npm run build

# Remove as dependências de desenvolvimento para o estágio final
RUN npm prune --production


# ---- Estágio 2: Runner ----
# Usa uma imagem Node "slim" (menor) para a execução em produção
FROM node:18-slim

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia as dependências de produção do estágio 'builder'
COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copia o código compilado (pasta 'dist') do estágio 'builder'
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta que a aplicação NestJS usa por padrão
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]