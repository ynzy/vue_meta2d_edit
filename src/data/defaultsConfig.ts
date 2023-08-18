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
  ],
  right: [
    {
      key: 'undo',
      name: '撤销',
      icon: 't-angle-left',
      action: 'undo'
    },
    {
      key: 'redo',
      name: '重做',
      icon: 't-angle-right',
      action: 'redo'
    },
    {
      key: 'start',
      name: '起点',
      icon: 't-line',
      children: [
        {
          name: 'line',
          icon: 't-line',
          action: 'start',
          value: ''
        },
        {
          name: 'triangle',
          icon: 't-to-triangle',
          action: 'start',
          value: 'triangle'
        },
        {
          name: 'diamond',
          icon: 't-to-diamond',
          action: 'start',
          value: 'diamond'
        },
        {
          name: 'circle',
          icon: 't-to-circle',
          action: 'start',
          value: 'circle'
        },
        {
          name: 'lineDown',
          icon: 't-to-lineDown',
          action: 'start',
          value: 'lineDown'
        },
        {
          name: 'lineUp',
          icon: 't-to-lineUp',
          action: 'start',
          value: 'lineUp'
        },
        {
          name: 'triangleSolid',
          icon: 't-to-triangleSolid',
          action: 'start',
          value: 'triangleSolid'
        },
        {
          name: 'diamondSolid',
          icon: 't-to-diamondSolid',
          action: 'start',
          value: 'diamondSolid'
        },
        {
          name: 'circleSolid',
          icon: 't-to-circleSolid',
          action: 'start',
          value: 'circleSolid'
        },
        {
          name: 'lineArrow',
          icon: 't-to-line',
          action: 'start',
          value: 'line'
        }
      ]
    },
    {
      key: 'end',
      name: '终点',
      icon: 't-line',
      children: [
        {
          name: 'line',
          icon: 't-line',
          action: 'end',
          value: ''
        },
        {
          name: 'triangle',
          icon: 't-to-triangle',
          action: 'end',
          value: 'triangle'
        },
        {
          name: 'diamond',
          icon: 't-to-diamond',
          action: 'end',
          value: 'diamond'
        },
        {
          name: 'circle',
          icon: 't-to-circle',
          action: 'end',
          value: 'circle'
        },
        {
          name: 'lineDown',
          icon: 't-to-lineDown',
          action: 'end',
          value: 'lineDown'
        },
        {
          name: 'lineUp',
          icon: 't-to-lineUp',
          action: 'end',
          value: 'lineUp'
        },
        {
          name: 'triangleSolid',
          icon: 't-to-triangleSolid',
          action: 'end',
          value: 'triangleSolid'
        },
        {
          name: 'diamondSolid',
          icon: 't-to-diamondSolid',
          action: 'end',
          value: 'diamondSolid'
        },
        {
          name: 'circleSolid',
          icon: 't-to-circleSolid',
          action: 'end',
          value: 'circleSolid'
        },
        {
          name: 'lineArrow',
          icon: 't-to-line',
          action: 'end',
          value: 'line'
        }
      ]
    },
    {
      key: 'line',
      name: '连线',
      icon: 't-line',
      children: [
        {
          name: '直线',
          icon: ' t-line',
          action: 'line',
          value: 'line'
        },
        {
          name: '曲线',
          icon: 't-curve2',
          action: 'line',
          value: 'curve'
        },
        {
          name: '线段',
          icon: 't-polyline',
          action: 'line',
          value: 'polyline'
        },
        {
          name: '脑图',
          icon: 't-mind',
          action: 'line',
          value: 'mind'
        }
      ]
    },
    {
      key: 'manual',
      name: '手动锚点',
      icon: '',
      action: 'manual'
    },
    {
      key: 'grid',
      name: '网格',
      icon: '',
      action: 'grid'
    },
    {
      key: 'rule',
      name: '标尺',
      icon: '',
      action: 'rule'
    },
    {
      key: 'saveAs',
      name: '保存为',
      icon: '',
      children: [
        {
          name: 'svg',
          action: 'saveAs',
          value: 'svg'
        },
        {
          name: 'png',
          action: 'saveAs',
          value: 'png'
        }
      ]
    }
  ]
};

