export default function raf(callback) {
  // requestAnimationFrame：在浏览器器下一次重绘之前运行回调函数
  // 下面的代码是实现在下一次重绘之后运行回调函数
  requestAnimationFrame(() => {
    requestAnimationFrame(callback)
  })
}
