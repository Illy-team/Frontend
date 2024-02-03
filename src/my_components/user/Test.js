/** 서버와의 연결 확인 성공한 versions */
// <M1>

import React, { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    getJobInfos();
  }, []);

  const getJobInfos = async () => {
//    const API_URL = 'http://15.164.143.17:8080';
    const API_URL = 'http://15.164.143.17:8080/api/v1/events/jobs';
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      alert("눌렀당");
      alert(response.status);

      if (response.status === 200) {
        alert("요청이 성공적으로 완료되었습니다. 상태 코드: 200");
      } else if (response.status === 400) {
        alert("요청이 잘못되었습니다. 상태 코드: 400");
      } else {
        alert(`요청이 성공적으로 처리되지 않았습니다. 상태 코드: ${response.status}`);
      }
    } catch (error) {alert(`Error Name: ${error.name}\nError Message: ${error.message}`);
    if (error.response) {
      alert(`Response Status: ${error.response.status}\nResponse Data: ${JSON.stringify(error.response.data)}`);
    }
    if (error.request) {
      alert(`Request: ${JSON.stringify(error.request)}`);
    }
    console.error(error);
      /*
      if (error.response && error.response.status === 400) {
        alert("요청이 잘못되었습니다. 상태 코드: 400");
        console.log(error.response.status);
      } else {
        console.error(error);
      }
      */
    }
  }

  return (
    <div>
      <button onClick={getJobInfos}>데이터 가져오기</button>
    </div>
  )
}

export default App;



////////////
// <M2>
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [secretData, setSecretData] = useState(null);
  const API_URL = 'http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080/api/v1/events';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

  const fetchSecretData = ()=> {
      const headers = { 'Authorization': TOKEN };
      fetch(API_URL + "/jobs", {headers})
          .then(response => response.json())
          .then(data => setSecretData(data.data));
  }

  return (
      <div>
          <button onClick={fetchSecretData}>
              🔐 Press here for a secret movie spoiler
          </button>
          <h3>{secretData}</h3>
      </div>
  );
}
export default App;
*/

///////////////////
// <M3>
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * 토큰, API 만료되면 Network Error 발생!!
 *
const MyComponent = () => {
  // 1) url 포트번호
  const API_URL = 'http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080/api/v1/events';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

  useEffect(() => {
    getJobInfos();
  }, []);

  const [outputs, setOutput] = useState([]);

  // Job 공고 불러오기
  async function getJobInfos() {
    console.log("요청이 성공적으로 완료되었습니다.");

    try {
      const response = await axios.get(API_URL + "/jobs", {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
  
      if (response.status === 200) {
        console.log("요청이 성공적으로 완료되었습니다.");
        setOutput(response.data);
      } else {
        console.log("요청이 성공적으로 처리되지 않았습니다. 상태 코드:", response.status);
      }
    } catch (error) {
      console.error(error);
    }
  }

  // 데이터 출력
  return (
    <div>
      <p>gkd</p>
              <p onClick={useEffect}>
                안녕</p>
                <label onClick={() => getJobInfos()}>
                  <p>O</p>
                 </label>
      <p>{outputs}</p>
      {
        outputs
        ? outputs.map((output) => {
          return (
            // key 값은 JSON 형태에서 기본키가 될만한 녀석(feature명, column명)
            <div key={output.eventId}>
              <p onClick=
                {getJobInfos()}>
                안녕</p>
              <h3>
              {output.title}
              </h3>
            </div>
          )
        })
        : null
      }
    </div>
  );
};

export default MyComponent;
*/