/* eslint-disable no-undef */
import fs from 'fs'

export const checkArgs = () => {
    console.log('Checking arguments...')

    if (process.argv.length < 3) {
        console.error('Please specify a solution as the first argument')
        process.exit(1)
    }

    const solution = process.argv[2]

    if (!fs.existsSync(`src/${solution}`)) {
        console.error(`Solution ${solution} does not exist`)
        process.exit(1)
    }

    return { solution, args: process.argv.slice(3) }
}