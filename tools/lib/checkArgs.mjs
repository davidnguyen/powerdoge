/* eslint-disable no-undef */
import fs from 'fs'

/**
 * @typedef {Object} CheckArgsResult
 * @property {string} solution The solution name in source control
 * @property {SolutionSettings} settings The solution settings
 * @property {string[]} args The arguments passed to the script
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const CheckArgsResult = {
    solution: '',
    settings: {},
    args: []
}

/**
 * @typedef {Object} SolutionSettings
 * @property {string} solutionName The name of the solution in PowerApps environments
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SolutionSettings = {
    solutionName: ''
}

/**
 * Validates the arguments passed to the script and parses the solution and it's settings
 * @returns {CheckArgsResult} The solution and it's settings
 */
export const checkArgs = () => {
    console.log('Checking arguments...')

    if (process.argv.length < 3) {
        console.error('Please specify a solution as the first argument')
        process.exit(1)
    }

    const solution = process.argv[2]
    let settings = {}

    if (!fs.existsSync(`src/${solution}`)) {
        console.error(`Solution ${solution} does not exist`)
        process.exit(1)
    }

    if (!fs.existsSync(`src/${solution}/webpack.config.js`)) {
        console.error(`Solution ${solution} does not have a webpack.config.js`)
        process.exit(1)
    }

    if (!fs.existsSync(`src/${solution}/solution.json`)) {
        console.error(`Solution ${solution} does not have a solution.json`)
        process.exit(1)
    } else {
        const solutionJson = JSON.parse(fs.readFileSync(`src/${solution}/solution.json`, 'utf8'))
        settings = solutionJson.settings.reduce((acc, setting) => {
            acc[setting.key] = setting.value
            return acc
        }, {})
    }

    return { solution, settings, args: process.argv.slice(3) }
}