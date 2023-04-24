/**
 * @param {Array} list 待转换为树形结构的数组
 * @param {String} idKey 一条记录的键名(如:id)
 * @param {String} parentIdKey 一条记录的父记录的键名(如：parentId)
 * @returns 树形结构
 */
function toTree(list, idKey = 'id', parentIdKey = 'parentId') {
  /**
   * 寻找一个根节点的所有子节点
   * @param  root 根节点idKey对应的属性值
   * @returns 子节点数组
   */
  function _arrayToTreeV3(root) {
    return list
      .filter((item) => item[parentIdKey] === root)
      .map((item) => ({ ...item, children: _arrayToTreeV3(item[idKey]) }))
  }
  const map = {}
  const rootNodeArr = []
  // {[id]:{}}
  list.forEach((item) => {
    map[item[idKey]] = item
  })
  // 找出所有的根节点
  list.forEach((item) => {
    if (!map[item[parentIdKey]]) {
      rootNodeArr.push(map[item[idKey]])
    }
  })
  // 查找每个根节点的子节点
  return rootNodeArr.map((item) => ({
    ...item,
    children: _arrayToTreeV3(item[idKey])
  }))
}
