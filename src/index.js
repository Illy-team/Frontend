import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

////////////////////////////////////////////////////
// Home.js <-> Page2.js
// 두 컴포넌트를 routing 해주기위해 라우팅 모듈 불러오기
import {BrowserRouter} from 'react-router-dom'
////////////////////////////////////////////////////

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  ////////////////////////////////////////////////////
  // 여러 컴포너트를 라우팅하기 위해 설정
  // BrowserRouter라는 라우터 태그 안에 App.js 넣어주기
  // .js 확장자 파일은 Components라서 xml tag처럼 이용 가능
  // App.js가 메인 페이지
  // 태그는 원래 <App></App> 이렇게 작성하는데
  // 단일 태그로 작성할거면(안에 추가 Components를 안 넣을거면) <App /> 이렇게 작성
  ////////////////////////////////////////////////////
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
