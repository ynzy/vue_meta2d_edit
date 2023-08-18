//defaultConfig.js
import axios from 'axios';
import { parseSvg } from '@meta2d/svg';
import { ElMessage } from 'element-plus';
import { EventAction, PenType } from '@meta2d/core';
import { useEventbus } from '@/hooks/useEventbus';

/**
 *
 * @param path 获取用户路径
 * @param extend
 * @returns
 */
function getUserDir(path: string, extend = []) {
  return async () => {
    const { data: fileList } = await axios.get(path);
    return fileList.concat(extend); // 合并路径，方便未来用户自定义扩充路径
  };
}

export const userPensUrl = {
  'icon': getUserDir('/icon/', []),
  'svg': getUserDir('/svg/', []),
  'png': getUserDir('/png/', []),
  'path2D': getUserDir('/path2D/', []),
  'canvasDraw': getUserDir('/canvasDraw/', [])
};

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
  newFile() {
    window.meta2d.open();
  },
  async openFile() {
    const file = await window.showOpenFilePicker().catch(() => {
      console.log('打开文件失败');
      return false;
    });
    if (file) {
      //@ts-ignore
      const dataObj = await file[0].getFile();
      const data = await dataObj.text();
      if (data) {
        const json = JSON.parse(data);
        window.meta2d.open(json);
        useEventbus().customEmit('opened');
      }
    }
  },
  /**
   *
   * @returns 导入svg文件
   */
  async loadFile() {
    const file = await window.showOpenFilePicker().catch(() => {
      ElMessage({ message: '打开文件失败', type: 'error' });
      return false;
    });
    if (file) {
      //判断文件类型
      // @ts-ignore
      const dataObj = await file[0].getFile();
      const data = await dataObj.text();
      if (dataObj.type === 'image/svg+xml') {
        const pen = parseSvg(data);
        meta2d.canvas.addCaches = pen;
        console.log('添加成功，请点击放置点');

        ElMessage({ message: '添加成功，请点击放置点', type: 'success' });
        return;
      }
      ElMessage({ message: '添加失败，暂且只支持svg文件', type: 'error' });
    }
  },
  saveFile() {
    const jsonData = window.meta2d.data(); // 获取数据 数据怎么来？怎么处理？
    const json = JSON.stringify(jsonData);
    const file = new Blob([json], { type: 'application/json' });
    const link = URL.createObjectURL(file);
    let a = document.createElement('a');
    a.setAttribute('download', meta2d.fileName || '未命名');
    a.setAttribute('href', link);
    a.click();
  },
  /**
   * 放大镜
   */
  openMagnifier() {
    if (window.meta2d.canvas.magnifierCanvas.magnifier) {
      // 判断放大镜状态
      window.meta2d.hideMagnifier(); // 关闭放大镜
    } else {
      window.meta2d.showMagnifier(); // 打开放大镜
    }
  },
  /**
   * 缩略图
   */
  openMap() {
    if (window.meta2d.map?.isShow) {
      window.meta2d.hideMap();
    } else {
      window.meta2d.showMap();
    }
  },
  /**
   * 使用闭包实现钢笔，判断是否在使用钢笔
   */
  // usePen: (()=>{
  //     let flat = false
  //     console.log("进来了")
  //     return ()=> {
  //         console.log("执行了")
  //         if(!flat){
  //             console.log("开始画画")
  //             window.meta2d.drawLine('curve')
  //         }else {
  //             console.log("结束画画")
  //             window.meta2d.drawLine()
  //         }
  //         flat = !flat
  //     }
  // })(),
  // TODO 使用前 判断是否已被占用
  /**
   * 钢笔
   */
  usePen() {
    if (window.meta2d.canvas.drawingLineName) {
      // 判断是否正在使用钢笔
      window.meta2d.drawLine(); // 参数为空 取消钢笔
      window.meta2d.finishPencil(); // 绘画完成
    } else {
      window.meta2d.drawLine('curve'); // 使用钢笔 线条属性为curve
    }
  },
  /**
   * 铅笔
   */
  usePencil() {
    if (window.meta2d.canvas.pencil) {
      window.meta2d.stopPencil();
      window.meta2d.finishPencil();
    } else {
      window.meta2d.drawingPencil();
    }
  },
  undo() {
    meta2d.undo();
  },
  redo() {
    meta2d.redo();
  },
  start(value, icon) {
    const a = menu.right.find((i) => i.key === 'start'); // 获取按钮元数据
    a.icon = icon; // 修改元数据的图标
    meta2d.store.data.fromArrow = value; // 修改meta2d的fromArrow样式值
    if (meta2d.store.active) {
      // 循环遍历 修改激活图元fromArrow// 样式
      meta2d.store.active.forEach((i) => {
        if (i.type === PenType.Line) {
          i.fromArrow = value;
        }
      });
    }
    meta2d.render(); //重新渲染
  },
  end(value, icon) {
    const a = menu.right.find((i) => i.key === 'end');
    a.icon = icon;
    meta2d.store.data.toArrow = value;
    if (meta2d.store.active) {
      meta2d.store.active.forEach((i) => {
        if (i.type === PenType.Line) {
          i.toArrow = value;
        }
      });
    }
    meta2d.render();
  },
  line(value, icon) {
    const a = menu.right.find((i) => i.key === 'line');
    a.icon = icon;
    meta2d.store.options.drawingLineName = value;
    meta2d.canvas.drawingLineName && (meta2d.canvas.drawingLineName = value);
    meta2d.store.active?.forEach((pen) => {
      meta2d.updateLineType(pen, value);
    });
    meta2d.render();
  },
  grid() {
    if (meta2d.store.data.grid) {
      meta2d.setGrid({
        grid: false
      });
    } else {
      meta2d.setGrid({
        grid: true,
        gridColor: '#e2e2e2',
        gridSize: 10,
        gridRotate: 0
      });
    }
    meta2d.render();
  },
  rule() {
    if (meta2d.store.data.rule) {
      meta2d.setRule({
        rule: false
      });
    } else {
      meta2d.setRule({
        rule: true,
        ruleColor: '#414141'
      });
    }
    meta2d.render();
  },
  manual() {
    meta2d.toggleAnchorMode();
  },
  saveAs(value) {
    // 选择导出格式
    switch (value) {
      case 'png':
        let name = meta2d.store.data.name;
        if (name) {
          name += '.png';
        }
        meta2d.downloadPng(name); // 导出为png
        break;
      case 'svg':
        downloadSvg(); // 导出为svg
        break;
    }
  }
};
