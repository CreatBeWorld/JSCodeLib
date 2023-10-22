/**
 * 该类用于生成指定年份的所有周数据
 * 
 */
// 周生成规则 如：(周六-周五，以周六开始，以周五结束)
//  每年的第一周以第一个周六开始，如果第一个周六不是1月1日，则把第一个周六之前的天数交给上一年去处理，
// 每年的最后一周以最后一个周六开始，如果不够最后一周，则去下一年拿天数来凑该年的最后一周
class Week {
  /**
   * @param {Number} year 年份
   * @param {Number} weekStartDay 每周以星期几开始 0-6 (js中0表示周天)
   */
  constructor(year, weekStartDay) {
    this.year = year
    this.weekStartDay = weekStartDay
    this.firstDateOfFirstWeek = this._getFirstDayOfFirstWeek() // 计算指定年份的第一周的第一天是几号
    this.firstDateOfLastWeek = this._getFirstDateOfLastWeek() // 计算指定年份的最后一周的第一天是几号
    this.weekList = this._getWeekList() // 生成指定年份中的所有周
  }
  /**
   * 计算指定年份的第一周的第一天是几号
   */
  _getFirstDayOfFirstWeek() {
    const firstDate = new Date(this.year, 0, 1) // 1月1号
    const dayOFFirstDate = firstDate.getDay() // 1月1号是星期几
    // 周六-周五   周天-周六  周五-周四 周四-周三  周三-周二  周二-周一  周一-周天 
    // 如果dayOFFirstDate>this.weekStartDay  取:(1+7+this.weekStartDay-dayOFFirstDate) else 取:1+this.weekStartDay-dayOFFirstDate
    return dayOFFirstDate > this.weekStartDay ? (8 + this.weekStartDay - dayOFFirstDate) : (1 + this.weekStartDay - dayOFFirstDate)
  }
  /**
   *计算指定年份的最后一周的第一天是几号
   */
  _getFirstDateOfLastWeek() {
    const lastDate = new Date(this.year, 11, 31) // 12月31号
    const dayOfLastDate = lastDate.getDay() // 12月31号是星期几
    // 如果dayOfLastDate>=this.weekStartDay 取：31+this.weekStartDay-dayOfLastDate else 取：31-(7-(this.weekStartDay-dayOfLastDate))
    return dayOfLastDate >= this.weekStartDay ? (31 + this.weekStartDay - dayOfLastDate) : (24 + this.weekStartDay - dayOfLastDate)
  }
  /**
   * 生成指定年份中的所有周
   */
  _getWeekList() {
    const weekList = []
    const startDate = this.firstDateOfFirstWeek
    const lastDate = this.firstDateOfLastWeek
    const year = this.year
    // 先计算本年内的，再计算去下年借天数的情况（把本年的最后一周的第一天也算到这种情况进行计算）
    const totalDates = ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0) ? 366 : 365) - (startDate - 1) - (31 - lastDate + 1) // 一年中总共有多少天
    let qishuCount = 0
    // 计算timeRanges(周的日期范围)和isCurWeek(是否是当前周)
    const _getTimeRangesAndIsCurWeek = (startDateTemp, disDate) => {
      const sTime = new Date(startDateTemp + disDate * 24 * 3600 * 1000) // 该周开始日期
      const eTime = new Date(startDateTemp + (disDate + 6) * 24 * 3600 * 1000) // 该周结束日期
      const nTime = new Date().setHours(0, 0, 0, 0)
      const sM = sTime.getMonth() + 1 < 10 ? '0' + (sTime.getMonth() + 1) : sTime.getMonth() + 1
      const sD = sTime.getDate() < 10 ? '0' + sTime.getDate() : sTime.getDate()
      const eM = eTime.getMonth() + 1 < 10 ? '0' + (eTime.getMonth() + 1) : eTime.getMonth() + 1
      const eD = eTime.getDate() < 10 ? '0' + eTime.getDate() : eTime.getDate()
      return {
        timeRanges: `${sM}-${sD}至${eM}-${eD}`,
        isCurWeek: sTime <= nTime && nTime <= eTime
      }
    }
    const startDateTemp = new Date(year, 0, startDate).getTime() // 第一天对应的毫秒数
    // 本年内的期数(如果最后一周包括在本年内，下列并未计算该周)
    for (let i = startDate; i <= totalDates; i += 7) {
      qishuCount++
      const { timeRanges, isCurWeek } = _getTimeRangesAndIsCurWeek(startDateTemp, i - startDate)
      const qishuObj = {
        bgqs: qishuCount,
        startYear: year,
        endYear: year,
        timeRanges,
      }
      if (isCurWeek) {
        qishuObj.curWeek = qishuCount
      }
      weekList.push(qishuObj)
    }
    const now = new Date().setHours(0, 0, 0, 0)
    if (lastDate !== 25) {
      // 去下一年借天数情况
      const qishuObj = {
        bgqs: qishuCount + 1,
        startYear: year,
        endYear: year + 1,
        timeRanges: `12-${lastDate}至01-0${7 - (31 - lastDate + 1)}`
      }
      const sTime = new Date(year, 11, lastDate)
      const eTime = new Date(year + 1, 0, 7 - (31 - lastDate + 1))
      if (sTime <= now && now <= eTime) {
        qishuObj.curWeek = qishuCount + 1
      }
      weekList.push(qishuObj)
    } else {
      // 最后一周包括在本年内
      const qishuObj = {
        bgqs: qishuCount + 1,
        startYear: year,
        endYear: year,
        timeRanges: '12-25至12-31'
      }
      const sTime = new Date(year, 11, 25)
      const eTime = new Date(year, 11, 31)
      if (sTime <= now && now <= eTime) {
        qishuObj.curWeek = qishuCount + 1
      }
      weekList.push(qishuObj)
    }
    return weekList
  }
}