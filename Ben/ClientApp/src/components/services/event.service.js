import { useDispatch, useSelector } from 'react-redux';
import { EventAddAction, EventDeleteAction, EventEditAction } from '../../store/actions/event.action';

export class EventService {
	constructor() {
		this.dispatch = useDispatch();
		this.events = useSelector(state => state.event);
	}

	add = (event) => {
		this.dispatch(EventAddAction(event));
	}

	edit = (event) => {
		this.dispatch(EventEditAction(event));
	}

	delete = (event) => {
		this.dispatch(EventDeleteAction(event));
	}

	getList = () => {
		return this.events;
	}
}