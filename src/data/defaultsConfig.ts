//defaultConfig.js
import axios from 'axios';
import { parseSvg } from '@meta2d/svg';
import { ElMessage } from 'element-plus';
import { EventAction, PenType } from '@meta2d/core';
import { useEventbus } from '@/hooks/useEventbus';
import { httpRequest } from '@/api/request';
import { openFileUpload } from '@/utils';

/**
 *
 * @param path 获取用户路径
 * @param extend
 * @returns
 */
function getUserDir(path: string, extend = []) {
  return async () => {
    const res = await httpRequest.get(path);
    const fileList = res.data;
    return fileList.concat(extend); // 合并路径，方便未来用户自定义扩充路径
  };
}
/**
 * 用户定义路径的url
 */
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
    const data = await openFileUpload();
    const json = JSON.parse(data);
    window.meta2d.open(json);
    useEventbus().customEmit('opened');
    // const file = await window.showOpenFilePicker().catch(() => {
    //   console.log('打开文件失败');
    //   return false;
    // });
    // if (file) {
    //   //@ts-ignore
    //   const dataObj = await file[0].getFile();
    //   const data = await dataObj.text();
    //   if (data) {
    //     const json = JSON.parse(data);
    //     window.meta2d.open(json);
    //     useEventbus().customEmit('opened');
    //   }
    // }
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

/**
 * 图纸配置
 */
export const mapProps = {
  fileName: '',
  color: '#eeeeee',
  penBackground: '',
  background: '',
  backGroundImage: '',
  rule: false,
  ruleColor: '',
  grid: false,
  gridColor: '',
  gridSize: 10,
  gridRotate: 90
};

export const communicateProp = {
  websocketUrl: '',
  websocketConnected: false,
  mqttUrl: 'ws://broker.emqx.io:8083/mqtt',
  mqttConnected: false,
  clientId: '',
  username: '',
  password: '',
  mqttTopics: 'le5le'
};

/**
 * 全局配置
 */
export const globalConfigProps = {
  color: '',
  activeColor: '',
  hoverColor: '',
  hoverBackground: '',
  anchorColor: '',
  anchorRadius: 0,
  anchorBackground: '',
  dockColor: '',
  dragColor: '',
  animateColor: '',
  textColor: '',
  fontFamily: '',
  fontSize: 0,
  lineHeight: 0,
  textAlign: '',
  textBaseline: '',
  rotateCursor: '',
  hoverCursor: '',
  disableInput: false,
  disableRotate: false,
  disableAnchor: false,
  disableEmptyLine: false,
  disableRepeatLine: false,
  disableScale: false,
  disableDockLine: false,
  disableTranslate: false,
  minScale: 0.1,
  maxScale: 10,
  autoAnchor: true,
  interval: 60,
  animateInterval: 60,
  textRotate: true,
  textFlip: false
};

/**
 * 外观属性
 */
export const appearanceProps = {
  x: 0,
  y: 0,
  text: '',
  // color: '',
  'color': 'rgba(179, 152, 162, 1)',
  width: 0,
  height: 0,
  // lineWidth: 0,
  // borderWidth: 0,
  // borderColor: '',
  'lineWidth': 10,
  'borderWidth': 5,
  'borderColor': 'rgba(98, 52, 52, 1)',
  hoverColor: '',
  activeColor: '',
  strokeType: 0, // 线条渐变
  lineGradientColors:
    'linear-gradient(90deg,rgba(255, 98, 46, 1) 0%,rgb(255, 98, 46) 18%,rgb(204, 0, 0) 20%,rgb(255, 98, 46) 50%,rgb(204, 0, 0) 80%,rgb(255, 98, 46) 82%,rgb(255, 98, 46) 100%)', // 线条渐变色
  gradientSmooth: 1, // 平滑度
  background: '',
  hoverBackground: '',
  activeBackground: '',
  shadowColor: '',
  shadowBlur: 0,
  textHasShadow: false,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  anchorColor: '',
  anchorRadius: 0,
  borderRadius: 0,
  globalAlpha: 0,
  ratio: false,
  rotate: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingRight: 0,
  paddingLeft: 0,
  progress: 0,
  progressColor: '',
  verticalProgress: false,
  flipX: false,
  flipY: false,
  dash: 0,
  fontFamily: '',
  fontSize: 0,
  textColor: '',
  hoverTextColor: '',
  activeTextColor: '',
  textBackground: '',
  textAlign: '',
  textBaseline: '',
  lineHeight: 0,
  whiteSpace: '',
  textWidth: 0,
  textHeight: 0,
  ellipsis: '',
  hiddenText: false,
  disableAnchor: false,
  disableInput: false,
  disableRotate: false,
  disableSize: false,
  image: ''
};

// 事件类型
export const eventType = [
  {
    name: '鼠标移入',
    event: 'enter'
  },
  {
    name: '鼠标移出',
    event: 'leave'
  },
  {
    name: '选中',
    event: 'active'
  },
  {
    name: '取消选中',
    event: 'inactive'
  },
  {
    name: '单击',
    event: 'click'
  },
  {
    name: '双击',
    event: 'dbclick'
  }
];

// 事件行为
export const eventBehavior = [
  {
    name: '打开链接',
    behavior: EventAction.Link,
    depend: [
      {
        name: '链接地址',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'URL'
        },
        bindData: ''
      },
      {
        name: '打开方式',
        type: 'select',
        bindProp: 'params',
        option: {
          list: [
            {
              name: '新窗口打开',
              value: '_blank'
            },
            {
              name: '覆盖当前页面',
              value: 'self'
            }
          ]
        },
        bindData: ''
      }
    ]
  },
  {
    name: '执行动画',
    behavior: EventAction.StartAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '暂停动画',
    behavior: EventAction.PauseAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '停止动画',
    behavior: EventAction.StopAnimate,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '播放视频',
    behavior: EventAction.StartVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '暂停视频',
    behavior: EventAction.PauseVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  },
  {
    name: '停止视频',
    behavior: EventAction.StopVideo,
    depend: [
      {
        name: '目标id/tag',
        type: 'input',
        bindProp: 'value',
        option: {
          placeholder: 'id/tag'
        },
        bindData: ''
      }
    ]
  }
];

export const animateProps = {
  animateName: '',
  frames: [],
  animateDuration: 0,
  autoPlay: false,
  animateCycle: Infinity,
  lineAnimateType: 0,
  animateDash: null,
  animateReverse: false,
  animateColor: '' // 动画颜色
};

/**
 * 动画类型
 */
export const animateType = [
  {
    name: '跳动',
    key: 'bounce',
    frames: [
      {
        duration: 300,
        y: 10
      }
    ]
  },
  {
    name: '旋转',
    key: 'rotate',
    frames: [
      {
        duration: 1000,
        rotate: 360
      }
    ]
  },
  {
    name: '提示',
    key: 'tip',
    frames: [
      {
        duration: 300,
        scale: 1.3
      }
    ]
  }
];

/**
 * 线路动画类型
 */

export const lineAnimateType = [
  {
    name: '水流',
    key: 'stream',
    value: 0
  },
  {
    name: '水珠流动',
    key: 'waterFlow',
    value: 1
  },
  {
    name: '圆点',
    key: 'dot',
    value: 2
  }
];

/**
 * 动画线条样式
 */

export const animateDash = [
  {
    name: '点虚线',
    key: 'dot_dash',
    value: 0
  }
  // {
  //   name: '水珠流动',
  //   key: 'waterFlow',
  //   value: 1
  // },
  // {
  //   name: '圆点',
  //   key: 'dot',
  //   value: 2
  // }
];
