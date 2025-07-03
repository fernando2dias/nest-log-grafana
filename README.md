# Monitoramento de Logs com NestJS e Grafana

Prova de Conceito (PoC) para demonstrar uma arquitetura de monitoramento robusta para uma API NestJS, utilizando o Grafana para visualização centralizada de logs estruturados coletados pelo Loki.

![Screenshot do Dashboard Final no Grafana](https://i.imgur.com/jlaTC5u.png)
## 🎯 Objetivo

O objetivo principal desta PoC é demonstrar uma arquitetura de monitoramento robusta para uma API NestJS, centralizando logs estruturados e métricas em um dashboard interativo no Grafana.

Isso resolve o problema de **centralizar a observabilidade de uma aplicação**, facilitando a depuração de erros e a análise de performance em tempo real.

## 🛠️ Arquitetura e Tecnologias

Este projeto é totalmente containerizado usando Docker e Docker Compose. A pilha de tecnologias inclui:

* **Aplicação:**
    * **NestJS:** Framework Node.js para construir a API que simula os jobs.
    * **Winston:** Biblioteca de logging para gerar logs estruturados em JSON.
    * `winston-loki`: Transporte do Winston que envia os logs diretamente para o Loki.
* **Stack de Monitoramento:**
    * **Loki:** Sistema de agregação de logs.
    * **Grafana:** Plataforma de visualização para criar os dashboards.
* **Orquestração:**
    * **Docker & Docker Compose:** Para gerenciar o ambiente multi-container.

Futuramente, a arquitetura será expandida para incluir **PostgreSQL**, **RabbitMQ** e deploy em **Kubernetes (K8s)**.

### Fluxo de Dados dos Logs

1.  Uma requisição HTTP na API NestJS dispara a simulação de múltiplos jobs (Job A, Job B, Job C).
2.  Cada serviço (`JobsAService`, `JobsBService`, etc.) utiliza o logger do Winston para registrar o início, o fim e os resultados de suas tarefas. O campo `context` no log é usado para identificar qual job gerou a mensagem.
3.  O `winston-loki` intercepta cada log, o formata como JSON e o envia via HTTP para o serviço do Loki (`http://loki:3100`).
4.  O Loki recebe e armazena o log com a label `{app="seu-projeto-nestjs"}`.
5.  No Grafana, múltiplos dashboards (um para cada job) executam queries em LogQL para buscar, filtrar e visualizar os logs, permitindo uma análise detalhada e isolada de cada tarefa.

## 📊 Exemplos de Queries LogQL

Abaixo estão algumas das principais queries em LogQL utilizadas nos dashboards para monitorar a aplicação. Elas podem ser testadas diretamente na aba **Explore** do Grafana.

### 1. Contagem de Logs por Nível

Para criar painéis do tipo "Stat" que mostram a contagem total de logs por nível (`info`, `warn`, `error`, `crit`) em um determinado período de tempo.

**Contagem de Erros:**
```logql
sum(count_over_time({app="seu-projeto-nestjs"} | json | level = "error" [$__range]))
```
## Panel Geral
Para gerar o painel geral com informações totais de logs por level.

![Screenshot do Dashboard Final no Grafana](https://i.imgur.com/jlaTC5u.png)
### TIPO DO GRÁFICO: "BAR GAUGE"

**info - VERDE**
```logql
count_over_time({app="seu-projeto-nestjs"} |= "info" [$__range])
```

**errors - VERMELHO**
```logql
count_over_time({app="seu-projeto-nestjs"} |= "error" [$__range])
```

**warnings - AMARELO**
```logql
count_over_time({app="seu-projeto-nestjs"} |= "warn" [$__range])
```

### PAINEL DE LOGS GERAL

**Logs gerais**
```logql
{app="seu-projeto-nestjs"}
```

## Painel especifico por Job
### TIPO DO GRÁFICO: "STAT"

![alt text](https://i.imgur.com/txWnuqZ.png)

**info - VERDE**
```logql
sum(count_over_time({app="seu-projeto-nestjs"} | json | level = "info" and context = "jobsAService" [$__range]))
```

**errors - VERMELHO**
```logql
sum(count_over_time({app="seu-projeto-nestjs"} | json | level = "error" and context = "jobsAService" [$__range]))
```

**warnings - AMARELO**
```logql
sum(count_over_time({app="seu-projeto-nestjs"} | json | level = "warn" and context = "jobsAService" [$__range]))
```

**warnings - VERMELHO ESCURO**
```logql
sum(count_over_time({app="seu-projeto-nestjs"} | json | level = "crit" and context = "jobsAService" [$__range]))
```

## 🚀 Como Executar o Projeto

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas na sua máquina:
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/) (a versão V2, que é executada com `docker compose`)

### Configuração do Ambiente

O projeto utiliza variáveis de ambiente para configurar parâmetros importantes, como os tempos de execução dos jobs e as credenciais do banco de dados.

1.  Na raiz do projeto, crie um arquivo chamado `.env.example` com o seguinte conteúdo:

    ```env
    # Variáveis da Aplicação NestJS
    # Tempos em milissegundos para o intervalo de cada job
    JOB_A_TIME=30000
    JOB_B_TIME=40000
    JOB_C_TIME=50000

    # Credenciais do Banco de Dados PostgreSQL
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=monitoring
    ```

2.  Agora, crie o seu arquivo de configuração pessoal a partir do exemplo:

    ```bash
    cp .env.example .env
    ```

3.  Abra o arquivo `.env` e ajuste os valores se desejar. A aplicação funcionará com os valores padrão.

### Iniciando a Stack

Com o arquivo `.env` configurado, você pode iniciar todos os serviços com um único comando:

```bash
docker compose up -d --build
```


## 💻 Como Usar
Após iniciar a stack, os seguintes serviços estarão disponíveis:

API NestJS: http://localhost:5666

Grafana: http://localhost:3020

Usuário: admin 

Senha: admin (deve trocar de senha)

Para gerar logs e ver o sistema em ação, dispare uma requisição para o endpoint principal da API. Isso iniciará os setIntervals que simulam a execução contínua dos jobs.

Você pode fazer isso através do seu navegador, curl ou qualquer cliente de API:

Requisição com curl:
```
curl http://localhost:5666/jobs
```


## 🔮 Próximos Passos (Possíveis Melhorias)

- [ ] Integrar com um banco de dados **PostgreSQL** para persistir os resultados dos jobs.
- [ ] Adicionar um message broker como o **RabbitMQ** para gerenciar a execução das tarefas de forma assíncrona.
- [ ] Preparar a aplicação para deploy em um cluster **Kubernetes (K8s)**.
- [ ] Criar alertas no Grafana para serem notificados quando um job falhar.
