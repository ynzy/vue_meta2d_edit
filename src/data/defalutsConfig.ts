//defaultConfig.js
export const menu = {
  left: [
    {
      key: 'file',
      name: '文件',
      icon: '',
      children: [
        {
          name: '新建文件',
          action: 'newFile'
        },
        {
          name: '打开文件',
          action: 'openFile'
        },
        {
          name: '导入文件',
          action: 'loadFile'
        }
      ]
    },
    {
      key: 'save',
      name: '保存',
      icon: '',
      action: 'saveFile'
    },
    {
      key: 'magnifier',
      name: '放大镜',
      icon: '',
      action: 'openMagnifier'
    },
    {
      key: 'map',
      name: '缩略图',
      icon: '',
      action: 'openMap'
    },
    {
      key: 'pen',
      name: '钢笔',
      icon: '',
      action: 'usePen'
    },
    {
      key: 'pencil',
      name: '铅笔',
      icon: '',
      action: 'usePencil'
    }
  ]
};

// 分发执行事件函数
export function dispatchFunc(act: any) {
  // doSomething before
  // @ts-ignore
  menuFunc[act]();
}
const menuFunc = {
  newFile() {},
  openFile() {},
  loadFile() {},
  saveFile() {},
  openMagnifier() {},
  openMap() {},
  usePen() {},
  usePencil() {}
};
