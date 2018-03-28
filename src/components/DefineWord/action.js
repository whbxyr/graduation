import { SET_DEFINE_WORD, buildConstant } from './constants'

const DefineWordAction = (PREFIX) => ({
  // 设置自定义词典的action
  changeDefineWord: (word) => ({
    type: buildConstant(PREFIX, SET_DEFINE_WORD),
    define_word: word
  })
})

export default DefineWordAction
