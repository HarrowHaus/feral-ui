import { mkdtempSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';

const registryBase = process.env.FERAL_REGISTRY_BASE ?? 'https://harrowhaus.github.io/feral-ui/r';
const items = (process.env.FERAL_REGISTRY_ITEMS ?? 'button,card,dialog,data-table').split(',').map(item => item.trim()).filter(Boolean);
const tempRoot = mkdtempSync(join(tmpdir(), 'feral-hosted-registry-'));
const appDir = join(tempRoot, 'app');

function run(command, args, options = {}) {
  console.log(`$ ${command} ${args.join(' ')}`);
  execFileSync(command, args, { stdio: 'inherit', ...options });
}

async function assertUrl(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  const json = await response.json();
  if (!json.name || !json.type || !Array.isArray(json.files)) {
    throw new Error(`${url} is not a valid registry item shape`);
  }
  return json;
}

try {
  console.log(`Hosted registry base: ${registryBase}`);
  for (const item of ['feral-style', ...items]) {
    await assertUrl(`${registryBase}/${item}.json`);
  }

  run('npm', ['create', 'vite@latest', appDir, '--', '--template', 'react-ts']);
  run('npm', ['install', '--registry=https://registry.npmjs.org', '--no-audit', '--no-fund'], { cwd: appDir });

  mkdirSync(join(appDir, 'src/lib'), { recursive: true });
  writeFileSync(join(appDir, 'src/lib/cn.ts'), `export function cn(...values: Array<string | false | null | undefined>) {\n  return values.filter(Boolean).join(' ');\n}\n`);

  for (const item of items) {
    run('npx', ['shadcn@latest', 'add', `${registryBase}/${item}.json`, '--yes'], { cwd: appDir });
  }

  run('npm', ['run', 'build'], { cwd: appDir });
  console.log(`Hosted registry smoke passed for: ${items.join(', ')}`);
} finally {
  if (process.env.FERAL_KEEP_SMOKE_DIR) {
    console.log(`Keeping smoke directory: ${tempRoot}`);
  } else {
    rmSync(tempRoot, { recursive: true, force: true });
  }
}
