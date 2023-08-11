/**
 * Mock plugin for development and production.
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock';

export function configMockPlugin(isBuild: boolean) {
    return viteMockServe({
        ignore: /^_/,
        mockPath: 'mock', // 设置模拟.ts 文件的存储文件夹
        localEnabled: !isBuild, // 设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        prodEnabled: isBuild, // 设置打包是否启用 mock 功能
        watchFiles: true, // 监视⽂件更改，并重新加载 mock 数据
        injectCode: `
        		import { setupProdMockServer } from '../mock/_createProductionServer';
        		setupProdMockServer();
        		`
    });
}
