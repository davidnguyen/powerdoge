/* eslint-disable no-undef */
import { checkArgs } from './lib/checkArgs.mjs'
import { spawnSync } from 'child_process'
import fs from 'fs'

const { solution } = checkArgs()

console.log('Building solution...')

spawnSync(
    'npx',
    ['webpack', '--config', `src/${solution}/webpack.config.js`, '--mode', 'production'],
    { stdio: 'inherit' }
)

if (fs.existsSync(`src/${solution}/webResources/html`)) {
    fs.copyFileSync(`src/${solution}/webResources/html/*`, `src/${solution}/dist/webResources/`)
}