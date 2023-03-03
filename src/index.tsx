import React from 'react';
import ReactDOM from 'react-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <App />
            </QueryParamProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
);
