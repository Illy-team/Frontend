

/* 1. 일단 Ant Design 라이브러리 이용할거니깐 설치해 */
// npm install antd
/*
 * 아래 라이브러리 설치 필요
 * 캘린더는 Ant Design보다 아래 라이브러리가 굿굿임
 * 
 * npm install --save react-big-calendar
 * npm install --save moment
 */

/* 2. App.js와 inae_components 폴더에서만 놀았어요 */


// 3. 라우팅을 위해 command 창에서 아래 명령어 입력
// 사실 현재는 컴포넌트 구조 테스트 중이라 라우팅(페이지 이동)은 이용 안 하지만 보통은 하니깐 습관들여
//npm install react-router-dom@6

// 4. 라우팅을 위한 기본 라이브러리 불러와
import React, { useState } from "react";
import {Routes, Route, Link, useNavigate } from "react-router-dom";
import { Layout, Row, Col } from 'antd';

// 5. 나만의 js(Component) files 불러오기
import Home from "./my_components/Home";
import Test2 from "./my_components/user/Test2";
import LoginPage from "./my_components/user/LoginPage";
import SignUp from "./my_components/user/SignUp";
import DataTest from "./my_components/user/DataTest";
import UserInfo from "./my_components/user/UserInfo";

// 6. 다 작성했으면 command 창에서 현재 작업 프로젝트 상위 경로 (react_toy_project3-portfolio)로 이동 후
// npm start를 입력하여 실행
// 만약 빠져나오고싶다면 control + C 누르면 됨


// 7. css 불러오기
import './my_components/MyLayout.css';


const illyLogo = './inae_images/illy_logo.png';


// 8. App.js 에서 페이지 경로에 따라 호출할 컴포넌트 지정 (라우팅 구현)
// 1) nav tag 안에 링크들 넣고
// 2) Routes tag 안에 링크와 js mapping하고
// 3) Layout tag 안에 메인 페이지 구성  => Home.js에서 하즈아

/* 전체 화면 구성 경로 지정!! 경로에 따라 여는 페이지(앱 돌아가는 로직) 조정 (기획) */
//const illyLogo = './inae_images/illy_logo.png';

// 참고로, 띄어쓰기는 &nbsp

const HalfPage = () => {
  // 1) 로그인 상태를 관리하는 상태 변수
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // 2) 클릭 이벤트 (로그인하지 않았을 때는 다른 링크들로 이동하는 기능을 막는)
  const handleLinkClick = (e, path) => {
    if (!isLoggedIn && path !== '/login' && path !== '/join') { // 로그인하지 않았고, 이동하려는 링크가 로그인 또는 회원가입이 아닐 경우
      e.preventDefault(); // 링크로의 이동을 막음
      navigate('/login'); // 로그인 페이지로 이동
    }
  };

  // 3) 이동 경로(라우팅) 관리
  // (1) 로그인 하든 안 하든 막는 기능 x
  
  return (
    // 여백을 주기 위해 div로 묶는데 css 적용하려고 className 속성을 줌
    <div className="myLayout">
      <nav>
        <Link to="/"><img src={illyLogo} height={50} alt={'illy'}/> </Link>
          {isLoggedIn ? (
            <Link to="/userInfo">사용자 정보</Link>
          ) : (
            <>
              <Link to="/login">로그인</Link>
              <Link to="/join">회원가입</Link>
            </>
          )}
        
        {/*
        <Link to="/test">서버 연동 테스트</Link>
        <Link to="/test1">데이터 테스트</Link>
        */
          }
      </nav>

      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/join" element={<SignUp />} />
        <Route path="/userInfo" element={<UserInfo/>} />
        {/*
        <Route path="/test" element={<Test2 />} />
        <Route path="/test1" element={<DataTest />} />
        */}
      </Routes>
    </div>
  );
  

  // (2) 로그인 한 경우에만 이동 가능
  /*
  <div className="myLayout">
    <nav>
      <Link to="/" onClick={(e) => handleLinkClick(e, '/')}><img src={illyLogo} height={50} alt={'illy'}/> </Link>
      {isLoggedIn ? (
        <>
          <Link to="/userInfo" onClick={(e) => handleLinkClick(e, '/userInfo')}>사용자 정보</Link>
        </>
      ) : (
        <>
          <Link to="/login" onClick={(e) => handleLinkClick(e, '/login')}>로그인</Link>
          <Link to="/join" onClick={(e) => handleLinkClick(e, '/join')}>회원가입</Link>
        </>
      )}
      <Link to="/test" onClick={(e) => handleLinkClick(e, '/test')}>서버 연동 테스트</Link>
      <Link to="/test1" onClick={(e) => handleLinkClick(e, '/test1')}>데이터 테스트</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/join" element={<SignUp />} />
      <Route path="/test" element={<Test2 />} />
      <Route path="/mySchedule" element={<MySchedule />} />
      <Route path="/test1" element={<DataTest />} />
      <Route path="/userInfo" element={<UserInfo />} />
    </Routes>
  </div>
  */
};

export default HalfPage;

