import React, { useState } from 'react';
import { Layout, Menu, Card, Col, Row, Button, Table  } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Announcement from "./announcement/Announcement";
import PortfolioPage from "./portfolio/PortfolioPage";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;



// 함수
//function Portfolio() {

// 매개인자를 받는 함수
function Portfolio(/*{ portfolios = [], personalInfos = {} }*/) {
  // 1. 메뉴 1을 클릭하면 Content 1이 보이고, 메뉴 1를 클릭하면 Content 2를 보이도록 수정하시오.
  const [selectedMenu, setSelectedMenu] = useState('1');

  // 2. 클릭 이벤트 생성!! (마우스 클릭시 이벤트 발생하는 기능 추가)
  const handleMenuClick = (e) => {
    setSelectedMenu(e.key);
  };


  // 3. 페이지 구성!!! UI!!!
  return (
    <Layout className="layout" style={{margin: 0, padding: 0}}> 
      {/* 1) Menu Bar */}
      {/* 메뉴 그라데이션 효과!! 스카이블루 -> 라임 */}
      <Header style={{ 
              background: 'linear-gradient(to right, rgb(135, 216, 248), rgb(255, 255, 145))', 
              margin: 0,
              padding: 0 }}>
        <div className="logo" />
        {/* Menu tag에 onClick 속성을 추가해서 클릭 이벤트 넣기!! */}
        <Menu 
          theme="light" 
          mode="horizontal" 
          defaultSelectedKeys={['1']} 
          style={{ float: 'right'}}
          onClick={handleMenuClick}
        >
          {/* 만약 각 메뉴 크기를 정적으로 고정할거면 2번째 메뉴처럼 width를 style 속성으로 줘도 됨
            * 가운데 맞춤까지 해줬음
            */}
          <Menu.Item key="1" style={{ width: 100, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial' }} >공고</Menu.Item>
          <Menu.Item key="2" style={{ width: 100, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial' }} >포트폴리오</Menu.Item>
          {/* Add more menu items if needed... */}
        </Menu>
      </Header>

      

      {/* 2) Content 포트폴리오 그리드!! */}
      {/* => 메뉴 버튼 이벤트에 따라 화면 전환 구현!! */}
      <Content style={{ background: 'white', padding: '0 50px',margin: 0, padding: 0 }}>
        <div className="site-layout-content">
          {/* (1) 메뉴 1을 클릭했을 때 띄울 화면 */}
          {selectedMenu === '1' && (
            // Info 컨텐츠
            <div>
              <h1>나의 맞춤 공고</h1>
              <Announcement/>
            </div>
          )}

          {/***********************************************************/}
          {/* (2) 메뉴 2를 클릭했을 때 띄울 화면 */}
          {selectedMenu === '2' && (
            // 포트폴리오 컨텐츠
            <PortfolioPage/>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Portfolio;