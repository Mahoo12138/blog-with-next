import { SET_READER, SET_ANIMATION, SHOW_READER, HIDE_READER } from './actions'
import { AnyAction } from '@reduxjs/toolkit'
import { Blog } from '@blog/metadata/post'

type ReaderState = {
  animation: 'in' | 'out' | ''
  visible: boolean
  postData?: Blog
}

const ReaderInitialState: ReaderState = {
  animation: '',
  visible: false,
  // @ts-ignore
  postData: null,
}

const readerReducer = (
  state = ReaderInitialState,
  action: AnyAction
): typeof ReaderInitialState => {
  switch (action.type) {
    case SET_READER:
      return {
        ...state,
        postData: action.payload.postData,
      }
    case SHOW_READER:
      return {
        ...state,
        visible: true,
      }
    case HIDE_READER:
      return {
        ...state,
        visible: false,
      }
    case SET_ANIMATION:
      return {
        ...state,
        animation: action.payload.state,
      }
    default:
      return state
  }
}

export default readerReducer
