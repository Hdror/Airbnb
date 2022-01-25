import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { stayReducer } from './stay.reducer.js'
import { userReducer } from './user.reducer.js'
import { pageReducer } from './page.reducer.js'
import { tripReducer } from './trip/trip.reducer.js'
import { orderReducer } from '../store/order/order.reducer.js'

const rootReducer = combineReducers({
  stayModule: stayReducer,
  userModule: userReducer,
  pageModule: pageReducer,
  tripModule: tripReducer,
  orderModule: orderReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

