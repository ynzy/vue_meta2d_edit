/*
 * @Author       : zhangyong
 * @Date         : 2023-07-14 16:37:39
 * @Description  :
 */
import type { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
// import { configStyleImportPlugin } from './styleImport';
import { configAutoImportPlugin } from './autoImport';
import { configAutoComponentsPlugin } from './autocomponents';
import { configCompressPlugin } from './compress';
import VueDevTools from 'vite-plugin-vue-devtools';
import { devServerMiddleware } from './getFiles';

export function createVitePlugins(viteEnv: any, isBuild: boolean) {
  const { VITE_ENV, VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;

  const vitePlugins: (Plugin | Plugin[])[] = [
    VueDevTools() as any,
    vue(),
    vueJsx({
      include: /\.(jsx|tsx)/
    }),
    devServerMiddleware()
  ];
  // vite-plugin-style-import
  // vitePlugins.push(configStyleImportPlugin(isBuild));

  // unplugin-vue-components
  vitePlugins.push(configAutoComponentsPlugin());

  // unplugin-auto-import
  vitePlugins.push(configAutoImportPlugin());

  // vite-plugin-mock
  // vitePlugins.push(configMockPlugin(isBuild));

  // The following plugins only work in the production environment
  if (isBuild) {
    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }
  return vitePlugins;
}
