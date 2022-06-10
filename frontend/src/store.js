import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { productDetailsRoute, productReduce } from './reduces/productReduce';
import { userReducer } from './reduces/userReducer';

const reducer = combineReducers({
  products: productReduce,
  productDetails: productDetailsRoute,
  user: userReducer,
});

const initialState = {};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
