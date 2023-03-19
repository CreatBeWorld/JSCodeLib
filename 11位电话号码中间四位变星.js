/**
 * @param {String} phone 11位电话号码
 */
function phoneToStars(phone) {
  if (phone.length !== 11) {
    return phone
  }
  return phone.substring(0, 3) + '****' + phone.substring(7)
}
