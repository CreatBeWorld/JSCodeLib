/**
 * rem适配
 * 换算：若一元素设计稿上的尺寸为375px,则对应的rem  为375/100 = 3.75rem
 * @param {Number} designWidth 设计稿的尺寸
 */
((doc,designWidth) => {
  const html = doc.documentElement
  const refreshDom = () => {
    const width = html.clientWidth
    if (width >= designWidth) {
      // 如果设备宽度都大于设计稿了，那么测量出来是多少就是多少（即1css像素等于1物理像素）
      html.style.fontSize = '100px'
    } else {
      // 计算比例
      // 拿 iPhone6（375px） 375px/750px = 0.5 -> 1/DPR
      // 相当于现在每一列的宽度为 0.5px，相当于分成了 375px/0.5 = 750列
      // 但是现在我们设置 font-size 为 0.5px 浏览器不允许设置这么小的，因此乘以一个 100
      // 每一列的宽度就变为了 50px，375px/50 = 7.5列
      // 假设设计稿量出来的是 375px->css像素为187.5px->187.5/50(每一列的宽度)->3.75(所占列数)->3.75rem
      // 假设量出来是 100px -> 1列
      // 100px->50px/50px->1->1rem
      html.style.fontSize =100*(width/designWidth)+'px'
    }
  }
  doc.addEventListener('DOMContentLoaded',refreshDom)
})(document,750);
