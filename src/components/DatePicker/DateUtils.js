// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S")
// (new Date()).Format("yyyy-M-d h:m:s.S")
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/**
 * 计算当天是周几（1-7）
 */
Date.prototype.defineGetDay = function () {
    return this.getDay() == 0 ? 7 : this.getDay();
}

/**
 * 日期工具类
 * @constructor
 */
function DateUtils() {
}
DateUtils.ONE_DAY_TIMES = 1000 * 3600 * 24;
DateUtils.prototype.ONE_DAY_TIMES = 1000 * 3600 * 24;
/**
 * 获取当月第一天
 * @param sMonth [optional]format: 201601
 * @returns {Date}
 */
DateUtils.prototype.fGetFirstDateOfMonth = function (sMonth) {
    var date;
    if (sMonth && sMonth.length === 6 && !isNaN(sMonth)) {
        date = new Date(sMonth.substring(0, 4) + '/' + sMonth.substring(4, 6) + '/01 00:00:00');
    } else {
        date = new Date();
    }
    date.setDate(1);
    return date;
}

/**
 * 获取当月最后一天
 * @param sMonth [optional]format: 201601
 * @returns {Date}
 */
DateUtils.prototype.fGetLastDateOfMonth = function (sMonth) {
    var date;
    if (sMonth && sMonth.length === 6 && !isNaN(sMonth)) {
        date = new Date(sMonth.substring(0, 4) + '/' + sMonth.substring(4, 6) + '/01 00:00:00');
    } else {
        date = new Date();
    }
    var currentMonth = date.getMonth();
    var nextMonth = ++currentMonth;
    var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
    var oneDay = 1000 * 60 * 60 * 24;
    return new Date(nextMonthFirstDay - oneDay);
}

/**
 * 获取某个月份在日历上显示的日期排列
 * @param sMonth [optional]format: 201601
 * @returns [{dateid: <date int format>, d: <date obj>, isCurrentMonth: true|false}, ...]
 */
DateUtils.prototype.fGetMonthCalendar = function (sMonth) {
    var aCelendarDates = [];
    var sToday = new Date().Format('yyyyMMdd');

    // 初始化一个月份在日历中的排列数组
    var nRow = 6, nCol = 7;   // 6行7列
    for (var i = 0; i < nRow * nCol; i++) {
        aCelendarDates.push(null);
    }
    var firstDate = this.fGetFirstDateOfMonth(sMonth); // 当月第一天
    var lastDate = this.fGetLastDateOfMonth(sMonth);   // 当月最后一天
    var firstDateNextMonth = new Date(lastDate.getTime() + DateUtils.ONE_DAY_TIMES);  // 下月的第一天
    var nDays = parseInt(lastDate.Format('dd'));    // 当月天数

    var firstDateWeekDay = firstDate.getDay(); // 当月第一天的星期

    /* START: 填充aCelendarDates */
    // 填充上月份的日期
    for (var i = firstDateWeekDay - 1; i >= 0; i--) {
        var d = new Date(firstDate.getTime() - DateUtils.ONE_DAY_TIMES * (firstDateWeekDay - i))
        aCelendarDates[i] = { dateid: d.Format('yyyyMMdd'), date: d, day: parseInt(d.Format('dd')), isCurrentMonth: false, isFuture: parseInt(d.Format('yyyyMMdd')) > parseInt(sToday) };
    }
    // 填充本月份的日期
    for (var i = firstDateWeekDay; i < firstDateWeekDay + nDays; i++) {
        var d = new Date(firstDate.getTime() + DateUtils.ONE_DAY_TIMES * (i - firstDateWeekDay));
        aCelendarDates[i] = { dateid: d.Format('yyyyMMdd'), date: d, day: parseInt(d.Format('dd')), isCurrentMonth: true, isFuture: parseInt(d.Format('yyyyMMdd')) > parseInt(sToday) };
    }
    // 填充下月份的日期
    var j = 0;
    while (i < aCelendarDates.length) {
        var d = new Date(firstDateNextMonth.getTime() + DateUtils.ONE_DAY_TIMES * j);
        aCelendarDates[i] = { dateid: d.Format('yyyyMMdd'), date: d, day: parseInt(d.Format('dd')), isCurrentMonth: false, isFuture: parseInt(d.Format('yyyyMMdd')) > parseInt(sToday) };
        i++;
        j++
    }
    /* END: 填充aCelendarDates */

    return aCelendarDates;
}

/**
 * 判断某一年是否为闰年，闰年366天，平年365天
 */
DateUtils.prototype.fGetYearDayCount = function (sYear) {
    var a1 = sYear % 4 == 0;
    var a2 = sYear % 100 != 0;
    var a3 = sYear % 400 == 0;

    return (a1 && a2) || a3 ? 366 : 365;
}

/**
 * 计算某一年的某一天是星期几
 */
DateUtils.prototype.fGetDayOfYear = function (sYear, sMonth, sDay) {
    var day = new Date(sYear, sMonth, sDay).getDay();

    return day == 0 ? 7 : day;
}

