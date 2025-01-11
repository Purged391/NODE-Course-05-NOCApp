# NOC Application

The objetive is to create some tasks using Clean Architecture with Typescript

# dev
1. Clone the file .env.template to .env
2. Configure environment variables
```
PORT=

MAILER_EMAIL=
MAILER_SECRET_KEY=

PROD=
```
3. Execute command
```
npm install
```
4. Start DB with command
```
docker compose up -d
``` 
5. Start Prisma
```
npx prisma migrate dev
``` 
1. Run
```
npm run dev
```