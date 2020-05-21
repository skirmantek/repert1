import {
  SPECTACLE_ADD,
  SPECTACLE_CLEAR,
  SPECTACLE_GET,
  SPECTACLE_UPDATE,
  SPECTACLE_DELETE,
  SPECTACLES_ALL,
  SPECTACLE_COPY,
} from '../types'

export default function (state = {}, action) {
  switch (action.type) {
    case SPECTACLE_ADD:
      return { ...state, add: action.payload }
    case SPECTACLE_CLEAR:
      return {
        ...state,
        add: action.payload,
        update: action.payload,
        edit: action.payload,
      }
    case SPECTACLE_GET:
      return { ...state, edit: action.payload }
    case SPECTACLE_UPDATE:
      return { ...state, update: action.payload }
    case SPECTACLE_DELETE:
      return { ...state, deleted: action.payload }
    case SPECTACLES_ALL:
      return { ...state, repertoire: action.payload }
    case SPECTACLE_COPY:
      return { ...state, add: action.payload }
    default:
      return state
  }
}
