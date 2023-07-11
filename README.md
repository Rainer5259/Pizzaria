# Pizzaria 🍕

**Esta aplicação foi desenvolvida com o objetivo de aprimorar a dinâmica de trabalho da equipe SujeitoPizza, simplificando o processo de atendimento dos pedidos dos clientes e otimizando a comunicação com a equipe de culinária. Esta solução visa melhorar a eficiência e a agilidade do atendimento, permitindo que a equipe de culinária possa iniciar o preparo dos pedidos imediatamente após sua solicitação.**

# Desenvolvimento ⚙️
  _Foram usados as tecnologias_
  - PostgreSQL, Prisma, ExpressJS, NestJS e Expo, React Native.
# Configuração de Ambiente 🛠️

**Instale as dependências executando o comando _"yarn install"_ no diretório raíz do projeto** 

**Instale o ***[PostgreSQL](http://postgresql.org)*** e ***[pgAdmin](https://www.pgadmin.org)*****

- Use PostgreSQL para inicializar os serviços configurando-o com base nas informações DATABASE_URL do arquivo .env
- Use o pgAdmin (ou [Beekeeper Studio](https://github.com/beekeeper-studio/beekeeper-studio)) para criar um novo servidor com base nas informações DATABASE_URL do arquivo .env.
- No diretório backend execute o comando _"npx prisma migrate dev --name"_ para implementar os schemas no banco de dados.
- Use um HASH generator (como [MD5](https://www.md5hashgenerator.com) para criar seu JSON Web Token e 
- Utilize o comando _"yarn_dev"_ na raíz do projeto para inializar a aplicação.
  
