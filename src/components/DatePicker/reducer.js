/**
 * DatePicker组件reducer创建工厂函数，接收PREFIX前缀
 */
import { combineReducers } from 'redux'
import { SET_PICKER_VISIBILITY, PREV_MONTH, NEXT_MONTH, SURE, SELECT_DATE, SET_CURRENT, SET_SELECTED, SET_PICKER_MONTHS, SET_DATE_INPUT, buildConstant } from './constants'
import dateUtils from '../../helpers/DateUtils'

const DatePickerReducer = (PREFIX) => {
    /**
     * 设置当前选中的开始日期和结束日期，当点击确认后，从已选的日期同步到current对象中
     */
    const current = (state = { startDate: new Date().Format('yyyyMMdd'), endDate: new Date().Format('yyyyMMdd') }, action) => {
        if (action.type == buildConstant(PREFIX, SURE)) {
            state = { startDate: action.dates.startDate, endDate: action.dates.endDate == "" ? action.dates.startDate : action.dates.endDate }
        } else if (action.type == buildConstant(PREFIX, SET_CURRENT)) {
            state = action.current
        }
        return state
    }

    /**
     * 设置日期选择面板中选中的日期
     */
    const selected = (state = { startDate: new Date().Format('yyyyMMdd'), endDate: new Date().Format('yyyyMMdd') }, action) => {
        if (action.type == buildConstant(PREFIX, SELECT_DATE)) {
            if (!action.single) {
                // 日期多选逻辑：如果当前已选中两个日期，则重置，如果当前选中一个，则取较小日期为startDate，较大日期为endDate
                if (state.startDate && state.endDate) {
                    state = { startDate: action.dateid, endDate: '' }
                } else if (!state.startDate && !state.endDate) {
                    state = { startDate: action.dateid, endDate: '' }
                } else {
                    let selectedDateid = state.startDate || state.endDate
                    state = { startDate: Math.min(action.dateid, selectedDateid).toString(), endDate: Math.max(action.dateid, selectedDateid).toString() }
                }
            } else {
                // 日期单选逻辑，直接设置startDate和endDate为所选日期
                state = { startDate: action.dateid, endDate: action.dateid }
            }
        } else if (action.type == buildConstant(PREFIX, SET_SELECTED)) {
            state = action.selected
        }
        return state
    }

    /**
     * 设置日期选择面板的显示状态
     */
    const pickerVisility = (state = false, action) => {
        if (action.type == buildConstant(PREFIX, SET_PICKER_VISIBILITY)) {
            state = action.visible
        }
        return state
    }

    /**
     * 设置日期选择面板显示的可选月份
     */
    const pickerMonths = (state = [new Date().Format('yyyyMM')], action) => {
        if (action.type == buildConstant(PREFIX, PREV_MONTH)) {
            state = state.map(function (sMonthId) {
                const firstDate = dateUtils.fGetFirstDateOfMonth(sMonthId); // 当月第一天
                return new Date(firstDate.getTime() - dateUtils.ONE_DAY_TIMES).Format('yyyyMM') // 上个月
            })
        } else if (action.type == buildConstant(PREFIX, NEXT_MONTH)) {
            state = state.map(function (sMonthId) {
                const lastDate = dateUtils.fGetLastDateOfMonth(sMonthId);   // 当月最后一天
                return new Date(lastDate.getTime() + dateUtils.ONE_DAY_TIMES).Format('yyyyMM') // 下个月
            })
        } else if (action.type == buildConstant(PREFIX, SET_PICKER_MONTHS)) {
            state = action.months
        }
        return state
    }

    /**
     * 设置日期输入框显示的开始日期和结束日期
     */
    const dateInput = (state = { startDate: new Date().Format('yyyyMMdd'), endDate: new Date().Format('yyyyMMdd') }, action) => {
        if (action.type == buildConstant(PREFIX, SET_DATE_INPUT)) {
            state = { startDate: action.input.startDate, endDate: action.input.endDate }
        } else if (action.type == buildConstant(PREFIX, SELECT_DATE)) {
            if (!action.single) {
                // 日期多选逻辑：如果当前已选中两个日期，则重置，如果当前选中一个，则取较小日期为startDate，较大日期为endDate
                if (state.startDate && state.endDate) {
                    state = { startDate: action.dateid, endDate: '' }
                } else if (!state.startDate && !state.endDate) {
                    state = { startDate: action.dateid, endDate: '' }
                } else {
                    let selectedDateid = state.startDate || state.endDate
                    state = { startDate: Math.min(action.dateid, selectedDateid).toString(), endDate: Math.max(action.dateid, selectedDateid).toString() }
                }
            } else {
                // 日期单选逻辑，直接设置startDate和endDate为所选日期
                state = { startDate: action.dateid, endDate: action.dateid }
            }
        }
        return state
    }

    return combineReducers({
        current,
        selected,
        pickerVisility,
        pickerMonths,
        dateInput
    })
}

export default DatePickerReducer