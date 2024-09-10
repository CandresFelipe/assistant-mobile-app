/* eslint-env node */
const { getDefaultConfig } = require('expo/metro-config')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({ path: path.resolve(__dirname, '.devcontainer/.env') })

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

module.exports = config
