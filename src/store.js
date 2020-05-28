import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {reducer} from "./reducer";

// сделать здесь комбаин редьюсер combineReducers
let reducers = combineReducers({
    todoListPage: reducer}
)


const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
export default store;