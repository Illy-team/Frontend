/** 사용 XXXXXXXX */
import React from 'react';
import { useContext, useLocation, useNavigate, useParams } from 'react-router-dom';  // 뒤로가기 기능을 위해 가져오기
import { Form, Input, Button, Checkbox } from 'antd';
import { Table, Row, Col, Card } from 'antd';

// 저장된 공고 정보를 announcements로 받앙
const DetailCompetitionComponent = (/*{announcement }*/) => {
  //const { announcement } = useParams(); // 매개변수를 받아옵니다.

  /** 뒤로가기 기능 함수 */
  //const announcement = useLocation().state.announcement;
  const navigate = useNavigate();
  const announcement = useLocation().announcement


  const goBack = () => {
    // 뒤로가기
    navigate(-1);
  };


  /** 3. 화면에 출력 */
  return (
    // (1) 서버로부터 받아온 데이터를 테이블에 띄우기
    //<Table dataSource={data} columns={columns} />

    // (2) 정적 데이터 띄우기

    <Row gutter={16} style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      <p>{announcement.eventId}</p> {/* 전달받은 정보를 출력합니다. */}
      <Col span={8} style={{ background: '#fff', height: '100vh', padding: '20px' }}>
        <Card title={announcement.eventId} style={{ margin: '5px' }}>
          <img src={announcement.image} style={{width: '150px'}}/>
        </Card>
      </Col>
      <Col span={8} style={{ background: '#fff', height: '100vh', padding: '20px' }}>
        <Card title={announcement.eventId} style={{ margin: '5px' }}>
         
        </Card>
      </Col>
      <Button onClick={goBack}>뒤로 가기</Button>
    </Row>
  );
};

export default DetailCompetitionComponent;
