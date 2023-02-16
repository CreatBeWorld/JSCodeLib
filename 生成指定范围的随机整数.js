/**
 * 函数名：getRandom，返回一个指定范围的随机整数
 * @param {Number} min 范围的最小值
 * @param {Number} max 范围的最大值（无法取到最大值）
 * @return {Number} 随机整数
 */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
