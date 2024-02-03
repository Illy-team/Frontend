import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Layout, Menu, Card, Col, Row, Button, Table  } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import SubAnnouncementEmployment from "./SubAnnouncementEmployment";
import SubAnnouncementCompetition from "./SubAnnouncementCompetition";
import SubAnnouncementActivity from "./SubAnnouncementActivity";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function AnnouncementPage({ portfolios = [], personalInfos = {} }) {
    // 1. 메뉴 1을 클릭하면 Content 1이 보이고, 메뉴 1를 클릭하면 Content 2를 보이도록 수정하시오.
    const [selectedMenu, setSelectedMenu] = useState('1');


    // 2. 동적으로 데이터 가져오기
    /// (2)-(1) Activity infos
    const [activityInfos, setActivityInfos] = useState([]);
    useEffect(() => {
      getActivityInfos();
    }, []);
    const getActivityInfos = async () => {
      // AWS EC2 서버 URL과 TOKEN
      const API_URL = 'http://15.164.143.17:8080/api/v1/events/activities';
      const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` }
        });
        if (response.data.status === 200) {
          setActivityInfos(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    /// (2)-(2) Contest infos
    const [contestInfos, setContestInfos] = useState([]);
    useEffect(() => {
      getContestInfos();
    }, []);
    const getContestInfos = async () => {
      // AWS EC2 서버 URL과 TOKEN
      const API_URL = 'http://15.164.143.17:8080/api/v1/events/contests';
      const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` }
        });
        if (response.data.status === 200) {
          setContestInfos(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    /// (2)-(3) Job infos
    const [jobInfos, setJobInfos] = useState([]);
    useEffect(() => {
      getJobInfos();
    }, []);
    const getJobInfos = async () => {
      // AWS EC2 서버 URL과 TOKEN
      const API_URL = 'http://15.164.143.17:8080/api/v1/events/jobs';
      const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
      try {
        const response = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${TOKEN}` }
        });
        if (response.data.status === 200) {
          setJobInfos(response.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    }




    // 2. 클릭 이벤트 생성!! (마우스 클릭시 이벤트 발생하는 기능 추가)
    const handleMenuClick = (e) => {
      setSelectedMenu(e.key);
    };


    // 3. 페이지 구성!!! UI!!!
    return (
        <Layout className="layout"> 
        {/* 1) Menu Bar */}
        {/* 메뉴 그라데이션 효과!! 스카이블루 -> 라임 */}
        <Header style={{ background: 'white', margin: 0, padding: 0 }}>
          <div />
          {/* Menu tag에 onClick 속성을 추가해서 클릭 이벤트 넣기!! */}
          <Menu 
            theme="light" 
            mode="horizontal" 
            defaultSelectedKeys={['1']} 
            style={{ float: 'left' }}
            onClick={handleMenuClick}
          >
            {/* 만약 각 메뉴 크기를 정적으로 고정할거면 2번째 메뉴처럼 width를 style 속성으로 줘도 됨
              * 가운데 맞춤까지 해줬음
              */}
            <Menu.Item key="1" style={{ width: 100, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial' }} >채용</Menu.Item>
            <Menu.Item key="2" style={{ width: 100, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial' }} >공모전</Menu.Item>
            <Menu.Item key="3" style={{ width: 100, textAlign: 'center', fontWeight: 'bold', fontFamily: 'Arial' }} >대외활동</Menu.Item>
            {/* Add more menu items if needed... */}
          </Menu>
        </Header>
  
        
  
        {/* 2) Content 포트폴리오 그리드!! */}
        {/* => 메뉴 버튼 이벤트에 따라 화면 전환 구현!! */}
        <Content style={{ margin:0, padding:0, background:'white' }}>
          <div className="site-layout-content">
            {/* (1) 메뉴 1을 클릭했을 때 띄울 화면 */}
            {selectedMenu === '1' && (
              // Info 컨텐츠
              <div>
                  <SubAnnouncementActivity
                    announcements = {activityInfos}
                  />
              </div>
            )}
  
            {/***********************************************************/}
            {/* (2) 메뉴 2를 클릭했을 때 띄울 화면 */}
            {selectedMenu === '2' && (
              // Info 컨텐츠
              <div>
                <SubAnnouncementCompetition
                  announcements = {contestInfos}
                />
              </div>
            )}
  
            {/***********************************************************/}
            {/* (3) 메뉴 3을 클릭했을 때 띄울 화면 */}
            {selectedMenu === '3' && (
              // Info 컨텐츠
              <div>
                <SubAnnouncementEmployment
                  announcements = {jobInfos}
                />
              </div>
            )}
          </div>
        </Content>
      </Layout>
    );
};

export default AnnouncementPage;