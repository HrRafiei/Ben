import { useDispatch, useSelector } from 'react-redux';
import { CategoryAddAction, CategoryDeleteAction, CategoryEditAction } from '../../store/actions/caregory.action';



export class CategoryService {

    constructor() {
        this.dispatch = useDispatch();
        this.categories = useSelector(state => state.category);
    }

    add =  category => {
        this.dispatch(CategoryAddAction(category))
    }

    edit =  category => {
        this.dispatch(CategoryEditAction(category))
    }

    delete =  category => {
        this.dispatch(CategoryDeleteAction(category))
    }

    getList = () => {
        return this.categories;
    }
}

