const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = ({ config }) => {

  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@'] = rootPath

  return config
}