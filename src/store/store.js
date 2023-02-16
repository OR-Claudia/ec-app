//combined place for redux reducers!
import { compose, legacy_createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const middleWares = [process.env.NODE_ENV !== "production" && logger].filter(
	Boolean
); //filters by truthy values! useful

// const loggerMiddleware = (store) => (next) => (action) => {
// 	if (!action.type) {
// 		return next(action);
// 	}
// 	console.log("type", action.type);
// 	console.log("payload", action.payload);
// 	console.log("currentState", store.getState()); //value of the state right now

// 	next(action); //synchronous update action!

// 	console.log("nextState", store.getState());
// };

const persistConfig = {
	key: "root",
	storage,
	blacklist: ["user"], //this can conflict and clash with the persistence of data
};
const composeEnhancer =
	(process.env.NODE_ENV !== "production" &&
		window &&
		window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_) ||
	compose;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));
//middleware stays between components and store
//dispatch > middleware > reducer/redux
//for two middlewares dispatch > middleware 1 next() > middleware 2 next() > redux

export const store = legacy_createStore(
	persistedReducer,
	undefined,
	composedEnhancers
);

export const persistor = persistStore(store);
