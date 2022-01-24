import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { stayReducer } from './stay.reducer.js'
import { userReducer } from './user.reducer.js'
import { pageReducer } from './page.reducer'

// import { orderReducer } from './order.reducer.js'

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
  pageModule: pageReducer,

  //   orderModule: orderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