/**
 * 根据日期字符串生成Date
 */
DateUtils.prototype.fGetDateFromString = function (dateStr) {
    var year = +(dateStr.slice(0, 4));
    var month = +(dateStr.slice(4, 6)) - 1;
    var day = +(dateStr.slice(6));

    return new Date(year, month, day);
}

/**
 * 根据年份算出该年的周分布
 */
DateUtils.prototype.fGetYearCalendar = function (sYear) {
    var aCelendarDates = [];
    var sToday = parseInt(new Date().Format('yyyyMMdd'));

    // 计算sYear一共有多少天
    var yearDayCount = this.fGetYearDayCount(sYear);

    // 计算sYear第一周的周一和周日
    var firstDay = this.fGetDayOfYear(sYear, 0, 1);
    var firstWeekFirstDay = firstDay == 1 ? (sYear + '01' + '01') : ((sYear - 1) + '12' + (31 - firstDay + 2));
    var firstWeekLastDay = sYear + '010' + (7 - firstDay + 1);
    // 计算sYear第二周的周一的Date
    var firstDate = new Date(+this.fGetDateFromString(firstWeekLastDay) + DateUtils.ONE_DAY_TIMES);
    aCelendarDates[0] = {
        week: sYear + '01',
        firstDate: this.fGetDateFromString(firstWeekFirstDay),
        firstDateId: firstWeekFirstDay,
        lastDate: firstDate,
        lastDateId: firstWeekLastDay,
        isFuture: parseInt(firstWeekFirstDay) > sToday
    };
    // sYear最后一周的周一和周日
    var lastDay = this.fGetDayOfYear(sYear, 11, 31);
    var lastWeekFirstDay, lastWeekLastDay, weekCount;
    if (lastDay == 7) {
        // lastWeekFirstDay = sYear + '1225';
        // lastWeekLastDay = sYear + '1231';
        weekCount = (yearDayCount - (7 - firstDay + 1) - lastDay) / 7 + 2;
    } else {
        // lastWeekFirstDay = sYear + '12' + (31 - lastDay - 7 + 1);
        // lastWeekLastDay = sYear + '12' + (31 - lastDay);
        weekCount = (yearDayCount - (7 - firstDay + 1) - lastDay) / 7 + 1;
    }

    for (var i = 2; i <= weekCount; i++) {
        var lastDate = new Date(firstDate.getTime() + DateUtils.ONE_DAY_TIMES * 7);
        var firstDateId = firstDate.Format('yyyyMMdd');
        aCelendarDates[i - 1] = {
            week: i < 10 ? sYear + '0' + i : sYear + '' + i,
            firstDate: firstDate,
            firstDateId: firstDateId,
            lastDate: lastDate,
            lastDateId: new Date(+lastDate - 1).Format('yyyyMMdd'),
            isFuture: parseInt(firstDateId) > sToday
        };
        firstDate = lastDate;
    }

    return aCelendarDates;
}

/**
 * 根据weekId比如"201801"以及type（"start" || "end"）为开始周还是结束周，
 * 来获得开始周的开始时间戳或者结束周的结束时间戳
 */

DateUtils.prototype.fGetTimeFromWeekId = function (weekId, type) {
    var year = +weekId.slice(0, 4);
    var calendar = dateUtils.fGetYearCalendar(year);
    for (let i = 0, len = calendar.length; i < len; i++) {
        var o = calendar[i];
        if (weekId == o.week) {
            switch (type) {
                case 'start': return +o.firstDate;
                case 'end': return +o.lastDate;
                default: break;
            }
        }
    }
}

/**
 * 根据日期算出是哪一年的哪一周，返回字符串比如"201801"
 */
DateUtils.prototype.fGetWeekIndexFromDate = function (sDate) {
    var year = sDate.getFullYear();
    var date = +sDate;
    var calendar = this.fGetYearCalendar(year);
    for (let i = 0, len = calendar.length; i < len; i++) {
        var o = calendar[i];
        if (date >= +o.firstDate && date < +o.lastDate) {
            return o.week;
        }
    }
    return year + 1 + '01';
}

/**
 * 获取某天过去的weekNum个周（不包含该天所在的周）的时间段，比如{ startWeek: '201701', endWeek: '201702' }
 */
DateUtils.prototype.fGetLastSeveralWeek = function (sDate, weekNum) {
    var nowWeekDay = sDate.defineGetDay();
    var nowWeekDate = +new Date(sDate.getFullYear(), sDate.getMonth(), sDate.getDate());
    var defaultStartWeek = this.fGetWeekIndexFromDate(new Date(nowWeekDate - DateUtils.ONE_DAY_TIMES * (nowWeekDay + weekNum * 7 - 1)));
    var defaultEndWeek = this.fGetWeekIndexFromDate(new Date(nowWeekDate - DateUtils.ONE_DAY_TIMES * nowWeekDay));

    return {
        startWeek: defaultStartWeek,
        endWeek: defaultEndWeek
    };
}


var dateUtils = new DateUtils();

export default dateUtils