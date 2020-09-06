echo "==== START SETUP ===="
if ! npm install; then
  exitWithError "npm install"
fi
if ! npx sequelize-cli db:migrate; then
  exitWithError "migration"
fi
if ! npx sequelize-cli db:seed:all; then
  exitWithError "seeding"
fi
echo "==== COMPLETE SETUP ===="
npm run dev

function exitWithError() {
  echo "$1 failed! stop setup..."
  exit 1
}
