import React, { Component } from 'react'
import dateUtils from './DateUtils'
import DatePickerAction from './action'

class DatePicker extends Component {
    componentWillMount() {
        let that = this;
        // 初始化设置开始日期和结束日期
        let {defaultDate, prefix, single, dateInput, dispatch} = this.props

        /* START: 不合法默认日期处理 */
        if (single) {
            // 日期单选时，如果没有默认的开始日期，则默认为今天
            if (!defaultDate || !defaultDate.startDate) {
                const sToday = new Date().Format('yyyyMMdd')
                defaultDate = { startDate: sToday, endDate: sToday }
            }
            defaultDate.endDate = defaultDate.startDate
        } else if (!defaultDate || !defaultDate.startDate || !defaultDate.endDate) {
            // 日期多选时，如果没有默认的开始日期和结束日期，则设置为前7天到今天
            const sDefaultStartDate = new Date(new Date().getTime() - dateUtils.ONE_DAY_TIMES * 7).Format('yyyyMMdd')
            const sDefaultEndDate = new Date().Format('yyyyMMdd')
            if (!defaultDate) defaultDate = { startDate: sDefaultStartDate, endDate: sDefaultEndDate }
            if (!defaultDate.startDate) defaultDate.startDate = sDefaultStartDate
            if (!defaultDate.endDate) defaultDate.endDate = sDefaultEndDate
        }
        /* END: 不合法默认日期处理 */

        // 设置初始状态：当前日期、面板选中日期、面板显示的月份
        this.setCurrentDate(defaultDate)
        this.setSelectedDate(defaultDate)
        this.setInputDate(defaultDate)

        const sEndMonthId = defaultDate.endDate.toString().substring(0, 6)  // 选中结束日期所在的月份
        const sLastMonthId = new Date(dateUtils.fGetFirstDateOfMonth(sEndMonthId).getTime() - dateUtils.ONE_DAY_TIMES).Format('yyyyMM')  // 选中结束日期所在月份的上个月
        this.setPickerMonths([sLastMonthId, sEndMonthId])

        document.addEventListener("click", function(event){
            if(!event.target.closest(".datepicker-wrapper")) {
                that.onCancel();
            }
        })
    }

    render() {
        const that = this;
        require('./index.less')
        const {current, selected, dateInput, pickerVisility, pickerMonths, single, prefix, dispatch} = this.props
        
        // let $dropdown = document.querySelectorAll(".datepicker-dropdown");
        // $dropdown.forEach(function(ele){
        //     ele.style.display = "none";
        // });

        return (
            <div className="datepicker-wrapper">
                <div className="datepicker-btn" onClick={() => { that.setPickerVisility(true) }}>
                    <span>{single ? that.formatDateid(current.startDate) : that.formatDateid(current.startDate) + ' 至 ' + that.formatDateid(current.endDate)}</span>
                </div>

                <div className="datepicker-dropdown" style={!pickerVisility ? { display: 'none' } : {}}>
                    <i className="switcher prev" onClick={() => { that.prevMonths() }} />
                    <i className="switcher next" onClick={() => { that.nextMonths() }} />

                    <div className="calendar-panel">
                        <table className="l">
                            <caption>{that.formatMonthToCN(pickerMonths[0])}</caption>
                            <thead>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                            </thead>
                            {this.getMonthTableBody(pickerMonths[0])}
                        </table>

                        <table className="r">
                            <caption>{that.formatMonthToCN(pickerMonths[1])}</caption>
                            <thead>
                                <tr>
                                    <th>日</th>
                                    <th>一</th>
                                    <th>二</th>
                                    <th>三</th>
                                    <th>四</th>
                                    <th>五</th>
                                    <th>六</th>
                                </tr>
                            </thead>
                            {this.getMonthTableBody(pickerMonths[1])}
                        </table>
                    </div>

                    <div className="dropdown-footer">
                        <div className="input-wrapper">
                            <input type="text" value={that.formatDateid(dateInput.startDate)} ref="inputStartDate" onChange={() => { }} />
                            <span style={single ? { display: 'none' } : {}}>—</span>
                            <input style={single ? { display: 'none' } : {}} type="text" value={dateInput.endDate ? that.formatDateid(dateInput.endDate) : that.formatDateid(dateInput.startDate)}
                                ref="inputEndDate" onChange={() => { }} />
                        </div>

                        <div className="button-wrapper">
                            <span className="btn ok" onClick={() => this.onConfirm()}>确定</span>
                            <span className="btn cancel" onClick={() => { this.onCancel() }}>取消</span>
                        </div>
                    </div>
                </div>
            </div>

        )
    }

