import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 토큰, API 만료되면 Network Error 발생!!
 */
const MyComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // API URL 및 토큰 설정 (실제 URL과 토큰으로 교체해야 합니다)
      /*
      const API_URL = 'https://your.api.url';
      const TOKEN = 'your_api_token';
      */
      const API_URL = 'http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080/api/v1/events/jobs';
      const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
      
      // API 요청
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });

      // 응답 데이터 저장
      setData(response.data);
    };

    // 데이터 가져오기
    fetchData();
  }, []);

  if (!data) return <div>Loading...</div>;

  // 데이터 출력
  return (
    <div>
      <p>aaaaa</p>
      {data.map((item, index) => (
        <div key={index}>
          <p>aaaaa</p>
          <p>{item}</p>
          <p>{item.title}</p>  {/* 실제 필드 이름으로 변경해야 합니다 */}
        </div>
      ))}
    </div>
  );
};

export default MyComponent;
