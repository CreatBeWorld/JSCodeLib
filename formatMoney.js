/**
 * 金额每隔3位使用指定的分隔符进行分割
 * @param {Number} money
 * @param {String} split 分隔符
 * @param {Number} fixedDigit 保留几位小数
 */
export default function formatMoney(money, split = ',', fixedDigit = 2) {
  const val = money.toFixed(fixedDigit).toString().split('.')
  return val[0].replace(/(?=(\d{3})+$)/g, split) + '.' + val[1]
}
