const fs = require('fs');
const path = require('path');

const tilesDir = path.join(__dirname, '../src/components/tiles');
const outputFile = path.join(__dirname, '../src/components/tileRegistry.ts');

const files = fs.readdirSync(tilesDir).filter(file => file.endsWith('.tsx'));

const imports = files.map(file => {
  const name = path.basename(file, '.tsx');
  return `import ${name} from './tiles/${name}';`;
});

const registry = files.map(file => {
  const name = path.basename(file, '.tsx');
  return `  ${name},`;
});

const content = `${imports.join('\n')}

export const tileRegistry = {
${registry.join('\n')}
};
`;

fs.writeFileSync(outputFile, content);
console.log(`✅ tileRegistry.ts generated with ${files.length} tiles.`);
