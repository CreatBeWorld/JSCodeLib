/**
 * 函数防抖
 * @param {Function} fn 需要进行防抖的函数
 * @param {Number} delay 间隔时间
 * @returns 函数
 */
function debounce(fn, delay) {
  let timerId = null
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
