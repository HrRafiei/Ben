import * as types from '../types.type';

export function TagAddAction(tag) {
    return {
        type: types.tag_add,
        tag: tag
    }
}

export function TagEditAction(tag) {
    return {
        type: types.tag_edit,
        tag: tag
    }
}

export function TagDeleteAction(tag) {
    return {
        type: types.tag_delete,
        tag: tag
    }
}