// 分发执行事件函数
export function dispatchFunc(act: string, value?: any, ...args: any) {
  // doSomething before
  // @ts-ignore
  menuFunc[act](value, ...args);
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
  /**
   * 撤销
   */
  undo() {
    meta2d.undo();
  },
  /**
   * 重做
   */
  redo() {
    meta2d.redo();
  },
  /**
   * 起点样式
   * @param value
   * @param icon
   */
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
  /**
   * 网格
   */
  grid() {
    if (meta2d.store.data.grid) {
      // 判断网格是否已经打开
      meta2d.setGrid({
        grid: false // 关闭网格
      });
    } else {
      // 设置网格 并设置属性
      meta2d.setGrid({
        grid: true,
        gridColor: '#e2e2e2',
        gridSize: 10,
        gridRotate: 0
      });
    }
    meta2d.render(); // 重新渲染
  },
  /**
   * 标尺
   */
  rule() {
    if (meta2d.store.data.rule) {
      // 查看是否已经打开rule
      meta2d.setRule({
        // 关闭rule
        rule: false
      });
    } else {
      meta2d.setRule({
        // 开启rule
        rule: true,
        ruleColor: '#414141' // 设置颜色
      });
    }
    meta2d.render(); // 重新渲染
  },
  /**
   * 设置锚点
   */
  manual() {
    meta2d.toggleAnchorMode();
  },
  /**
   * 保存
   * @param value
   */
  saveAs(value) {
    // 选择导出格式
    switch (value) {
      case 'png':
        // eslint-disable-next-line no-case-declarations
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

/**
 * 是否显示子物体
 * @param pen
 * @param store
 * @returns
 */
function isShowChild(pen, store) {
  let selfPen = pen;
  while (selfPen && selfPen.parentId) {
    const oldPen = selfPen;
    selfPen = store.pens[selfPen.parentId];
    const showChildIndex = selfPen?.calculative?.showChild;
    if (showChildIndex != undefined) {
      const showChildId = selfPen.children[showChildIndex];
      if (showChildId !== oldPen.id) {
        return false;
      }
    }
  }
  return true;
}

/**
 * 导出svg
 */
const downloadSvg = () => {
  const rect = meta2d.getRect();
  // @ts-ignore
  rect.x -= 10;
  // @ts-ignore
  rect.y -= 10;
  // @ts-ignore
  const ctx = new C2S(rect.width + 20, rect.height + 20);
  ctx.textBaseline = 'middle';
  for (const pen of meta2d.store.data.pens) {
    if (pen.visible == false || !isShowChild(pen, meta2d.store)) {
      continue;
    }
    meta2d.renderPenRaw(ctx, pen, rect);
  }

  let mySerializedSVG = ctx.getSerializedSvg();
  if (meta2d.store.data.background) {
    mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
    mySerializedSVG = mySerializedSVG.replace('{{bkRect}}', `<rect x="0" y="0" width="100%" height="100%" fill="${meta2d.store.data.background}"></rect>`);
  } else {
    mySerializedSVG = mySerializedSVG.replace('{{bk}}', '');
    mySerializedSVG = mySerializedSVG.replace('{{bkRect}}', '');
  }

  mySerializedSVG = mySerializedSVG.replace(/--le5le--/g, '&#x');

  const urlObject = window.URL || window;
  const export_blob = new Blob([mySerializedSVG]);
  const url = urlObject.createObjectURL(export_blob);

  const a = document.createElement('a');
  a.setAttribute('download', `${meta2d.store.data.name || 'le5le.meta2d'}.svg`);
  a.setAttribute('href', url);
  const evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  a.dispatchEvent(evt);
};
