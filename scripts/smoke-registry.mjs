import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'registry/registry.json');
if (!existsSync(registryPath)) throw new Error('registry/registry.json missing. Run npm run registry:build first.');
const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
if (!Array.isArray(registry.items) || registry.items.length < 10) throw new Error('Registry index has too few items.');

for (const entry of registry.items) {
  const jsonPath = join(root, entry.path);
  if (!existsSync(jsonPath)) throw new Error(`Missing registry item: ${entry.path}`);
  const item = JSON.parse(readFileSync(jsonPath, 'utf8'));
  if (!item.name || !item.type || !Array.isArray(item.files)) throw new Error(`Malformed item: ${entry.path}`);
  for (const file of item.files) {
    if (!file.path || typeof file.content !== 'string') throw new Error(`Malformed file payload in ${entry.path}`);
    if (file.path.startsWith('src/components') && !existsSync(join(root, file.path))) throw new Error(`Source path missing for ${entry.path}: ${file.path}`);
  }
}
console.log(`Registry smoke passed for ${registry.items.length} records. This is structural validation, not a public install guarantee.`);
