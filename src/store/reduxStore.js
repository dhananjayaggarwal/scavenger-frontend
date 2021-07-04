import { createStore } from 'redux'
// import rootReducer from './reducers'

const countReducer = function (state = 0, action) {
    switch (action.type) {
      case "INCREMENT":
        return state + 1;
      case "DECREMENT":
        return state - 1;
      default:
        return state;
    }
  };

export const store = createStore(countReducer)