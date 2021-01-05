import { useDispatch, useSelector } from 'react-redux';
import { TagAddAction, TagDeleteAction, TagEditAction } from '../../store/actions/tag.action';



export class TagService {

    constructor() {
        this.dispatch = useDispatch();
        this.tags = useSelector(state => state.tag);
    }

    add =  tag => {
        this.dispatch(TagAddAction(tag))
    }

    edit =  tag => {
        this.dispatch(TagEditAction(tag))
    }

    delete =  tag => {
        this.dispatch(TagDeleteAction(tag))
    }

    getList = () => {
        return this.tags;
    }
}

