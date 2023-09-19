import path from 'path';

import bunPluginSwc from 'bun-plugin-swc';

const result = await Bun.build({
  entrypoints: [path.resolve(import.meta.dir, 'src', 'main.ts')],
  external: ['@nestjs/microservices', '@nestjs/websockets/socket-module'],
  outdir: path.resolve(import.meta.dir, 'dist'),
  plugins: [bunPluginSwc],
  target: 'bun'
});

if (result.success) {
  console.log('Done!');
} else {
  console.log(result);
}

