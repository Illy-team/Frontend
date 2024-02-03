

import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {
    const serverUrl = "http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080";
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
    const JS_APP_KEY ="222222222222222222222222222";

    const [message, setMessage] = useState('');

    const makeFormData = params => {
      const searchParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        searchParams.append(key, params[key]);
      });
  
      return searchParams;
    };

    const checkServerStatus = () => {
        axios.get(serverUrl, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        })
        .then(response => {
            setMessage(`서버 연결 상태: ${response.status}`);
        })
        .catch(error => {
            setMessage(`서버 연결 오류: ${error}`);
        });
    };

    const requestToken = (code) => {
      return axios({   
        method: 'POST',
        headers: {
          Authorization: `Bearer ${TOKEN}`
        },
        url: serverUrl,
        data: makeFormData({
          grant_type: 'authorization_code',
          client_id: JS_APP_KEY,
          code,
        })
      })
      .then(response => {
          setMessage(`토큰 요청 상태: ${response.status}`);
      })
      .catch(error => {
          setMessage(`토큰 요청 오류: ${error}`);
      });
    };

    return (
        <div className="App">
            <p>
                {message}
            </p>
            <div>
                <button onClick={checkServerStatus}>서버 연결 상태 확인</button>
                <button onClick={() => requestToken('your_authorization_code')}>토큰 요청</button>
            </div>
        </div>
    );
}

export default App;
