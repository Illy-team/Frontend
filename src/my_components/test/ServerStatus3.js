import React, {useState} from "react";
import './App.css';
import axios from "axios";

function App() {
    const serverUrl = "http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080";
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

    const [message, setMessage] = useState('');
  async function getTodos() {
    await axios
      // data 불러오기
      .get(serverUrl)
      // 불러온 data를 콘솔에 출력하기
      .then((response) => {
        alert(response.data)
      })
      // 에러 발생시 에러 내용을 콘솔에 출력하기
      .catch((error) => {
        alert(error)
      })
  }

  return (
    <div className="App">
        <p>
            {message}
        </p>
        <div>
            <button onClick={getTodos}>non cors header</button>
        </div>
    </div>
  );
}

export default App;