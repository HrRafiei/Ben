import * as types from '../types.type';

export function CategoryAddAction(category) {
    return {
        type: types.category_add,
        category: category
    }
}

export function CategoryEditAction(category) {
    return {
        type: types.category_edit,
        category: category
    }
}

export function CategoryDeleteAction(category) {
    return {
        type: types.category_delete,
        category: category
    }
}