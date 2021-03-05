import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './root/Root'
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <React.StrictMode>
            <Root />
        </React.StrictMode>
    </BrowserRouter >,
    document.getElementById('root'))
