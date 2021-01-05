import React from 'react';
import './custom.css';


import {
    Router, Route, Switch, useHistory
} from 'react-router-dom';

import {
    Provider
} from 'react-redux';


import { ConfigProvider } from 'antd';
import Store from './store/reducers/store';

import { Home } from './components/home/Home';
import { Admin } from './components/admin/Admin';
import { Register } from './components/home/register/Register';
import { Guest } from './components/guest/Guest';
import {Login} from './components/home/Login';
import PrivateRoute from './components/utils/PrivateRoute';

function App() {
    const history = useHistory();
    return (
        <Provider store={Store}>
            <Router history={history}>
                <Switch>
                    <ConfigProvider direction='rtl'>
                        <Route exact={ true } path='/' component={Home}/>
                        <Route path='/register' component={Register} />

                        <Route path='/login' component={Login} />
                        <PrivateRoute path='/guest' component={Guest} />
                        <PrivateRoute path='/admin' component={Admin} />
                    </ConfigProvider>
                </Switch>
            </Router>
        </Provider>
    );
}
export default App;