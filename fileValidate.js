/**
 * 验证上传的文件后缀名以及文件大小是否合法
 * @param {File} file 待验证的文件
 * @param {Number} size 文件不能超过的大小，单位：M
 * @param {Array} supportedFileSuffixs 支持的文件后缀名
 * @returns {Number} 1-文件大小以及文件后缀名均合法，2-文件大小以及文件后缀名均不合法，3-文件大小合法，但是文件后缀名不合法，4文件后缀名合法，但是文件大小不合法
 */
function fileValidate(file, size, supportedFileSuffixs) {
  const fileSizeValidate = file.size / 1024 / 1024 < size //待验证的文件的大小是否合法
  const fileSuffixValidate = supportedFileSuffixs.includes(
    file.name.slice(file.name.lastIndexOf('.'))
  ) // 待验证的文件的后缀名是否合法
  if (fileSizeValidate && fileSuffixValidate) {
    return 1
  } else if (!fileSizeValidate && !fileSuffixValidate) {
    return 2
  } else if (fileSizeValidate && !fileSuffixValidate) {
    return 3
  } else if (!fileSizeValidate && fileSuffixValidate) {
    return 4
  }
}
