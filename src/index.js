import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import './assets/style/index.less';
import 'antd/dist/antd.less'
import './Mock'
import { Provider } from 'react-redux'
import store from '@/redux/store.js'
import App from './App'
import { getUser } from '@/utils/storageUtil.js'
import { login } from '@/redux/slices/login-slice.js';

const data = getUser()
if (data.uid) store.dispatch(login(data)) //检查本地登录信息，更新redux中登录状态
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
