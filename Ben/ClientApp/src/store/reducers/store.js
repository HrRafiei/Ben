import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { CategoryReducer } from './category.reducer';
import { EventReducer } from './event.reducer';
import { TagReducer } from './tag.reducer';
import { UserReducer } from './user.reducer';



const composeEnhancer = composeWithDevTools({

});

const reducer = combineReducers({
    category: CategoryReducer,
    tag: TagReducer,
    user: UserReducer,
    event: EventReducer
});


const Store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));
export default Store;

