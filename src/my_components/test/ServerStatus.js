import './App.css';
import {useState} from "react";
import axios from "axios";
/**
 * 서버 연결시 상태 확인하는 코드
 * nonProxy 버튼 클릭해보삼
 */
function App() {

    const serverUrl = "http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080";
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
    
    const [message, setMessage] = useState('');

    const responseHandler = ({data}) => {
        setMessage(data);
        return data;
    };

    const errorHandler = ({message}) => {
        setMessage(message);
        return message;
    };

    const onNonCorsHeaderHandler = () => {
        axios.get(serverUrl + '/not-cors', {
            headers: { Authorization: `Bearer ${TOKEN}` }
          })
            .then(responseHandler)
            .catch(errorHandler);
    };

    const onCorsHeaderHandler = () => {
        axios.get(serverUrl + '/cors', {
            headers: { Authorization: `Bearer ${TOKEN}` }
          }).then(responseHandler);
    };

    const onNonProxyHandler = () => {
        axios.get('/not-proxy', {
            headers: { Authorization: `Bearer ${TOKEN}` }
          })
            .then(responseHandler)
            .catch(errorHandler);
    };

    const onProxyHandler = () => {
        axios.get('/proxy', {
            headers: { Authorization: `Bearer ${TOKEN}` }
          }).then(responseHandler);
    };

    const onDefaultHandler = () => {
        axios.get(serverUrl , {
            headers: { Authorization: `Bearer ${TOKEN}` }
          })
            .then(responseHandler)
            .catch(errorHandler);
    };

    return (
        <div className="App">
            <p>
                {message}
            </p>
            <div>
                <button onClick={onNonCorsHeaderHandler}>non cors header</button>
                <button onClick={onCorsHeaderHandler}>cors header</button>
                <button onClick={onNonProxyHandler}>nonProxy</button>
                <button onClick={onProxyHandler}>proxy</button>
                <button onClick={onDefaultHandler}>default</button>
            </div>
        </div>
    );
}

export default App;