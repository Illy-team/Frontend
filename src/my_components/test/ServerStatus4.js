import React, { useState, useEffect } from "react";
import axios from "axios";


function App() {
    const ServerURL = 'http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080';
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
    const R = '/api/v1/events/';
    
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
      app.use(
        '/api', //proxy가 필요한 path prameter를 입력합니다.
        createProxyMiddleware({
          target: ServerURL, //타겟이 되는 api url를 입력합니다.
          changeOrigin: true, //대상 서버 구성에 따라 호스트 헤더가 변경되도록 설정하는 부분입니다.
        })
      );
    };

  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            ServerURL,
            { headers: { Authorization: `Bearer ${TOKEN}` } }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data from server:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      {data ? (
        data.map((item, index) => (
          <div key={index}>
            {/* Render your data here */}
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
