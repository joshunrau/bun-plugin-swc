import { type Options as SwcOptions } from '@swc/core';
import { type BunPlugin } from 'bun';

type SwcPluginOptions = {
  swc?: SwcOptions;
};

const swcPlugin = (options?: SwcPluginOptions): BunPlugin => ({
  name: 'bun-plugin-swc',
  setup: async (build) => {
    const { transformFile } = await import('@swc/core');
    const _ = await import('lodash');

    build.onLoad({ filter: /\.ts$/ }, async (args) => {
      const output = await transformFile(
        args.path,
        _.merge(options?.swc, {
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
        } satisfies SwcOptions)
      );
      return {
        contents: output.code,
        loader: 'js'
      };
    });
  }
});

export default swcPlugin;