    /**
     * 生成月日历表格数据HTML
     */
    getMonthTableBody(sMonthId) {
        const {futureDisabled} = this.props
        var aMonthDates = dateUtils.fGetMonthCalendar(sMonthId)
        var aCalTrs = [];
        for (let i = 0; i < aMonthDates.length; i += 7) {
            var aCalTds = [];
            for (let k = i; k < i + 7; k++) {
                let o = aMonthDates[k]
                aCalTds.push(<td className={this.getDateClassName(o)} key={k}
                    onClick={() => { if (o.isCurrentMonth && (!futureDisabled || !o.isFuture)) this.selectDate(o.dateid) }} 
                    data-dateid={o.dateid} data-currentMonth={o.isCurrentMonth} data-future={o.isFuture}
                    data-ts={o.date.getTime()}>
                        {o.day}
                </td>)
            }
            aCalTrs.push(<tr key={i}>{aCalTds}</tr>)
        }
        return (<tbody>{aCalTrs}</tbody>);
    }

    /**
     * 根据日期获取对应的样式名
     */
    getDateClassName(o) {
        const {futureDisabled} = this.props
        const sDateId = o.dateid
        if (!sDateId) return ''
        if (!o.isCurrentMonth || (futureDisabled && o.isFuture)) return 'disabled'    // 如果不是当前月份，显示为不可点击状态

        const {selected} = this.props
        if ((sDateId == selected.startDate && !selected.endDate) || (sDateId == selected.startDate && sDateId == selected.endDate)) {
            return 'selected'
        }
        if (sDateId == selected.startDate) {
            return 'first'
        }
        if (sDateId == selected.endDate) {
            return 'last'
        }
        if (parseInt(sDateId) > parseInt(selected.startDate) && parseInt(sDateId) < parseInt(selected.endDate)) {
            return 'between'
        }
        return ''
    }

    /**
     * 确定事件处理
     */
    onConfirm() {
        const {single, onDateChange} = this.props
        let startDate = this.refs.inputStartDate.value
        let endDate = this.refs.inputEndDate.value
        var regex = new RegExp(/[1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]/)
        if (regex.test(startDate) && regex.test(endDate)) {
            startDate = startDate.replace(/-/g, '')
            endDate = endDate.replace(/-/g, '')
            this.setInputDate({ startDate, endDate })
            this.setSelectedDate({ startDate, endDate })
            this.confirm()
        }

        onDateChange.call(null, { startDate, endDate })
        this.setPickerVisility(false) // 关闭dropdown
    }

    /**
     * 取消事件处理
     */
    onCancel() {
        // 重置已选日期和输入日期为当前组件日期
        const {current} = this.props
        this.setSelectedDate(current)
        this.setInputDate(current)

        // 重置日期选择面板到当前组件日期所在的月份
        const sEndMonthId = current.endDate.toString().substring(0, 6)  // 选中结束日期所在的月份
        const sLastMonthId = new Date(dateUtils.fGetFirstDateOfMonth(sEndMonthId).getTime() - dateUtils.ONE_DAY_TIMES).Format('yyyyMM')  // 选中结束日期所在月份的上个月
        this.setPickerMonths([sLastMonthId, sEndMonthId])
        this.setPickerVisility(false) // 关闭dropdown
    }

    /* START： dispatch action封装 */
    setCurrentDate(oDate) {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.setCurrent(oDate))
    }
    setSelectedDate(oDate) {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.setSelected(oDate))
    }
    setInputDate(oDate) {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.setDateInput(oDate))
    }
    setPickerMonths(aMonths) {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.setPickerMonths(aMonths))
    }
    setPickerVisility(bVisible) {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.setPickerVisility(bVisible))
    }
    prevMonths() {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.prevMonths())
    }
    nextMonths() {
        const {prefix, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.nextMonths())
    }
    confirm() {
        const {prefix, dispatch, selected} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.ok(selected))
    }
    selectDate(dateid) {
        const {prefix, single, dispatch} = this.props
        const oActionFact = DatePickerAction(prefix)
        dispatch(oActionFact.selectDate(dateid, single))
    }
    /* END： dispatch action封装 */

    /**
     * 格式化int类型的日期
     */
    formatDateid(dateid, separator) {
        if (!dateid) return null
        if (!separator) separator = '-';
        return dateid.toString().substring(0, 4) + separator + dateid.toString().substring(4, 6) + separator + dateid.toString().substring(6)
    }

    /**
     * 格式化月份
     */
    formatMonthToCN(sMonthId) {
        if (!sMonthId) return null
        return sMonthId.toString().substring(0, 4) + '年' + sMonthId.toString().substring(4) + '月';
    }
}

export default DatePicker