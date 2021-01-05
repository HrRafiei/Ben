import * as types from '../types.type';
export function EventAddAction(event) {
    return {
        type: types.event_add,
        event: event
    }
}

export function EventEditAction(event) {
    return {
        type: types.event_edit,
        event: event
    }
}

export function EventDeleteAction(event) {
    return {
        type: types.event_delete,
        event:event
    }
}