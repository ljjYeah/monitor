/**
 * 上报信息
 * @param {上报信息} data
 * @param {附加参数} options
 * eventType： PV、EXP、CLICK、CUSTOM
 */
export function upload(data, options = {}) {
  
  const params = encodeURIComponent(data);
  const { eventType = 'PV' } = options;
  const src = `http://liujuanjuan.com?data=${params}&eventType=${eventType}`
  console.log('src', src);
  let image = new Image();
  image.src = src;
  image = null;
}

export default {};
