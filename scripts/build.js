const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const pagesDir = path.join(srcDir, 'pages');
const partialsDir = path.join(srcDir, 'partials');
const assetsSrcDir = path.join(srcDir, 'assets');
const assetsDestDir = path.join(rootDir, 'assets');

const defaultMeta = {
  title: 'Ryan Sylvestri | Hudson Valley Real Estate Expert | RE/MAX Town & Country',
  description:
    'Ryan Sylvestri - Licensed Associate Real Estate Broker, ABR®, PSA. Your trusted Hudson Valley real estate expert with RE/MAX Town & Country. Local expertise, global reach.',
  keywords:
    'Ryan Sylvestri, real estate, Hudson Valley, Fishkill, RE/MAX, ABR, PSA, homes for sale, real estate broker',
  bodyClass: '',
  headExtra: '',
  bodyScripts: ''
};

const layoutPath = path.join(srcDir, 'layout.html');
if (!fs.existsSync(layoutPath)) {
  throw new Error('Missing layout template at src/layout.html');
}
const layoutTemplate = fs.readFileSync(layoutPath, 'utf8');

const partials = Object.fromEntries(
  fs
    .readdirSync(partialsDir)
    .filter(file => file.endsWith('.html'))
    .map(file => [path.basename(file, '.html'), fs.readFileSync(path.join(partialsDir, file), 'utf8')])
);

const renderTemplate = (template, data) =>
  template.replace(/{{\s*([\w]+)\s*}}/g, (match, key) => {
    const value = data[key];
    return value == null ? '' : String(value);
  });

const normaliseMarkup = value => {
  if (Array.isArray(value)) {
    return value.join('\n');
  }
  return value || '';
};

const ensureDir = dir => fs.mkdirSync(dir, { recursive: true });

const buildPage = file => {
  const pagePath = path.join(pagesDir, file);
  let raw = fs.readFileSync(pagePath, 'utf8');

  const metaRegex = /^<!--meta\s*([\s\S]*?)-->/;
  let meta = {};
  const match = raw.match(metaRegex);
  if (match) {
    const json = match[1].trim();
    if (json) {
      try {
        meta = JSON.parse(json);
      } catch (error) {
        throw new Error(`Failed to parse meta block in ${file}: ${error.message}`);
      }
    }
    raw = raw.slice(match[0].length).trimStart();
  }

  const data = {
    ...defaultMeta,
    ...meta,
    nav: partials.nav || '',
    footer: partials.footer || '',
    headExtra: normaliseMarkup(meta.headExtra),
    bodyScripts: normaliseMarkup(meta.bodyScripts),
    content: raw.trimStart()
  };

  const html = renderTemplate(layoutTemplate, data);

  const name = path.basename(file, path.extname(file));
  let outputPath;
  if (name === 'index') {
    outputPath = path.join(rootDir, 'index.html');
  } else {
    outputPath = path.join(rootDir, name, 'index.html');
    ensureDir(path.dirname(outputPath));
  }

  fs.writeFileSync(outputPath, html);
  return outputPath;
};

const copyAssets = () => {
  if (fs.existsSync(assetsDestDir)) {
    fs.rmSync(assetsDestDir, { recursive: true, force: true });
  }
  if (fs.existsSync(assetsSrcDir)) {
    fs.cpSync(assetsSrcDir, assetsDestDir, { recursive: true });
  }
};

const main = () => {
  const pages = fs.readdirSync(pagesDir).filter(file => file.endsWith('.html'));
  if (pages.length === 0) {
    console.warn('No pages found in src/pages');
    return;
  }

  copyAssets();
  pages.forEach(page => {
    const output = buildPage(page);
    console.log(`Built ${page} -> ${path.relative(rootDir, output)}`);
  });
};

main();
