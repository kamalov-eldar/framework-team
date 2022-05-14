import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import paintingsReducer from "./paintings/reducer";

//создаем обьект и собираем все редюсеры как св-ва обьекта
const reducers = paintingsReducer;

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
//, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

//export default store;
window.store = store;
