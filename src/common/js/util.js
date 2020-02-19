/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id:12334}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let arr = url.match(reg)
  // ['?id=123454','&a=b']

  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=')// 先分割取到id=123454，之后用=号分开
      let key = decodeURIComponent(tempArr[0])
      let val = decodeURIComponent(tempArr[1])
      obj[key] = val
    })
  }
  // return obj;
  return obj
}
