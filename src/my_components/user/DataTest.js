import React, { useEffect, useState } from 'react';
import axios from 'axios';

//"proxy": "http://15.164.143.17:8080",
function JobEventComponent() {
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
    const JobUrl = 'http://15.164.143.17:8080/api/v1/events/jobs';

    // 서버로부터 가져온 job data들
    const [jobs, setJob] = useState([]);    // input 변수의값을 빈 string으로 초기화

    /// method1.
    /*
    useEffect(() => {
        getJobData();
    }, []);

    const getJobData = async() => {
        await axios
        .get(JobUrl, {
            headers: {
            Authorization: `Bearer ${TOKEN}`
            }
        })
        .then((res) => {
            setJob(res.data);
            console.log("성공");
        })
        .catch((Error) => {
            console.log(Error);
        });
    };
*/

    /// method2.
    const getJobData = async () => {
        axios
        .get(JobUrl, {
            headers: {
            Authorization: `Bearer ${TOKEN}`
            }
        })
        .then((res) => {
            setJob(res.data);
            console.log("성공");
        })
        .catch((Error) => {
            console.log(Error);
        });
    };
    

    /////////////////
  /////////(1) 잠만
/*  
  useEffect(() => {
    getJobsInfos();
  }, []);

  async function getJobsInfos() {
    await axios
      // 홈페이지 url 경로에 접속하기 (root 경로 -> login 경로), GET 형식 메소드
      .get(JobUrl, {
        headers: {
          Authorization: `Bearer ${TOKEN}`
        }
      })

      // data 불러오기
      .then((response) => {
        // 불러온 data를 콘솔에 출력하기
        //console.log(response.data)
        //alert(response)
        // spring boot로부터 받아온 data를 output 변수에 저장하기 (결과 출력을 위해)
        setJob(response.data);
      })
      // 에러 발생시 에러 내용을 콘솔에 출력하기
      .catch((error) => {
        console.log(error)
      });
  };
*/

  ///////////////////
  // 삽입 부분은 나중엔
/*
  function insertJobInfo(e) {
    e.preventDefault();

    const insertJobInfo = async () => {
      await axios
        // 홈페이지 url 경로에 접속하기 (root 경로 -> login 경로), POST 형식 메소드
        // JSON(spring boot 피쳐명): 내가 선언한 변수명
        // 이렇게 mapping 시켜서 변수 안의 값을 보내
        .post(JobUrl, {
            title: title
        })

        // 서버로 데이터 전송에 성공했을 때
        .then((response) => {
          // 콘솔로 출력하여 확인하기
          //console.log(response.data)
          
          // 프론트엔드(text field)에 사용자가 작성한 값은 초기화해서 새로 고침해주기
          setTitle("");

          // 정보들은 잃지않게 가져와서 프론트엔드(홈페이지)에 뿌리기
          getJobsInfos();
        })

        // Error 발생시 콘솔에 찍기
        .catch((error) => {
          console.error(e)
        })
    }
    insertJobInfo();
    console.log("정보 추가 완료!");
  }

  function changeTitle(e) {
    e.preventDefault();   // 제출 버튼 클릭해도 사용자가 작성한 값이 초기화되지 않도록 막아줌
    setTitle(e.target.value)
    //console.log("input 값: " + input);   // 로그를 찍어서 확인
  }
*/

// return method1.

    return (
        <div>
            {   
                jobs.map((jobData) => {
                    return (
                        <div key={jobData.eventId}>
                            {jobData.hostName}
                        </div>
                    )
                })
            }
        </div>
    );

// return method2.
/*
  return jobs.map((jobData) => (
    <div key={jobData.eventId}>
        {jobData.hostName}
        {jobData.title}
        {jobData.tasks}
        {jobData.type}
        <p>w</p>
    </div>
    ))
    */
    
};

export default JobEventComponent;
