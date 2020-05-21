import { combineReducers } from 'redux'
import spectacles from './spectacles_reducer'
import user from './users_reducer'

const rootReducer = combineReducers({
  spectacles,
  user,
})

export default rootReducer
