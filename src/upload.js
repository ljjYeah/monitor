/**
 * 上报信息
 * @param {上报信息} data
 * @param {附加参数} options
 * eventType： PV、EXP、CLICK、CUSTOM
 */
export function upload(data, options = {}) {
  const { eventType = 'PV' } = options;
  const params = `${data}&eventType=${eventType};`
  const src = `http://www.imooc.com?${params}`
  let image = new Image();
  image.src = src;
  image = null;
  return {
    url: src,
    data: params
  }
}

export default {};
