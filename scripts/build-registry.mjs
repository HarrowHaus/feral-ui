import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { basename, join } from 'node:path';

const root = process.cwd();
const uiDir = join(root, 'src/components/ui');
const blockDir = join(root, 'src/blocks');
const outDir = join(root, 'public/r');
const itemDir = join(root, 'registry/items');
mkdirSync(outDir, { recursive: true });
mkdirSync(itemDir, { recursive: true });

const dependencyHints = new Map([
  ['dialog', ['@radix-ui/react-dialog']],
  ['sheet', ['@radix-ui/react-dialog']],
  ['popover', ['@radix-ui/react-popover']],
  ['tooltip', ['@radix-ui/react-tooltip']],
  ['hover-card', ['@radix-ui/react-hover-card']],
  ['dropdown-menu', ['@radix-ui/react-dropdown-menu']],
  ['menubar', ['@radix-ui/react-menubar']],
  ['navigation-menu', ['@radix-ui/react-navigation-menu']],
  ['progress', ['@radix-ui/react-progress']],
  ['slider', ['@radix-ui/react-slider']],
  ['alert-dialog', ['@radix-ui/react-alert-dialog']],
  ['avatar', ['@radix-ui/react-avatar']],
  ['context-menu', ['@radix-ui/react-context-menu']],
  ['scroll-area', ['@radix-ui/react-scroll-area']],
  ['separator', ['@radix-ui/react-separator']],
  ['toggle', ['@radix-ui/react-toggle']],
  ['toggle-group', ['@radix-ui/react-toggle-group']],
  ['command', ['cmdk']],
]);

const uiFiles = readdirSync(uiDir).filter(file => file.endsWith('.tsx')).sort();
const uiNames = new Set(uiFiles.map(file => file.replace(/\.tsx$/, '')));

function titleCase(name) {
  return name.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
}

function localUiDependencies(content, selfName) {
  const deps = new Set(['feral-style']);
  const directImports = [...content.matchAll(/from\s+["']\.\/([^"']+)["']/g)].map(match => match[1].replace(/\.tsx$/, ''));
  for (const dep of directImports) {
    if (dep !== selfName && uiNames.has(dep)) deps.add(dep);
  }
  if (content.includes('../../lib/cn')) deps.add('cn');
  return [...deps].filter(dep => dep !== selfName);
}

function uiItemFor(name, filePath) {
  const content = readFileSync(filePath, 'utf8');
  const registryDependencies = localUiDependencies(content, name).filter(dep => dep !== 'cn');
  const files = [
    {
      path: `src/components/ui/${basename(filePath)}`,
      type: 'registry:ui',
      content,
    },
  ];
  if (content.includes('../../lib/cn')) {
    files.push({ path: 'src/lib/cn.ts', type: 'registry:lib', content: readFileSync(join(root, 'src/lib/cn.ts'), 'utf8') });
  }
  return {
    '$schema': 'https://ui.shadcn.com/schema/registry-item.json',
    name,
    title: titleCase(name),
    type: 'registry:ui',
    description: `feral/ui ${titleCase(name)} component. Generated locally; install-test before publishing, cowardly and correctly.`,
    dependencies: dependencyHints.get(name) ?? [],
    registryDependencies,
    files,
  };
}

function blockItemFor(name, filePath) {
  const content = readFileSync(filePath, 'utf8');
  return {
    '$schema': 'https://ui.shadcn.com/schema/registry-item.json',
    name: `block-${name}`,
    title: `${titleCase(name)} Block`,
    type: 'registry:block',
    description: `feral/ui ${titleCase(name)} block source. Generated locally; templates still need fresh-app install receipts.`,
    dependencies: [],
    registryDependencies: ['feral-style'],
    files: [
      { path: `src/blocks/${basename(filePath)}`, type: 'registry:block', content },
      { path: 'src/blocks/index.ts', type: 'registry:block', content: readFileSync(join(root, 'src/blocks/index.ts'), 'utf8') },
    ],
  };
}

const entries = [];

const styleItem = {
  '$schema': 'https://ui.shadcn.com/schema/registry-item.json',
  name: 'feral-style',
  title: 'Feral Style',
  type: 'registry:style',
  description: 'Controlled-variance CSS token grammar and component classes.',
  files: [{ path: 'src/styles/feral.css', type: 'registry:style', content: readFileSync(join(root, 'src/styles/feral.css'), 'utf8') }],
};
writeItem(styleItem);
entries.push({ name: 'feral-style', type: 'registry:style', path: 'public/r/feral-style.json' });

for (const file of uiFiles) {
  const name = file.replace(/\.tsx$/, '');
  const item = uiItemFor(name, join(uiDir, file));
  writeItem(item);
  entries.push({ name, type: 'registry:ui', path: `public/r/${name}.json` });
}

if (existsSync(blockDir)) {
  const blockFiles = readdirSync(blockDir).filter(file => file.endsWith('.tsx')).sort();
  for (const file of blockFiles) {
    const name = file.replace(/\.tsx$/, '');
    const item = blockItemFor(name, join(blockDir, file));
    writeItem(item);
    entries.push({ name: item.name, type: 'registry:block', path: `public/r/${item.name}.json` });
  }
}

const templateItem = {
  '$schema': 'https://ui.shadcn.com/schema/registry-item.json',
  name: 'template-catalog',
  title: 'Template Catalog',
  type: 'registry:page',
  description: 'feral/ui template catalog basis. Previewable in dogfood app; public install after smoke tests.',
  dependencies: [],
  registryDependencies: ['feral-style'],
  files: [{ path: 'src/templates/template-catalog.tsx', type: 'registry:page', content: readFileSync(join(root, 'src/templates/template-catalog.tsx'), 'utf8') }],
};
writeItem(templateItem);
entries.push({ name: 'template-catalog', type: 'registry:page', path: 'public/r/template-catalog.json' });

const registry = {
  '$schema': 'https://ui.shadcn.com/schema/registry.json',
  name: 'feral-ui-local',
  homepage: 'https://example.invalid/feral-ui-local',
  items: entries,
};
writeFileSync(join(root, 'registry/registry.json'), JSON.stringify(registry, null, 2));
writeFileSync(join(outDir, 'index.json'), JSON.stringify(registry, null, 2));
console.log(`Generated ${entries.length} registry records: ${entries.filter(e => e.type === 'registry:ui').length} ui, ${entries.filter(e => e.type === 'registry:block').length} blocks. Publish them only after fresh-app install tests. The goblin has been warned twice.`);

function writeItem(item) {
  writeFileSync(join(outDir, `${item.name}.json`), JSON.stringify(item, null, 2));
  writeFileSync(join(itemDir, `${item.name}.json`), JSON.stringify(item, null, 2));
}
