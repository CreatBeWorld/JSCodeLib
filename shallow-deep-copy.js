/**
 * 浅拷贝
 * @param {Object} src 
 * @returns {Object}
 */
function shallowCopy(src) {
  const dest = {}
  for (const key in src) {
    if (src.hasOwnProperty(key)) {
      dest[key] = src[key]
    }
  }
  return dest
}
/**
 * 深拷贝：使用递归来进行深拷贝
 * @param {Object} src 
 * @returns {Object}
 */
function deepCopy(src) {
  if (src instanceof Object) {
    if (Array.isArray(src)) {
      // src为数组时
      let arr = []
      src.forEach((key) => {
        arr.push(deepCopy(key))
      })
      return arr
    } else {
      let dest = {}
      for (const key in src) {
        const type = typeof src[key]
        if (type === 'function') {
          // src的某一属性为函数时
          dest[key] = src[key].bind(dest)
        } else if (type === 'object') {
          if (Array.isArray(src[key])) {
            // src的某一属性为数组时
            dest[key] = []
            src[key].forEach((i) => {
              dest[key].push(deepCopy(i))
            })
          } else {
            // src的某一属性为对象时
            dest[key] = deepCopy(src[key])
          }
        } else {
          // src的某一属性为基础数据类型
          dest[key] = src[key]
        }
      }
      return dest
    }
  } else {
    // 传入的数据不为对象时，直接返回原数据
    return src
  }
}

