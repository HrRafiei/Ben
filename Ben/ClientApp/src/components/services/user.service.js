import { useSelector, useDispatch } from 'react-redux';
import { UserAddAction, UserDeleteAction, UserEditAction } from '../../store/actions/user.action';

export class UserService {
    constructor() {
        this.dispatch = useDispatch();
        this.users = useSelector(state => state.user); 
    }

    add = user => {
        this.dispatch(UserAddAction(user));
    }

    edit = user => {
        this.dispatch(UserEditAction(user));
    }

    delete = user => {
        this.dispatch(UserDeleteAction(user));
    }

    getList = () => {
        return this.users;
    }
}
