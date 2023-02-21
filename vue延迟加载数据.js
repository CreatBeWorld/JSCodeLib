/**
 * 延迟加载数据
 * @param {Number} maxFrameCount 在指定帧数之内加载完所有数据
 * @returns {Function} 返回一个函数，使用该函数可以更新当前帧数并每隔一帧往dataArrayRef(目标数据) 中添加数据
 */
export default function (maxFrameCount) {
  let frameCount = 0 // 当前帧
  /**
   * 更新当前帧数并每隔一帧往dataArrayRef 中添加数据
   * @param {Array} dataArrayRef Array ref 目标数据
   * @param {Array} remoteDataArray 远程获取的数据
   */
  const refreshFrameCount = (dataArrayRef, remoteDataArray) => {
    requestAnimationFrame(() => {
      const len = dataArrayRef.value.length
      frameCount++
      dataArrayRef.value.push(
        ...remoteDataArray.slice(
          len,
          len + Math.ceil(remoteDataArray.length / maxFrameCount)
        )
      )
      if (frameCount < maxFrameCount) {
        refreshFrameCount(dataArrayRef, remoteDataArray)
      }
    })
  }
  return refreshFrameCount
}
