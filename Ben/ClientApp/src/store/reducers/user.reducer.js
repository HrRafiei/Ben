import * as types from '../types.type';

export function UserReducer(state = [], action) {
    let user = action.user;
    switch (action.type) {
        case types.user_add:
            return [user, ...state];
        case types.user_delete:
            return state.filter(u => u.id !== user.id);
        case types.user_delete:
            let list = state.filter(u => u.id !== user.id);
            return [user, ...list];
        default:
            return state;
    }
}