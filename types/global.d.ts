/// <reference types="vite/client" />

import type { PropType as VuePropType } from 'vue';
import type { utilsType, serviceType, coreType, mitt } from '../src/package';
// import { Meta2d } from '@meta2d/core';
import { IMeta2d } from './meta2d.d.ts';

declare global {
  const meta2d: IMeta2d;
  const C2S: any;
  interface Window {
    meta2d: IMeta2d;
    C2S: any;
  }

  const __APP_INFO__: {
    pkg: {
      name: string;
      version: string;
      dependencies: Recordable<string>;
      devDependencies: Recordable<string>;
    };
    lastBuildTime: string;
  };

  // vue
  declare type PropType<T> = VuePropType<T>;

  declare type Recordable<T = any> = Record<string, T>;
  declare type ReadonlyRecordable<T = any> = {
    readonly [key: string]: T;
  };

  interface ImportMetaEnv extends ViteEnv {
    __: unknown;
  }

  declare interface ViteEnv {
    VITE_USE_RSM_PROXY: boolean;
    VITE_ENV: string;
    VITE_OUTPUT_DIR: string;
    VITE_PUBLIC_PATH: string;
    VITE_USE_MOCK: boolean;
    VITE_PORT: string;
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
    VITE_BASE_API: string;
  }
}
