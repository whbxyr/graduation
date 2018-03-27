/**
 * DatePicker组件action创建工厂函数，接收PREFIX前缀
 * 
 */

import { SET_PICKER_VISIBILITY, PREV_MONTH, NEXT_MONTH, SURE, SELECT_DATE, SET_CURRENT, SET_SELECTED, SET_PICKER_MONTHS, SET_DATE_INPUT, buildConstant } from './constants'

const DatePickerAction = PREFIX => ({
    // 点击日期范围显示框触发，设置日期选择面板的显示/隐藏状态
    setPickerVisility: bVisible => ({ type: buildConstant(PREFIX, SET_PICKER_VISIBILITY), visible: bVisible }),

    // 点击翻页触发，日期选择面板显示的月份向前翻页
    prevMonths: () => ({ type: buildConstant(PREFIX, PREV_MONTH) }),

    // 点击翻页触发，日期选择面板显示的月份向后翻页
    nextMonths: () => ({ type: buildConstant(PREFIX, NEXT_MONTH) }),

    // 点击确定触发，将选中的日期同步到当前日期
    ok: oSelected => ({ type: buildConstant(PREFIX, SURE), dates: oSelected }),

    // 点击选中某个日期时触发，修改选中的日期范围
    selectDate: (dateid, single) => ({ type: buildConstant(PREFIX, SELECT_DATE), dateid, single }),

    // 设置当前日期，初始化时触发
    setCurrent: oCurrent => ({type: buildConstant(PREFIX, SET_CURRENT), current: oCurrent }),

    // 设置面板选中日期，初始化时触发
    setSelected: oSelected => ({type: buildConstant(PREFIX, SET_SELECTED), selected: oSelected }),
    
    // 设置面板显示的月份
    setPickerMonths: aMonths => ({type: buildConstant(PREFIX, SET_PICKER_MONTHS), months: aMonths}),

    // 修改日期输入框的值时触发，设置日期输入框显示的开始日期和结束日期
    setDateInput: oInput => ({type: buildConstant(PREFIX, SET_DATE_INPUT), input: oInput })
})

export default DatePickerAction
