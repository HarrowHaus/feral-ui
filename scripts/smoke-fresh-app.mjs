import { existsSync, mkdirSync, rmSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'registry/registry.json');
if (!existsSync(registryPath)) throw new Error('registry/registry.json missing. Run npm run registry:build first.');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const sandbox = join(root, '.smoke/fresh-app');
rmSync(sandbox, { recursive: true, force: true });
mkdirSync(sandbox, { recursive: true });

const names = new Set(registry.items.map((item) => item.name));
for (const entry of registry.items) {
  const item = JSON.parse(readFileSync(join(root, entry.path), 'utf8'));
  if (Array.isArray(item.registryDependencies)) {
    for (const dep of item.registryDependencies) {
      if (!names.has(dep)) throw new Error(`${item.name} references missing registry dependency ${dep}`);
    }
  }
  for (const file of item.files ?? []) {
    const target = join(sandbox, file.path);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, file.content ?? '');
  }
}

const required = [
  'src/styles/feral.css',
  'src/lib/cn.ts',
  'src/components/ui/button.tsx',
  'src/components/ui/dialog.tsx',
  'src/components/ui/code-tabs.tsx',
  'src/blocks/marketing.tsx',
  'src/templates/template-catalog.tsx',
];
for (const file of required) {
  if (!existsSync(join(sandbox, file))) throw new Error(`Fresh app materialization missing ${file}`);
}
console.log(`Fresh-app materialization smoke passed: ${registry.items.length} registry items wrote into .smoke/fresh-app. This validates paths/dependencies, not remote CLI hosting.`);
