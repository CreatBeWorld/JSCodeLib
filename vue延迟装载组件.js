import { ref } from 'vue'
/**
 * 该函数用于实现延迟装载组件
 * @param {Number} maxFrameCount:希望在第几帧之内将所有组件渲染完
 * @returns {Object} 该对象包含两个属性，第一个属性defer是一个函数，
 * 用于判断当前能否渲染组件,该函数接受一个参数showInFrameCount，该参数表示：希望在第几帧之后渲染组件；第二个属性refreshFrameCount也是一个函数（更新当前帧数:该方法在script setup中调用）
 */
export default function (maxFrameCount) {
  const frameCount = ref(0) // 记录当前的帧数
  /**
   * 用于判断当前能否渲染组件
   * @param {Number} showInFrameCount 希望在第几帧之后渲染组件
   * @returns {Boolean}
   */
  const defer = (showInFrameCount) => frameCount.value >= showInFrameCount
  // 更新当前帧数:该方法在script setup中调用
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount.value++
      if (frameCount.value < maxFrameCount) {
        refreshFrameCount()
      }
    })
  }
  return {
    defer,
    refreshFrameCount
  }
}
