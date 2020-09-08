# Remollege
<img src="https://img.shields.io/github/issues/Piko-Piko-Pon-Taro/Remollege.git">
<img src="https://img.shields.io/github/forks/Piko-Piko-Pon-Taro/Remollege.git">
<img src="https://img.shields.io/github/stars/Piko-Piko-Pon-Taro/Remollege.git">
<img src="https://img.shields.io/github/license/Piko-Piko-Pon-Taro/Remollege.git">
[Remollege](https://pikopikopon1.uc.r.appspot.com/)
# Environment
- Nuxt.js
- Swagger
- Express
- MySQL
- Docker

# Installation
## Requires
- docker-compose@1.26.2
## Steps
### Setup local env
```
git clone git@github.com:Piko-Piko-Pon-Taro/Remollege.git
cd Remollege/test
docker-compose up -d
```
### Migrations & Seeding
```
docker-compose exec api bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
