//combined place for redux reducers!
import { compose, legacy_createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// const middleWares = [logger];

const loggerMiddleware = (store) => (next) => (action) => {
	if (!action.type) {
		return next(action);
	}
	console.log("type", action.type);
	console.log("payload", action.payload);
	console.log("currentState", store.getState()); //value of the state right now

	next(action); //synchronous update action!

	console.log("nextState", store.getState());
};

const composedEnhancers = compose(applyMiddleware(loggerMiddleware));
//middleware stays between components and store
//dispatch > middleware > reducer/redux
//for two middlewares dispatch > middleware 1 next() > middleware 2 next() > redux

export const store = legacy_createStore(
	rootReducer,
	undefined,
	composedEnhancers
);
