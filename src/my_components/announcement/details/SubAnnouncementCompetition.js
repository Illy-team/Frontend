/** 사용 XXXXXXXX */
/** 백업용 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Routes, Route, Link } from "react-router-dom";
import { Table, Row, Col, Card } from 'antd';
import DetailCompetition from "./details/DetailCompetition";


const CompetitionListComponent = ({announcements= [] }) => {
  /** 1. 데이터 가져오기 *
  // (1) 서버로부터 데이터 받아오기, 경로를 /api/employees로 설정한 경우 
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/api/employees');
      setData(result.data);
    };
    fetchData();
  }, []);
  */

 // (2) 정적으로 작성
  const columns = [
    {
      title: '회사',
      image: '',
      dataIndex: 'host_name',
      key: 'host_name',
    },
    {
      title: '제목',
      image: '',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '지원자격',
      image: '',
      dataIndex: 'requirement',
      key: 'requirement',
    },
    {
      title: '근무조건',
      image: '',
      dataIndex: 'tasks',
      key: 'tasks',
    },
  ];

  /** 2. 데이터를 화면에 출력하기 */
return (
    // (1) 서버로부터 받아온 데이터를 테이블에 띄우기
    //<Table dataSource={data} columns={columns} />

    // (2) 정적 데이터 띄우기
    // DetailCompetition.js에 ${announcement} 정보 전달
    //<Link to={`/mySchedule/detail/${announcement.eventId}`) state={{ data: data}}>
    // <Link to={{ pathname: `/mySchedule/detail/${announcement.eventId}`, state: { announcement: announcement } }}>
    //<Link to={{ pathname: `/mySchedule/detail/${announcement.eventId}`, state: { announcement: {announcement} } }}>
    //  <Link to={{ pathname: `/mySchedule/detail/${announcement.eventId}`, state: { announcement: {announcement} } }}>
    // <Link to={`/mySchedule/detail/${announcement.eventId}`}>
    //  <Link to={{ pathname: `/mySchedule/detail/${announcement.eventId}`, announcement: { announcement } }}>

    <div>
    <Row gutter={16} style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
    {announcements
    .filter(announcement => announcement.type === 'CONTEST') // 'ACTIVITY' 타입만 필터링
    .map((announcement, idx) => (
        <div key={idx}>
          
          <Col>
              <Card title={announcement.eventId} style={{ margin: '5px' }}>
              <img src={announcement.image} style={{width: '50px'}}/>
              <h3>[{announcement.hostName}] {announcement.title}</h3>
              <p><strong>지원자격</strong> {announcement.requirement} </p>
              <p><strong>근무조건</strong> {announcement.tasks} </p>
              </Card>
          </Col>
        </div>
    ))}
    </Row>
    </div>
    
);
};

export default CompetitionListComponent;
