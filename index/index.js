import 'babel-polyfill'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter, BrowserRouter as Router, Redirect } from 'react-router-dom'
import './public/css/nprogress.css'
import Index from './components/index/index'
import Bundle from './bundle';
import rootReducer from './reducers'
import { createStore } from 'redux'
import LoginController from 'bundle-loader?lazy&name=login!./components/login'
import RegisterController from 'bundle-loader?lazy&name=register!./components/register'
import FzfController from 'bundle-loader?lazy&name=fzf!./components/fzf'
import { PersistGate } from 'redux-persist/es/integration/react'

import configureStore from './configureStore'

const { persistor, store } = configureStore()

const onBeforeLift = () => {
  // take some action before the gate lifts
}
// const store = createStore(rootReducer)
const Login = (props) => <Bundle load={LoginController}>{(A) => <A {...props} />}</Bundle>;
const Register = (props) => <Bundle load={RegisterController}>{(A) => <A {...props} />}</Bundle>;
const Fzf = (props) => <Bundle load={FzfController}>{(A) => <A {...props} />}</Bundle>;
setTimeout(() => {
    ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <HashRouter>
                    <div>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/register" component={Register} />
                            <Route path="/404" component={Fzf} />
                            <Route path="/" component={Index} />
                        </Switch>
                    </div>
                </HashRouter>
            </PersistGate>
        </Provider>

        , document.getElementById("app")
    );
}, 500);