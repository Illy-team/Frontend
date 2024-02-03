/** 서버와의 연결 확인 성공한 versions */
// 데이터 불러오는 법
// axios.get으로 데이터를 불러올 때, 응답의 data 필드에 실제 데이터가 담겨있습니다. 따라서 response.data를 통해 데이터에 접근할 수 있습니다
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button } from 'antd';

function App() {
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

  const columns = [
    {
      title: '회사',
      dataIndex: 'hostName',
      key: 'hostName',
    },
    {
      title: '제목',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '지원자격',
      dataIndex: 'requirement',
      key: 'requirement',
    },
    {
      title: '근무조건',
      dataIndex: 'tasks',
      key: 'tasks',
    },
  ];

  return (
    <div>
      <Button onClick={getJobInfos}>데이터 가져오기</Button>
      <Table dataSource={jobInfos} columns={columns} />
    </div>
  )
}

export default App;
