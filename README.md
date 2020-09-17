# Remollege
<div style="text-align:center">
    <a href="https://pikopikopon1.uc.r.appspot.com">
        <img src="https://storage.googleapis.com/remollege-storage/static/main_visual.png" style="text-align:center; width:400px">
    </a>
    <div>
        <img src="https://img.shields.io/github/issues/Piko-Piko-Pon-Taro/Remollege?style=flat-square&logo=appveyor">
        <img src="https://img.shields.io/github/issues-pr/Piko-Piko-Pon-Taro/Remollege?style=flat-square&logo=appveyor">
        <img src="https://img.shields.io/github/forks/Piko-Piko-Pon-Taro/Remollege?style=flat-square&logo=appveyor">
        <img src="https://img.shields.io/github/stars/Piko-Piko-Pon-Taro/Remollege?style=flat-square&logo=appveyor">
        <img src="https://img.shields.io/github/workflow/status/Piko-Piko-Pon-Taro/Remollege/CI?style=flat-square&logo=appveyor">
    </div>
</div>

# Environment
- Nuxt.js
- Express
- MySQL
- Docker
- GAE
- Google Cloud SQL

# Installation
## Requires
- docker-compose@1.26.2
## Steps
### Setup local env
```
git clone git@github.com:Piko-Piko-Pon-Taro/Remollege.git
cd Remollege/test
docker-compose up -d
cd ../client
npm install || npm run dev
```
### Migrations & Seeding
```
docker-compose exec api bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```
### Connect Production Cloud Sql
api直下にcloudsqlディレクトリをぶちこむ(渡辺にもらってください)
### ローカル用.envファイル
api直下、client直下にそれぞれ`.env`をぶちこむ(誰かにもらってください)