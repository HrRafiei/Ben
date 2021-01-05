import * as types from '../types.type';

export function UserAddAction(user) {
    return {
        type: types.user_add,
        user: user
    }
}

export function UserEditAction(user) {
    return {
        type: types.user_update,
        user: user
    }
}


export function UserDeleteAction(user) {
    return {
        type: types.user_delete,
        user: user
    }
}