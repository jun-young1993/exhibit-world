import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RecoilRoot} from "recoil";
import { globalErrorAtom } from 'store/recoil/global-exception.recoil';
import { ErrorBoundary } from 'react-error-boundary';
import Login from 'components/home/login';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
function AppRoot(){
    return (
        <RecoilRoot
            // initializeState={({ set }) => {
            // // 초기에 에러 상태를 null로 설정
            //     set(globalErrorAtom, null);
            // }}
        >
            {/* <ErrorBoundary fallback={<Login />}> */}
                <Suspense fallback={<div>loading...</div>}>
                    <React.StrictMode>
                        <App />
                    </React.StrictMode>
                </Suspense>
            {/* </ErrorBoundary> */}
        </RecoilRoot>
    )
}
root.render(
    <AppRoot />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
