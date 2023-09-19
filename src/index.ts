import swc from '@swc/core';
import { type BunPlugin } from 'bun';

const swcPlugin = (): BunPlugin => ({
  name: 'bun-plugin-swc',
  setup: (build) => {
    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      const output = await swc.transformFile(args.path, {
        jsc: {
          keepClassNames: true,
          parser: {
            decorators: true,
            dynamicImport: true,
            syntax: 'typescript'
          },
          preserveAllComments: true,
          target: 'esnext',
          transform: {
            decoratorMetadata: true,
            legacyDecorator: true
          }
        },
        module: {
          type: 'es6'
        }
      });
      return {
        contents: output.code,
        loader: 'js'
      };
    });
  }
});

export default swcPlugin;
