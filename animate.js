/**
 * js实现动画
 * @param {Object} options 动画的配置
 */
function createAnimation(options) {
    var from = options.from;//初始值
    var to = options.to;//最终值
    var totalDuration = options.totalDuration || 1000;//变化的总时长
    var duration = options.duration || 15;//一次变化所占的时长
    var times = Math.floor(totalDuration / duration);//变化的总次数
    var dis = (to - from) / times;//一次变化的量
    var curTimes = 0;//当前的次数
    var timerId = setInterval(function () {
        from += dis;
        curTimes++;
        if (curTimes >= times) {
            //最后一次变化处理
            from = to;
            options.onmove && options.onmove(from);
            //变化完成，清除定时器
            clearInterval(timerId);
            //变化完成后，需要做的处理
            options.onend && options.onend();
            return;
        }
        //每一次变化，需要做的处理
        options.onmove && options.onmove(from);

    }, duration);
}
