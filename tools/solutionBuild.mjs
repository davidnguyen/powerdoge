/* eslint-disable no-undef */
import { checkArgs } from './lib/checkArgs.mjs'
import { spawnSync } from 'child_process'
import fs from 'fs'
import { SolutionWebResourcesFolder } from './lib/constants.mjs'

const { solution } = checkArgs()

console.log(`Building solution ${solution}...`)

spawnSync(
    'npx',
    ['webpack', '--config', `src/${solution}/webpack.config.js`, '--mode', 'production'],
    { stdio: 'inherit' }
)

if (fs.existsSync(`src/${solution}/${SolutionWebResourcesFolder}/html`)) {
    fs.copyFileSync(`src/${solution}/${SolutionWebResourcesFolder}/html/*`, `src/${solution}/dist/${SolutionWebResourcesFolder}/`)
}