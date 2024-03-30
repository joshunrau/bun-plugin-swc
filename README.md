> :warning:&nbsp; This package is deprecated and no longer maintained, since Bun now supports `emitDecoratorMetadata`. 

# bun-plugin-swc

A Bun plugin for transpiling TypeScript with SWC (Speedy Web Compiler).

## Background

As of September 2023, Bun does not support `emitDecoratorMetadata`, which limits its compatibility with popular libraries such as NestJS. To address this issue, this plugin transpiles TypeScript imports using SWC, then feeds the resulting JavaScript code back into Bun's default JavaScript loader. 

## Install

```shell
bun add --dev bun-plugin-swc
```

## Usage

First, create a preload script to load the plugin:

**preload.ts**

```typescript
import { plugin } from 'bun';
import swcPlugin from 'bun-plugin-swc';

void plugin(swcPlugin());
```

Then, add the preload script to your [`bunfig.toml`](https://bun.sh/docs/runtime/bunfig):

**bunfig.toml**

```toml
preload = ["./preload.ts"]

[test]
preload = ["./preload.ts"]
```

For a real world example, see the `example` project in this repository. 
