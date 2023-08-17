import { upload } from "./upload";
/**
 * 发送PV日志
 */
export function sendPV() {
	let appID, pageID, timestamp, ua;
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
	upload(`appID=${appID}&pageID=${pageID}&timestamp=${timestamp}&ua=${ua}`);
}

export default {};
