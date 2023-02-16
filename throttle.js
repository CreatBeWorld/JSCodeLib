/**
 * 使用时间戳实现函数节流
 * @param {Function} fn 要进行节流的函数
 * @param {Number} delay 等待的时间
 */
function throttle(fn, delay) {
  let pre = 0
  return (...args) => {
    let now = new Date()
    if (now - pre > delay) {
      fn(...args)
      pre = now
    }
  }
}
/**
 * 使用计时器实现函数节流
 * @param {Function} fn 要进行节流的函数
 * @param {Number} delay 等待的时间
 * @returns
 */
function throttle(fn, delay) {
  let timerId = null
  return (...args) => {
    if (!timerId) {
      fn(...args)
      timerId = setTimeout(() => {
        timerId = null
      }, delay)
    }
  }
}
