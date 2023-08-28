/**
 * 读取public下的图标文件
 * svg\png\icon\canvasDraw\path2D
 */

import * as path from 'path';
import fs from 'fs';

export function devServerMiddleware() {
  return {
    name: 'vite-plugin-get-files', // 插件名，标准配置
    configureServer(server) {
      // 方法
      server.middlewares.use(
        // 引入中间间
        (req, res, next) => {
          const url = req.originalUrl; // 获取请求的源路径
          if (
            (url.startsWith('/svg/') || url.startsWith('/png/') || url.startsWith('/icon/') || url.startsWith('/canvasDraw/') || url.startsWith('/path2D/')) &&
            url.endsWith('/')
          ) {
            // 路径判断 特殊处理svg和png路径的
            const pwd = decodeURI(path.join(__dirname, '../../../public', url)); // 路径
            // console.log('路径', pwd);

            try {
              const files = fs.readdirSync(pwd, {
                //  同步读取文件夹
                withFileTypes: true
              });
              const list = [];
              for (const item of files) {
                if (item.isDirectory()) {
                  // 判断是否为文件夹
                  list.push({ name: item.name, type: 'directory' });
                } else {
                  // 非文件夹  则返回文件名  为了懒加载实现
                  list.push({ name: item.name });
                }
              }
              const json = JSON.stringify(list);
              console.log('解析完成的图标列表', json);
              handleWriteFile(url, json);
              res.end(json);
            } catch (e) {
              console.log('图标列表解析错误', e);

              return;
            }
          } else {
            next(); // 跳到下一步
          }
        }
      );
    }
  };
}

const handleWriteFile = (url, json) => {
  const decodedUrl = decodeURIComponent(url);
  const urlPathSegments = decodedUrl.split('/').filter((segment) => segment !== '');
  // 创建 JSON 存储目录
  const jsonRootDir = path.join(__dirname, '../../../public/iconJson');
  const subDirPath = path.join(jsonRootDir, ...urlPathSegments);

  try {
    fs.mkdirSync(subDirPath, { recursive: true });
    const jsonFileName = 'data.json';
    const jsonFilePath = path.join(subDirPath, jsonFileName);

    try {
      fs.writeFileSync(jsonFilePath, json);
      console.log('JSON 文件写入成功：', jsonFilePath);
    } catch (error) {
      console.error('写入 JSON 文件时发生错误：', error);
    }
  } catch (error) {
    console.error('创建子目录时发生错误：', error);
    return;
  }
};
