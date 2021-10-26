/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('before:browser:launch', (browser = {}, launchOptions) => {
    //launch chrome in incognito mode
    launchOptions.args.push(`${config.env.incognito}`)
    return launchOptions
  })

  require('cypress-grep/src/plugin')(config)

  const fs = require('fs-extra')
  const path = require('path')

  const env = config.env.configFile || 'development'
  require('dotenv').config({ path: `cypress/configFiles/${env}/.env}` })

  const pathToConfigFile = path.resolve(
    '../',
    `Cypress-Helper/cypress/configFiles/${env}`,
    `${env}.json`
  )

  envConfigFile = fs.readJsonSync(pathToConfigFile)

  Object.entries(envConfigFile).forEach((entry) => {
    const [key, value] = entry
    config[key] = value
  })

  config.env.secretKey = process.env.secretKey

  return config
}
