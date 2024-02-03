/*
import React from 'react';
import { Form, Input, Button } from 'antd';

function Page(){
    return (
        <div>
            <h3>보여줘</h3>
            <h3>보여줘</h3>
            <h3>보여줘</h3>
            <h3>보여줘</h3>
            <h3>보여줘</h3>
            <h3>보여줘</h3>
        </div>
    )
}

export default Page;
*/
/*
공고 정보 ERD에는 이벤트 아이디, 타입, 회사명, 이미지, 분야, 제목, 날짜가 있다.
‘추천공고’라는 데이터베이스의 API url과 토큰은 다음과 같다.
http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080/api/v1/events/
eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODQ3NzkzLCJleHAiOjE3MDY4NTEzOTN9.4fxGRPlOqU-UEAbdtbtARizEM7PC9Lz9fcW0qQN9BsQ
스프링 부트와 React를 연동할 계획이다.
리엑트에서 데이터를 받아서 화면에 테이블 형태로 출력하는 코드를 작성해줘!

*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EventTable = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await axios.get('http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080/api/v1/events/', {
        headers: {
          'Authorization': `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E`
        }
      });
      setEvents(response.data);
    };

    fetchEvents();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>이벤트 아이디</th>
          <th>타입</th>
          <th>회사명</th>
          <th>이미지</th>
          <th>분야</th>
          <th>제목</th>
          <th>날짜</th>
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <tr key={event.id}>
            <td>{event.id}</td>
            <td>{event.type}</td>
            <td>{event.company}</td>
            <td><img src={event.image} alt="이미지" /></td>
            <td>{event.field}</td>
            <td>{event.title}</td>
            <td>{event.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EventTable;
