import React, { useState } from 'react';
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

    // (1) 정적으로 데이터 가져오기
    const [announcements, setAnnouncements] = useState([
      {
        eventId: 1,
        type: "JOB",
        hostName: "넥스트챕터(NextChapter)",
        image: "https://static.wanted.co.kr/images/wdes/0_4.b17f6cad.png",
        category: "영업",
        title: "[100억↑투자] Global Sales",
        applyDate: "상시채용",
        link: "https://www.wanted.co.kr/wd/177914",
        tasks: "• 해외 시장 분석 및 영업 기획\n• 신규 바이어 발굴/세일즈/관리 총괄\n• 국가별 사업 확장 위한 최적 유통 판매 전략 수립 및 채널 개척\n• 국가별 핵심 해외 파트너 채널 관리\n• 현지 거래처 미팅 및 수출 관련 유관기관 커뮤니케이션 수행\n• 필요 시, 현지 마케팅 및 전시회 지원",
        requirement: "• 3년 이상의 해외 B2B 영업 경험이 있으신 분\n• 해외 거래처와 원활한 커뮤니케이션이 가능하신분\n• 글로벌 뷰티 제품 및 시장에 대한 이해도가 있으신 분\n• 국가별 바이어 특성에 대한 이해도가 있으신 분\n• 높은 수준의 Work Ethics",
        preferred: "• 스타트업 해외 영업 경험 보유\n• 소비재 대기업 해외 영업 경험 보유\n• 비즈니스 레벨의 일본어 실력",
        activityDate: null,
      },
      {
        eventId: 2,
        type: "JOB",
        hostName: "넥스트챕터(NextChapter)",
        image: "https://static.wanted.co.kr/images/wdes/0_4.b17f6cad.png",
        category: "영업",
        title: "[100억↑투자] Global Sales",
        applyDate: "상시채용",
        link: "https://www.wanted.co.kr/wd/177914",
        tasks: "• 해외 시장 분석 및 영업 기획\n• 신규 바이어 발굴/세일즈/관리 총괄\n• 국가별 사업 확장 위한 최적 유통 판매 전략 수립 및 채널 개척\n• 국가별 핵심 해외 파트너 채널 관리\n• 현지 거래처 미팅 및 수출 관련 유관기관 커뮤니케이션 수행\n• 필요 시, 현지 마케팅 및 전시회 지원",
        requirement: "• 3년 이상의 해외 B2B 영업 경험이 있으신 분\n• 해외 거래처와 원활한 커뮤니케이션이 가능하신분\n• 글로벌 뷰티 제품 및 시장에 대한 이해도가 있으신 분\n• 국가별 바이어 특성에 대한 이해도가 있으신 분\n• 높은 수준의 Work Ethics",
        preferred: "• 스타트업 해외 영업 경험 보유\n• 소비재 대기업 해외 영업 경험 보유\n• 비즈니스 레벨의 일본어 실력",
        activityDate: null,
      },
      {
        eventId: 3,
        type: "JOB",
        hostName: "넥스트챕터(NextChapter)",
        image: "https://static.wanted.co.kr/images/wdes/0_4.b17f6cad.png",
        category: "영업",
        title: "[100억↑투자] Global Sales",
        applyDate: "상시채용",
        link: "https://www.wanted.co.kr/wd/177914",
        tasks: "• 해외 시장 분석 및 영업 기획\n• 신규 바이어 발굴/세일즈/관리 총괄\n• 국가별 사업 확장 위한 최적 유통 판매 전략 수립 및 채널 개척\n• 국가별 핵심 해외 파트너 채널 관리\n• 현지 거래처 미팅 및 수출 관련 유관기관 커뮤니케이션 수행\n• 필요 시, 현지 마케팅 및 전시회 지원",
        requirement: "• 3년 이상의 해외 B2B 영업 경험이 있으신 분\n• 해외 거래처와 원활한 커뮤니케이션이 가능하신분\n• 글로벌 뷰티 제품 및 시장에 대한 이해도가 있으신 분\n• 국가별 바이어 특성에 대한 이해도가 있으신 분\n• 높은 수준의 Work Ethics",
        preferred: "• 스타트업 해외 영업 경험 보유\n• 소비재 대기업 해외 영업 경험 보유\n• 비즈니스 레벨의 일본어 실력",
        activityDate: null,
      },
      {
        eventId: 4,
        type: "ACTIVITY",
        hostName: "넥스트챕터(NextChapter)",
        image: "https://static.wanted.co.kr/images/wdes/0_4.b17f6cad.png",
        category: "영업",
        title: "[100억↑투자] Global Sales",
        applyDate: "상시채용",
        link: "https://www.wanted.co.kr/wd/177914",
        tasks: "• 해외 시장 분석 및 영업 기획\n• 신규 바이어 발굴/세일즈/관리 총괄\n• 국가별 사업 확장 위한 최적 유통 판매 전략 수립 및 채널 개척\n• 국가별 핵심 해외 파트너 채널 관리\n• 현지 거래처 미팅 및 수출 관련 유관기관 커뮤니케이션 수행\n• 필요 시, 현지 마케팅 및 전시회 지원",
        requirement: "• 3년 이상의 해외 B2B 영업 경험이 있으신 분\n• 해외 거래처와 원활한 커뮤니케이션이 가능하신분\n• 글로벌 뷰티 제품 및 시장에 대한 이해도가 있으신 분\n• 국가별 바이어 특성에 대한 이해도가 있으신 분\n• 높은 수준의 Work Ethics",
        preferred: "• 스타트업 해외 영업 경험 보유\n• 소비재 대기업 해외 영업 경험 보유\n• 비즈니스 레벨의 일본어 실력",
        activityDate: null,
      },
      {
        eventId: 5,
        type: "CONTEST",
        hostName: "넥스트챕터(NextChapter)",
        image: "https://static.wanted.co.kr/images/wdes/0_4.b17f6cad.png",
        category: "영업",
        title: "[100억↑투자] Global Sales",
        applyDate: "상시채용",
        link: "https://www.wanted.co.kr/wd/177914",
        tasks: "• 해외 시장 분석 및 영업 기획\n• 신규 바이어 발굴/세일즈/관리 총괄\n• 국가별 사업 확장 위한 최적 유통 판매 전략 수립 및 채널 개척\n• 국가별 핵심 해외 파트너 채널 관리\n• 현지 거래처 미팅 및 수출 관련 유관기관 커뮤니케이션 수행\n• 필요 시, 현지 마케팅 및 전시회 지원",
        requirement: "• 3년 이상의 해외 B2B 영업 경험이 있으신 분\n• 해외 거래처와 원활한 커뮤니케이션이 가능하신분\n• 글로벌 뷰티 제품 및 시장에 대한 이해도가 있으신 분\n• 국가별 바이어 특성에 대한 이해도가 있으신 분\n• 높은 수준의 Work Ethics",
        preferred: "• 스타트업 해외 영업 경험 보유\n• 소비재 대기업 해외 영업 경험 보유\n• 비즈니스 레벨의 일본어 실력",
        activityDate: null,
      },
    ]);




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
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            {/* (1) 메뉴 1을 클릭했을 때 띄울 화면 */}
            {selectedMenu === '1' && (
              // Info 컨텐츠
              <div>
                  <SubAnnouncementEmployment
                    announcements = {announcements}
                  />
              </div>
            )}
  
            {/***********************************************************/}
            {/* (2) 메뉴 2를 클릭했을 때 띄울 화면 */}
            {selectedMenu === '2' && (
              // Info 컨텐츠
              <div>
                <SubAnnouncementCompetition
                  announcements = {announcements}
                />
              </div>
            )}
  
            {/***********************************************************/}
            {/* (3) 메뉴 3을 클릭했을 때 띄울 화면 */}
            {selectedMenu === '3' && (
              // Info 컨텐츠
              <div>
                <SubAnnouncementActivity
                  announcements = {announcements}
                />
              </div>
            )}
          </div>
        </Content>
      </Layout>
    );
};

export default AnnouncementPage;