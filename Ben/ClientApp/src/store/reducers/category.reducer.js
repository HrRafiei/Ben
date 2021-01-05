import * as types from '../types.type';

export function CategoryReducer(state = [], action) {
    let category = action.category;
    switch (action.type) {
        case types.category_add:
            return [category, ...state];
        case types.category_delete:
            return state.filter(cat => cat.id !== category.id);
        case types.category_edit:
            let list = state.filter(cat => cat.id !== category.id);
            return [category, ...list];
        default:
            return state;
    }
}