import React, { useState, useEffect } from "react";
import './App.css';
import axios from "axios";

function App() {
  /* spring boot와 연동 */
  // 1) url 포트번호
  const baseUrl = "http://localhost:8080"

  // 2) 기존 data를 서버로부터 가져오기
  /**
   * Spring boot -> Controller.kt에 함수를 다음과 같이 선언한 경우 함수명 맞춰주는 게 좋다
   * @GetMapping
   * fun getPersonalInfos() = myService.getPersonalInfos()
   * 
   * => GET 형식의 메소드
   */
  useEffect(() => {
    getPersonalInfos;
  }, []);

  // 객체로 outputs 변수 생성 (setOutput 함수 호출시 outputs 변수에 값 저장)
  // 배열로 초기화 (변수명을 output이 아닌 outputs (복수형)으로 지은 이유)
  const [outputs, setOutput] = useState([]);

  async function getPersonalInfos() {
    await axios
      // 홈페이지 url 경로에 접속하기 (root 경로 -> login 경로), GET 형식 메소드
      .get(baseUrl + "/login")

      // data 불러오기
      .then((response) => {
        // 불러온 data를 콘솔에 출력하기
        //console.log(response.data)

        // spring boot로부터 받아온 data를 output 변수에 저장하기 (결과 출력을 위해)
        setOutput(response.data);
      })
      // 에러 발생시 에러 내용을 콘솔에 출력하기
      .catch((error) => {
        console.error(error)
      })
  }

  // 3) 사용자로부터 입력받는 값 저장하기
  // (1) 모든 입력값은 input 변수에 들어감
  //const [input, setInput] = useState("");    // input 변수의값을 빈 string으로 초기화
  //const [input, setInput] = useState([]);  // input 변수의 값을 객체로 초기화
  const [inputUserName, setInputUserName] = useState("");    // input 변수의값을 빈 string으로 초기화
  const [inputID, setInputID] = useState("");    // input 변수의값을 빈 string으로 초기화
  const [inputPW, setInputPW] = useState("");    // input 변수의값을 빈 string으로 초기화
  

  // (2) 입력 값이 바뀔 때마다 수행될 함수
  /*
  function changePersonalData(e) {
    e.preventDefault();   // 제출 버튼 클릭해도 사용자가 작성한 값이 초기화되지 않도록 막아줌
    setInput(e.target.value)
    //console.log("input 값: " + input);   // 로그를 찍어서 확인
  }
  */
  function changeUserNameData(e) {
    e.preventDefault();   // 제출 버튼 클릭해도 사용자가 작성한 값이 초기화되지 않도록 막아줌
    setInputUserName(e.target.value)
    //console.log("input 값: " + input);   // 로그를 찍어서 확인
  }
  function changeID(e) {
    e.preventDefault()
    setInputID(e.target.value);
  }
  function changePW(e) {
    e.preventDefault()
    setInputPW(e.target.value);
  }


  // (3) 서버로 보내기
  /**
   * Spring boot -> Controller.kt에 함수를 다음과 같이 선언한 경우 함수명 맞춰주는 게 좋다
   * @PostMapping
   * fun insertPersonalInfos(@RequestBody myRequest: MyRequest) = myService.insertPersonalInfos(insertRequest.to 어쩌고)
   * 
   * => POST 형식의 메소드
   * 
   * 참고로, MyRequest라는 클래스는 Spring boot에서 다음과 같이 선언되었다고 하자.
   * JSON 형태의 data가 괄호 안에 있는데 userName이 변수명이다.
   * data class MyRequest (val userName: String)
   */
  function insertPersonalInfo(e) {
    e.preventDefault();

    const insertPersonalInfo = async () => {
      await axios
        // 홈페이지 url 경로에 접속하기 (root 경로 -> login 경로), POST 형식 메소드
        // JSON(spring boot 피쳐명): 내가 선언한 변수명
        // 이렇게 mapping 시켜서 변수 안의 값을 보내
        .post(baseUrl + "/login", {
            userName: inputUserName,
            userID: inputID,
            userPW: inputPW
        })

        // 서버로 데이터 전송에 성공했을 때
        .then((response) => {
          // 콘솔로 출력하여 확인하기
          //console.log(response.data)
          
          // 프론트엔드(text field)에 사용자가 작성한 값은 초기화해서 새로 고침해주기
          setInputUserName("");
          setInputID("");
          setInputPW("");

          // 정보들은 잃지않게 가져와서 프론트엔드(홈페이지)에 뿌리기
          getPersonalInfos();
        })

        // Error 발생시 콘솔에 찍기
        .catch((error) => {
          console.error(e)
        })
    }
    insertPersonalInfo();
    console.log("정보 추가 완료!");
  }

  // (4) update 함수
  /**
   * Spring boot -> Controller.kt에 함수를 다음과 같이 선언한 경우 함수명 맞춰주는 게 좋다
   * @PutMapping(path = ["/{userNumber}"])
   * fun updatePersonalInfos(@PathVariable("userNumber")
   * 
   * => PUT 형식의 메소드
   * 
   * 참고로, url 형태는 루트 -> 로그인 경로 -> 유저 넘버(기본키) 이렇다고 하자.
   * http://localhost:8080/login/1
   */
  function updatePersonalInfo(userNumber) {
    // 콘솔로 확인
    //console.log("userNumber" + userNumber + "번째 정보를 클릭하셨습니다!");

    const updatePersonalInfo = async () => {
      await axios
        .put(baseUrl + "/login/" + userNumber, {})

        // 서버로 데이터 전송에 성공했을 때
        .then((response) => {
          // 콘솔로 출력하여 확인하기
          //console.log(response.data)

          // 화면에 업데이트 정보를 뿌리기
          // M1. DB에 접근  // MySQL의 SELECT 함수 호출
          //getPersonalInfos();

          // M2. 굳이 DB 접근 ㄴㄴ
          setOutput(
            outputs.map(output => 
              // 기본키가 같다면 업뎃
              output.userNumber == userNumber ? { ...output, completed: !output.completed}
              : output
            )
          )
        })

        // Error 발생시 콘솔에 찍기
        .catch((error) => {
          console.error(e)
        })
        
    }
  }

  // (6) delete 함수
  function deletePersonalInfo(userNumber) {
    // 콘솔로 확인
    //console.log("userNumber" + userNumber + "번째 정보를 삭제하셨습니다!");

    const deletePersonalInfo = async () => {
      await axios
        .delete(baseUrl + "/login/" + userNumber, {})

        .then((response) => {
          setOutput(
            // 기본키가 같다면 삭제 안 해
            outputs.filter((output) => output.userNumber !== output.userNumber)
          )
        })

        // Error 발생시 콘솔에 찍기
        .catch((error) => {
          console.error(e)
        })
    }
  }

  // (7) 화면 구성
  return (
    <div className="App">
      {/*
        * 사용자로부터 입력받기 위한 form 만들기
        * form tag의 onSubmit 속성: form 제출(submit 버튼 클릭)시 수행(호출)할 함수 
        * input tag의 required={true} 속성: 해당 tag에는 사용자가 입력 필수
        * 
        * PW &nbsp; <input type="password" />
        * &nbsp;는 띄어쓰기
        */}
      <h1>개인 정보</h1>
      <form onSubmit={insertPersonalInfo}>
        ID &nbsp; <input type="text" required={true} value={input} onChange={changeUserNameData}/>
        userName &nbsp; <input type="text" required={true} value={input} onChange={changeID}/>
        PW &nbsp; <input type="password" required={true} value={input} onChange={changePW}/>
        <br/>
        <input type="submit" value="Create"/>
      </form>

      {
        /* 
         * spring boot로부터 받아온 Output 출력
         * 만약 POST 형식이 다음과 같다면
         * {
         *  "index": 1,
         *  "name": "박인애",
         *  "age": 15
         * }
         */
      }
      {
        outputs
        ? outputs.map((output) => {
          return (
            // key 값은 JSON 형태에서 기본키가 될만한 녀석(feature명, column명)
            <div className="personalInfo" key={output.index}>
              <h3>
                {/* (1) 서버로부터 받아온 데이터 중 이름을 출력
                  * (2) label tag 안에 감싸서 클릭시 이벤트 추가 (updatePersonalInfo 함수 호출)
                  * (3) 함수 호출시 서버로부터 받은 output 정보 중 output.id를 매개 인자로 전달 */}
                <label onClick={() => updatePersonalInfo(output.index)}>
                  {output.name}
                </label>

                 {/* (4) 데이터 삭제 버튼 만들기 */}
                 <label onClick={() => deletePersonalInfo(output.index)}>
                  <p>대충 이모티콘넣든가 삭제 버튼입니다</p>
                 </label>
              </h3>
            </div>
          )
        })
        : null
      }
    </div>
  );
}

export default App;