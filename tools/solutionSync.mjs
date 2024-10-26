/* eslint-disable no-undef */
import { checkArgs } from './lib/checkArgs.mjs'
import { spawnSync } from 'child_process'
import { SolutionPackageFolder, SolutionExportFile } from './lib/constants.mjs'
import fs from 'fs'

const { solution, settings } = checkArgs()

console.log(`Sync solution ${solution}...`)
console.log(`Exporting solution ${solution}...`)
spawnSync(
    'pac',
    ['solution', 'export', '-p', `src/${solution}/dist/${SolutionExportFile}`, '-n', settings.solutionName, '-ow'],
    { stdio: 'inherit' }
)

console.log(`Unpacking solution ${solution}...`)
if (fs.existsSync(`src/${solution}/${SolutionPackageFolder}`)) {
    fs.rmdirSync(`src/${solution}/${SolutionPackageFolder}`, { recursive: true, force: true })
}
spawnSync(
    'pac',
    ['solution', 'unpack', '--zipfile', `src/${solution}/dist/${SolutionExportFile}`, '--folder', `src/${solution}/${SolutionPackageFolder}`],
    { stdio: 'inherit' }
)