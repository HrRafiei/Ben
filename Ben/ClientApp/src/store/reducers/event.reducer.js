import * as types from '../types.type';
export function EventReducer(state = [], action) {
    let event = action.event;
    switch (action.type) {
        case types.event_add:
            return [event, ...state];
        case types.event_delete:
            return state.filter(f => f.id !== event.id);
        case types.event_edit:
            let list = state.filter(f => f.id !== event.id);
            return [event, ...list];
        default:
            return state;
    }
}