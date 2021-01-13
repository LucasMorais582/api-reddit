# api-reddit
Api coletora de dados específicos do reddit a partir da execução de um Job, além da disponibilização de endpoint para consultas aos dados que estão sendo armazenados automaticamente.

## Tecnologias

- Yarn Package
- NodeJs
- Typescript
- Express
- Typeorm
- MySql
- Cron
- Axios

## Preparação do ambiente

Clonando o projeto
```
git clone https://github.com/LucasMorais582/api-reddit.git
```

## Pré-requisitos:
- Node.js

## Banco de dados:
- O primeiro passo é instalar o [Docker](https://docs.docker.com/engine/install/) na sua máquina
- Em seguida, instalar a imagem do [Mysql](https://hub.docker.com/_/mysql). Caso nunca tenha utilizado o Mysql na sua máquina, é necessário criar seu login para ter acesso.
- Criar um banco de dados com o nome: "desafio_winnin" ou com o nome que desejar, desde que altere também no arquivo 'ormconfig.json' e altere os parâmetros 'username' e 'password' (Nesse passo, pode-se utilizar o phpAdmin ou algum programa como o [Dbeaver](https://dbeaver.io/) ou [Mysql Workbanch](https://www.mysql.com/products/workbench/) para realizar a conexão com a imagem).


## Passos para inicializar a aplicação:

Instalar todas as dependencias:
```
yarn init
```

Após entrar no diretório do projeto pelo terminal, realizar a criação das tabelas do banco com o comando:
```
yarn typeorm migration:run
```

Inicializar a aplicação com o comando:
```
yarn dev:server
```

Para acessar a aplicação, utilize uma API Client como [Postman](https://www.postman.com/) ou [Insomnia Core](https://insomnia.rest/download/), a porta disponível para conexão é a 3333 e os endpoints disponíveis são:

- http://localhost:3333/posts/users
- http://localhost:3333/posts/period

Ambos os endpoints contam com a possibilidade de ordenação por número de ups ou número de comentários, por exemplo:
- http://localhost:3333/posts/users?order=ups

Por último, o segundo endpoint pede 2 parâmetros (assim como o order, se tratam de query params, ou seja, são colocados na url), initial_date e final_date, ambas no formato AAAA-MM-DD, para estabelecer o período de criação dos posts que devem ser retornados.
