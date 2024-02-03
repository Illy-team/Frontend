import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Row, Col, Card, Modal } from 'antd';


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

  // (2) 클릭 이벤트
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null); // 선택된 공고를 저장할 상태

  // 공고 크게 보기 이벤트
  const handleClick = (announcement) => {
    setSelectedAnnouncement(announcement); // 선택된 공고를 상태에 저장
  };

  // 확대된 공고 -> 리스트로 돌아가기 이벤트
  const handleBack = () => {
    setSelectedAnnouncement(null);
  };

 // (3) 정적으로 작성
  const columns = [
    {
      title: '제목',
      dataIndex: 'title',
      key: 'eventId',
    },
    {
      title: '주최사',
      dataIndex: 'hostName',
      key: 'eventId',
    },
    {
      title: '분야',
      dataIndex: 'category',
      key: 'eventId',
    },
    {
      title: '참가대상',
      dataIndex: 'preferred',
      key: 'eventId',
    },
    {
      title: '접수기간',
      dataIndex: 'activityDate',
      key: 'eventId',
    },
    {
      title: '홈페이지',
      dataIndex: 'link',
      key: 'eventId',
    },
    {
      title: '세부사항',
      dataIndex: 'tasks',
      key: 'eventId',
    },
    {
      title: '이미지',
      dataIndex: 'image',
      key: 'eventId',
    },
  ];

  // (4) 저장 이벤트
  // 서버 정보
  const API_URL = 'http://15.164.143.17:8080/api/v1/events/save';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
  

  // 캘린더에 저장하기 이벤트
  const handleSave = async (announcement) => {
    try {
      const response = await axios.post(API_URL, {
        eventId: announcement.eventId,
        type: announcement.type,
        hostName: announcement.username,
        image: announcement.image,
        category: announcement.category,
        title: announcement.title,
        applyDate: announcement.applyDate,
        link: announcement.link,
        tasks: announcement.tasks,
        requirement: announcement.requirement,
        preferred: announcement.preferred,
        activityDate: announcement.activityDate,
      }, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(response.data);

      // 성공 팝업창
      Modal.success({
        content: '공고 저장에 성공했습니다.',
      });
    } catch (error) {
      console.error('Failed to save the announcement:', error);

      // 실패 팝업창
      Modal.error({
        content: '공고 저장에 실패했습니다.' + error,
      });
    }
  };


  // (5) 데이터를 삭제하는 이벤트
  /**
   * 모든 사용자가 공용으로 쓰는 데이터가 아니라
   * 맞춤 공고 데이터라 사용자별 데이터임
   */
const handleDelete = async (announcement) => {
  try {
    const response = await axios.delete(`${API_URL}/${announcement.eventId}`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    });
    console.log(response.data);

    // 성공 팝업창
    Modal.success({
      content: '공고 삭제에 성공했습니다.',
    });
  } catch (error) {
    console.error('Failed to delete the announcement:', error);

    // 실패 팝업창
    Modal.error({
      content: '공고 삭제에 실패했습니다.' + error,
    });
  }
};


  /** 2. 데이터를 화면에 출력하기 */
// (1) 선택된 공고가 있으면 테이블을 보여주기 (없으면 공고 목록을 보여줌)
return selectedAnnouncement ? (
  // (1)-(1) 테이블 형태: 2행 N열이라 보기 불편
  //<Table dataSource={[selectedAnnouncement]} columns={columns} />

  // (1)-(2) N행 2열
  /*
  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div><strong>제목:</strong> {selectedAnnouncement.title}</div>
      <div><strong>주최사:</strong> {selectedAnnouncement.hostName}</div>
      <div><strong>분야:</strong> {selectedAnnouncement.category}</div>
      <div><strong>참가대상:</strong> {selectedAnnouncement.preferred}</div>
      <div><strong>접수기간:</strong> {selectedAnnouncement.activityDate}</div>
      <div><strong>홈페이지:</strong> {selectedAnnouncement.link}</div>
      <div><strong>세부사항:</strong> {selectedAnnouncement.tasks}</div>
    </div>
    */

    // (1)-(3) 그림도 띄워주기
  
  <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '800px', margin: 0, textAlign: 'left'  }}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <div><img src={selectedAnnouncement.image} style={{width: '300px', padding: '15px 0px'}}></img></div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', padding: '15px' }}>
      <div><strong>제목:</strong> {selectedAnnouncement.title}</div>
      <div><strong>주최사:</strong> {selectedAnnouncement.hostName}</div>
      <div><strong>분야:</strong> {selectedAnnouncement.category}</div>
      <div><strong>참가대상:</strong> {selectedAnnouncement.preferred}</div>
      <div><strong>접수기간:</strong> {selectedAnnouncement.activityDate}</div>
      <div><strong>홈페이지:</strong> {selectedAnnouncement.link}</div>
      <div><strong>세부사항:</strong> {selectedAnnouncement.tasks}</div>
      <span>
        <Button onClick={handleBack}>뒤로 가기</Button>
        <Button onClick={() => handleSave(selectedAnnouncement)}>저장하기</Button>
{/*        <Button onClick={() => handleDelete(selectedAnnouncement)}>삭제하기</Button>*/}
        <span><img src='./inae_images/delete_icon.png' alt='삭제하기' style={{width:'30px', padding:0, margin:10, verticalAlign: 'middle'}} onClick={() => handleDelete(selectedAnnouncement)}/></span>
      </span>
    </div>
  </div>

  // (2) 선택하지 않은 경우엔 공모전 리스트 띄우기
) : (
  <div>
    <Row gutter={16} style={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
    {announcements
    .filter(announcement => announcement.type === 'JOB')      // JOB 데이터만 추출
    .map((announcement, idx) => (
        <Col key={idx} onClick={() => handleClick(announcement)}>
          <Card title={announcement.applyDate} style={{ margin: '5px' }}>
            <img src={announcement.image} style={{width: '150px'}}/>
            <h3>[{announcement.hostName}] {announcement.title}</h3>
            <p><strong>지원자격</strong> {announcement.requirement} </p>
            <p><strong>근무조건</strong> {announcement.tasks} </p>
          </Card>
        </Col>
    ))}
    </Row>
  </div>
);
};

export default CompetitionListComponent;
