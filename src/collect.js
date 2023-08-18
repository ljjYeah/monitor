import qs from 'qs';
import { upload } from './upload';

/**
 * 参数创建前的钩子函数
 */
let beforeCreateParams;
/**
 * 上报前的钩子函数
 */
let beforeUpload;
/**
 * 上报后的钩子函数
 */
let afterUpload;
/**
 * 报错的钩子函数
 */
let onError = function (e) {
  console.error(e);
};

/**
 * 发送PV日志
 */
export function collect(data, options) {
  let appID, pageID, timestamp, ua;
  beforeCreateParams && beforeCreateParams();
  // 采集页面的基本信息
  // 1、应用（meta标签下的app-id）
  // 2、页面（body标签下的page-id）
  const metaList = document.getElementsByTagName('meta');
  for (let i = 0; i < metaList.length; i++) {
    let meta = metaList[i];
    if (meta.getAttribute('app-id')) {
      appID = meta.getAttribute('app-id');
      break;
    }
  }
  const body = document.body;
  pageID = body.getAttribute('page-id');
  if (!appID || !pageID) {
    return;
  }
  // 日志上报信息收集
  // 1、应用ID&页面ID
  // 2、用户的访问时间
  // 3、用户的信息
  timestamp = new Date().getTime();
  ua = window.window.navigator.userAgent;
  // 调用日志上报API
  let params = {
    appID,
    pageID,
    timestamp,
    ua,
    ...data,
  };
  params = qs.stringify(params);
  if (beforeUpload) {
    params = beforeUpload(params);
  }
  let url, uploadData;
  try {
    const result = upload(params, options);
    url = result.url;
    uploadData = result.data;
  } catch (e) {
    onError(e);
  } finally {
    afterUpload && afterUpload(url, uploadData);
  }
}

export function sendPV() {
  collect({}, { eventType: 'PV' });
}

export function sendEXP(data) {
  collect(data, { eventType: 'EXP' });
}

export function registerBeforeCreateParams(fn) {
  beforeCreateParams = fn;
}

export function registerBeforeUpload(fn) {
  beforeUpload = fn;
}

export function registerAfterUpload(fn) {
  afterUpload = fn;
}

export function registerOnError(fn) {
  onError = fn;
}
export default {};
