import {bindActionCreators} from 'redux'
import connect from 'redux-weapp'
import store from './redux/configureStore'
import * as actions from './actions'

export {
  connect,
  bindActionCreators,
  store,
  actions
}
