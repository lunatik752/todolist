import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {reducer} from "./reducer";


const rootReducer = combineReducers({
    todoListPage: reducer}
)

type RootReducerType = typeof rootReducer;

export  type  AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
export default store;