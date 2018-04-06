/**
 * WeekPicker组件action创建工厂函数，接收PREFIX前缀
 */

import { SET_PICKER_VISIBILITY, PREV_YEAR, NEXT_YEAR, SET_PICKER_YEARS, SET_CURRENT, SET_SELECTED, SELECT_WEEK, SURE, SET_WEEK_INPUT, buildConstant } from './constants'

const WeekPickerAction = PREFIX => ({
  // 点击日期范围显示框触发，设置日期选择面板的显示/隐藏状态
  setPickerVisility: bVisible => ({ type: buildConstant(PREFIX, SET_PICKER_VISIBILITY), visible: bVisible }),

  // 设置面板显示的年份
  setPickerYears: aYears => ({ type: buildConstant(PREFIX, SET_PICKER_YEARS), years: aYears }),

  // 点击翻页触发，周选择面板显示的年份向前翻页
  prevYears: () => ({ type: buildConstant(PREFIX, PREV_YEAR) }),

  // 点击翻页触发，周选择面板显示的年份向后翻页
  nextYears: () => ({ type: buildConstant(PREFIX, NEXT_YEAR) }),

  // 点击选中某个日期时触发，修改选中的日期范围
  selectWeek: (weekId, single) => ({ type: buildConstant(PREFIX, SELECT_WEEK), weekId, single }),

  // 设置当前日期，初始化时触发
  setCurrent: oCurrent => ({ type: buildConstant(PREFIX, SET_CURRENT), current: oCurrent }),

  // 点击确定触发，将选中的周范围同步到当前范围
  confirm: oSelected => ({ type: buildConstant(PREFIX, SURE), weeks: oSelected }),

  // 设置面板选中周，初始化时触发
  setSelected: oSelected => ({ type: buildConstant(PREFIX, SET_SELECTED), selected: oSelected }),

  // 修改周输入框的值时触发，设置周输入框显示的开始周和结束周
  setWeekInput: oInput => ({ type: buildConstant(PREFIX, SET_WEEK_INPUT), input: oInput })
})

export default WeekPickerAction
