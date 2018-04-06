/**
 * WeekPicker组件reducer创建工厂函数，接收PREFIX前缀
 */
import { combineReducers } from 'redux'
import { SET_PICKER_VISIBILITY, SET_CURRENT, SET_SELECTED, SELECT_WEEK, PREV_YEAR, NEXT_YEAR, SET_PICKER_YEARS, SURE, SET_WEEK_INPUT, buildConstant } from './constants'
import dateUtils from './DateUtils'

const WeekPickerReducer = (PREFIX) => {
  /**
   * 设置当前选中的开始周和结束周，当点击确认后，从已选的日期周范围到current对象中
   */
  const current = (state = dateUtils.fGetLastSeveralWeek(new Date(), 7), action) => {
    if (action.type === buildConstant(PREFIX, SURE)) {
      state = { startWeek: action.weeks.startWeek, endWeek: action.weeks.endWeek }
    } else if (action.type === buildConstant(PREFIX, SET_CURRENT)) {
      state = action.current
    }
    return state
  }

  /**
   * 设置周选择面板中选中的周范围
   */
  const selected = (state = dateUtils.fGetLastSeveralWeek(new Date(), 7), action) => {
    if (action.type === buildConstant(PREFIX, SELECT_WEEK)) {
      if (!action.single) {
        // 周多选逻辑：如果当前已选中两个周或一个都没选，则重置，如果当前选中一个，则取较小周为startWeek，较大周为endWeek
        if (state.startWeek && state.endWeek) {
          if (state.startWeek === state.endWeek) {
            let selectedWeekId = state.startWeek
            state = { startWeek: Math.min(+action.weekId, selectedWeekId).toString(), endWeek: Math.max(+action.weekId, selectedWeekId).toString() }
          } else {
            state = { startWeek: action.weekId, endWeek: action.weekId }
          }
        } else if (!state.startWeek && !state.endWeek) {
          state = { startWeek: action.weekId, endWeek: action.weekId }
        } else {
          let selectedWeekId = state.startWeek || state.endWeek
          state = { startWeek: Math.min(+action.weekId, selectedWeekId).toString(), endWeek: Math.max(+action.weekId, selectedWeekId).toString() }
        }
      } else {
        // 周单选逻辑，直接设置startWeek和endWeek为所选周
        state = { startWeek: action.weekId, endWeek: action.weekId }
      }
    } else if (action.type === buildConstant(PREFIX, SET_SELECTED)) {
      state = action.selected
    }
    return state
  }

  /**
   * 设置周选择面板的显示状态
   */
  const pickerVisility = (state = false, action) => {
    if (action.type === buildConstant(PREFIX, SET_PICKER_VISIBILITY)) {
      state = action.visible
    }
    return state
  }

  /**
   * 设置日期选择面板显示的可选月份
   */
  const pickerYears = (state = [new Date().getFullYear() - 1], action) => {
    if (action.type === buildConstant(PREFIX, PREV_YEAR)) {
      state = state.map(function (sYearId) {
        return sYearId - 1
      })
    } else if (action.type === buildConstant(PREFIX, NEXT_YEAR)) {
      state = state.map(function (sYearId) {
        return sYearId + 1
      })
    } else if (action.type === buildConstant(PREFIX, SET_PICKER_YEARS)) {
      state = action.years
    }
    return state
  }

  /**
   * 设置周输入框显示的开始周和结束周
   */
  const weekInput = (state = dateUtils.fGetLastSeveralWeek(new Date(), 7), action) => {
    if (action.type === buildConstant(PREFIX, SET_WEEK_INPUT)) {
      state = { startWeek: action.input.startWeek, endWeek: action.input.endWeek }
    } else if (action.type === buildConstant(PREFIX, SELECT_WEEK)) {
      if (!action.single) {
        // 周多选逻辑：如果当前已选中两个周或一个都没选，则重置，如果当前选中一个，则取较小周为startWeek，较大周为endWeek
        if (state.startWeek && state.endWeek) {
          if (state.startWeek === state.endWeek) {
            let selectedWeekId = state.startWeek
            state = { startWeek: Math.min(+action.weekId, selectedWeekId).toString(), endWeek: Math.max(+action.weekId, selectedWeekId).toString() }
          } else {
            state = { startWeek: action.weekId, endWeek: action.weekId }
          }
        } else if (!state.startWeek && !state.endWeek) {
          state = { startWeek: action.weekId, endWeek: action.weekId }
        } else {
          let selectedWeekId = state.startWeek || state.endWeek
          state = { startWeek: Math.min(+action.weekId, selectedWeekId).toString(), endWeek: Math.max(+action.weekId, selectedWeekId).toString() }
        }
      } else {
        // 周单选逻辑，直接设置startWeek和endWeek为所选周
        state = { startWeek: action.weekId, endWeek: action.weekId }
      }
    }
    return state
  }

  /**
   * 获取当前周选择器的选择范围的开始周的周一以及结束周的周一
   */
  const nowBetween = (state = {
    firstWeekMon: new Date(dateUtils.fGetTimeFromWeekId(dateUtils.fGetLastSeveralWeek(new Date(), 7).startWeek, 'start')).Format('yyyyMMdd'),
    lastWeekMon: new Date(dateUtils.fGetTimeFromWeekId(dateUtils.fGetLastSeveralWeek(new Date(), 7).endWeek, 'start')).Format('yyyyMMdd')
  }, action) => {
    if (action.type === buildConstant(PREFIX, SURE)) {
      state = {
        firstWeekMon: new Date(dateUtils.fGetTimeFromWeekId(action.weeks.startWeek, 'start')).Format('yyyyMMdd'),
        lastWeekMon: new Date(dateUtils.fGetTimeFromWeekId(action.weeks.endWeek, 'start')).Format('yyyyMMdd')
      }
    } else if (action.type === buildConstant(PREFIX, SET_CURRENT)) {
      state = {
        firstWeekMon: new Date(dateUtils.fGetTimeFromWeekId(action.current.startWeek, 'start')).Format('yyyyMMdd'),
        lastWeekMon: new Date(dateUtils.fGetTimeFromWeekId(action.current.endWeek, 'start')).Format('yyyyMMdd')
      }
    }
    return state
  }

  return combineReducers({
    current,
    selected,
    nowBetween,
    pickerVisility,
    pickerYears,
    weekInput
  })
}

export default WeekPickerReducer
