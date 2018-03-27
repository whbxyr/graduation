import React, { Component } from 'react'
import dateUtils from '../../helpers/DateUtils'
import WeekPickerAction from './action'

class WeekPicker extends Component {
    componentWillMount() {
        let that = this
        let {defaultWeek, prefix, single, dispatch} = this.props

        if (single) {
            if (!defaultWeek || !defaultWeek.startWeek) {
                let startWeek = dateUtils.fGetLastSeveralWeek(new Date(), 1).startWeek
                defaultWeek = { startWeek: startWeek, endWeek: startWeek }
            }
            defaultWeek.endWeek = defaultWeek.startWeek
        } else if (!defaultWeek || !defaultWeek.startWeek || !defaultWeek.endWeek) {
            defaultWeek = dateUtils.fGetLastSeveralWeek(new Date(), 7)
        }

        this.setCurrentWeek(defaultWeek)
        this.setSelectedWeek(defaultWeek)
        this.setInputWeek(defaultWeek)

        var firstWeekYear = parseInt(defaultWeek.startWeek.slice(0, 4))
        var nowYear = new Date().getFullYear()
        const sEndYearId = firstWeekYear == nowYear ? firstWeekYear : firstWeekYear + 1
        const sLastYearId =  firstWeekYear == nowYear ? firstWeekYear - 1 : firstWeekYear

        this.setPickerYears([sLastYearId, sEndYearId])

        document.addEventListener('click', function(event) {
            if(!event.target.closest('.weekpicker-wrapper') && !event.target.closest('.calendar_logo')) {
                that.onCancel()
            }
        })
    }
    render() {
        require('./index.less')
        const { pickerVisility, pickerYears, current, single, selected, weekInput, nowBetween } = this.props

        return (
            <div className="weekpicker-wrapper">
                <div className="weekpicker-btn" onClick={() => this.setPickerVisility(true)}>
                    <span>{single ? this.formatWeekId(current.startWeek, true) : this.formatWeekId(current.startWeek, true) + ' ~ ' + this.formatWeekId(current.endWeek, true)}</span>
                </div>

                <div className="weekpicker-dropdown" style={!pickerVisility ? { display: 'none' } : {}}>
                    <i className="switcher prev" onClick={() => this.prevYears()} />
                    <i className="switcher next" onClick={() => this.nextYears()} />
    
                    <div className="calendar-panel">
                        <table className="l">
                            <caption>{pickerYears[0]}年</caption>
                            {this.getWeekTableBody(pickerYears[0])}
                        </table>
                        <div className="tb_divider"></div>
                        <table className="r">
                            <caption>{pickerYears[1]}年</caption>
                            {this.getWeekTableBody(pickerYears[1])}
                        </table>
                    </div>
    
                    <div className="dropdown-footer">
                        <div className="input-wrapper">
                            <input type="text" value={this.formatWeekId(weekInput.startWeek)} ref="inputStartWeek" onChange={() => { }} />
                            <span style={single ? { display: 'none' } : {}}>—</span>
                            <input style={single ? { display: 'none' } : {}} type="text" value={this.formatWeekId(weekInput.endWeek)} ref="inputEndWeek" onChange={() => { }} />
                        </div>
    
                        <div className="button-wrapper">
                            <span className="btn ok" onClick={() => this.onConfirm()}>确定</span>
                            <span className="btn cancel" onClick={() => this.onCancel()}>取消</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    /**
     * 生成年历表格数据HTML
     */
    getWeekTableBody(sYearId) {
        if (typeof sYearId == 'undefined') {
            sYearId = new Date().getFullYear()
        }
        const { futureDisabled } = this.props
        var aYearDates = dateUtils.fGetYearCalendar(sYearId)
        var aCalTrs = [], weekLen = aYearDates.length
        for (let i = 0; i < weekLen; i += 7) {
            var aCalTds = []
            for (let k = i; k < i + 7 && k < weekLen; k++) {
                let o = aYearDates[k]
                aCalTds.push(<td className={this.getWeekClassName(o)} key={k}
                    onClick={() => { if (!futureDisabled || !o.isFuture) this.selectWeek(o.week) }}
                    data-dateid={o.firstDateId + '-' + o.lastDateId}
                    data-ts={o.firstDate.getTime()}>
                    {parseInt(o.week.slice(4))}
                </td>)
            }
            aCalTrs.push(<tr key={i}>{aCalTds}</tr>)
        }
        return (<tbody>{aCalTrs}</tbody>)
    }

    getWeekClassName(o) {
        const { futureDisabled } = this.props
        if (o.isFuture && futureDisabled) {
            return 'disabled'
        }
        const { selected } = this.props
        const weekId = o.week
        if ((weekId == selected.startWeek && !selected.endWeek) || (weekId == selected.startWeek && weekId == selected.endWeek)) {
            return 'selected'
        }
        if (weekId == selected.startWeek) {
            return 'first'
        }
        if (weekId == selected.endWeek) {
            return 'last'
        }
        if (+weekId > +selected.startWeek && +weekId < +selected.endWeek) {
            return 'between'
        }
    }

    /**
     * 确定事件处理
     */
    onConfirm() {
        const {onDateChange} = this.props
        let startWeek = this.refs.inputStartWeek.value
        let endWeek = this.refs.inputEndWeek.value
        var regex = new RegExp(/[1-2][0-9]{3}-[0-5][0-9]/)
        if (regex.test(startWeek) && regex.test(endWeek)) {
            startWeek = startWeek.replace(/-/g, '')
            endWeek = endWeek.replace(/-/g, '')
            this.setInputWeek({ startWeek, endWeek })
            this.setSelectedWeek({ startWeek, endWeek })
            this.confirm()
        } else {
            alert('输入的周格式错误')
        }
        onDateChange.call(null, { startWeek, endWeek })
        this.setPickerVisility(false)
    }
    confirm() {
        const {prefix, dispatch, selected} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.confirm(selected))
    }

    /**
     * 取消事件处理
     */
    onCancel() {
        const { current } = this.props
        this.setSelectedWeek(current)
        this.setInputWeek(current)

        // 重置周选择面板到当前组件周所在的年份
        var sLastYearId = +current.startWeek.slice(0, 4)
        var sEndYearId = +current.endWeek.slice(0, 4)
        if (sLastYearId == sEndYearId) {
            sLastYearId--
        }
        this.setPickerYears([sLastYearId, sEndYearId])
        this.setPickerVisility(false)
    }

    prevYears() {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.prevYears())
    }
    nextYears() {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.nextYears())
    }
    setPickerYears(aYears) {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.setPickerYears(aYears))
    }
    setPickerVisility(bVisible) {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.setPickerVisility(bVisible))
    }
    setCurrentWeek(oWeek) {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.setCurrent(oWeek))
    }
    setInputWeek(oWeek) {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.setWeekInput(oWeek))
    }
    setSelectedWeek(oWeek) {
        const {prefix, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.setSelected(oWeek))
    }
    selectWeek(weekId) {
        const {prefix, single, dispatch} = this.props
        const oActionFact = WeekPickerAction(prefix)
        dispatch(oActionFact.selectWeek(weekId, single))
    }

    /**
     * 格式化周
     */
    formatWeekId(sWeekId, isZh) {
        if (isZh) {
            return sWeekId.slice(0, 4) + '年' + sWeekId.slice(4) + '周'
        } else {
            return sWeekId.slice(0, 4) + '-' + sWeekId.slice(4)
        }
    }
}

export default WeekPicker