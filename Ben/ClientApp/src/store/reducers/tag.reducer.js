import * as types from '../types.type';

export function TagReducer(state = [], action) {
    let tag = action.tag;
    switch (action.type) {
        case types.tag_add:
            return [tag, ...state];
        case types.tag_delete:
            return state.filter(cat => cat.id !== tag.id);
        case types.tag_edit:
            let list = state.filter(cat => cat.id !== tag.id);
            return [tag, ...list];
        default:
            return state;
    }
}