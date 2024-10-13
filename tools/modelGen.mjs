/* eslint-disable no-undef */
import { toJson } from 'xml2json'
import fs from 'fs'

const solution = process.argv[2]
const typeMap = [
  { attributeType: 'nvarchar', typeRepresentation: 'string' },
  { attributeType: 'int', typeRepresentation: 'number' },
  { attributeType: 'datetime', typeRepresentation: 'Date' },
  { attributeType: 'lookup', typeRepresentation: 'string' },
]

console.log(`Generating .ts models for solution...`)

fs.readdir(`src/${solution}/solutionPackage/Entities`, (err, files) => {
  if (err) {
    console.error(err)
    return
  }

  files.forEach(file => {
    const xmlFile = `src/${solution}/solutionPackage/Entities/${file}/Entity.xml`
    const tsFile = `src/${solution}/webResources/models/${file}.ts`
    console.log(`Entity ${file}`)
    const data = fs.readFileSync(xmlFile, 'utf8')
    const json = toJson(data, { object: true })

    // Generate <entity>.ts file
    fs.writeFileSync(tsFile,
      `export interface ${file} {
${json.Entity.EntityInfo.entity.attributes.attribute?.map(
    attr => `  ${attr.LogicalName}: ${typeMap.find(t => t.attributeType === attr.Type)?.typeRepresentation || 'any'}`
    ).join('\n') || ''}
}

export const ${file}Meta = {
  logicalName: '${json.Entity.EntityInfo.entity.Name.toLowerCase()}',
  entitySetName: '${json.Entity.EntityInfo.entity.EntitySetName}',
  props: {
${json.Entity.EntityInfo.entity.attributes.attribute?.map(
    attr => `    ${attr.LogicalName}: '${attr.LogicalName}'`).join(',\n') || ''}
  }
}`
    )
  })

// Generate index.ts file for barerelated imports
fs.writeFileSync(`src/${solution}/webResources/models/index.ts`,
  `export * from './${files.join('\'\nexport * from \'./')}'`)
})