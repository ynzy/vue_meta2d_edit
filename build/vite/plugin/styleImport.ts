/**
 *  Introduces component library styles on demand.
 * https://github.com/anncwb/vite-plugin-style-import
 */
import { createStyleImportPlugin } from 'vite-plugin-style-import';

export function configStyleImportPlugin(isBuild: boolean) {
  return createStyleImportPlugin({
    resolves: []
  });
}
