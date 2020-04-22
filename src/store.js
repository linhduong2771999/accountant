import {createStore, applyMiddleware } from "redux";
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from "./reducers/index";
import Saga from "./sagas/index";
const loggerMiddlware = createLogger({
    predicate: () => process.env.NODE_ENV === 'development'
})

const sagasMiddleware = createSagaMiddleware();

const middlewares = [sagasMiddleware, loggerMiddlware];


export default () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(...middlewares)
    )
    sagasMiddleware.run(Saga)
    return { store }
}
