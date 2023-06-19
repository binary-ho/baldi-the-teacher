import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { convertXLSXToStudents } from "../../utils/XLSXReader";
import styled from "styled-components";
import {HomeworkPage} from "./HomeworkPage/HomeworkPage";

const DropZone = styled.div`
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vh;
    width: 50vw;
`

const WhiteBox = styled.div`
  background-color: whitesmoke;
  margin : 20px;
  padding: 10px;
`

const STUDY = {
  0 : "WEB", 1 : "BE", 2 : "AI", 3 : "MOBILE"
}

export const MainPage = () => {
  const [students, setStudents] = useState([]);
  const [startWeek, setStartWeek] = useState(1);
  const [endWeek, setEndWeek] = useState(10);
  const [study, setStudy] = useState("WEB");

  const onDrop = useCallback(files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      if (startWeek > endWeek || (startWeek < 0 || startWeek > 10) || (endWeek < 0 || endWeek > 10)) {
        alert("주차 설정을 확인하세요");
        return;
      }

      const students = convertXLSXToStudents(event.target.result);
      setStudents(students);
    }
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleEndWeekChange = (event) => {
    setEndWeek(event.target.value);
  };

  const handleStartWeekChange = (event) => {
    setStartWeek(event.target.value);
  };

  const handleStudyChange = (event) => {
    setStudy(event.target.value);
  };

  return (
    <div>
      {
        students.length === 0 ?
          <div>
            <DropZone {...getRootProps()}>
              <input {...getInputProps()} />
              <b> csv 파일을 드랍 or 클릭하여 업로드 </b>
            </DropZone>
            <WhiteBox>
              시작 주차 : <input type={"number"} placeholder={1} value={startWeek} onChange={handleStartWeekChange}/>
            </WhiteBox>
            <WhiteBox>
              끝 주차 : <input type={"number"} placeholder={10} value={endWeek} onChange={handleEndWeekChange}/>
            </WhiteBox>
            <WhiteBox>
              스터디 : .
                <select value={study} onChange={handleStudyChange}>
                  {
                    Object.entries(STUDY).map(([key, value]) => {
                      return <option key={key} value={value}>{value}</option>
                    })
                  }
                </select>
            </WhiteBox>
          </div>
          :
          <HomeworkPage studentsRawData={students} startWeek={startWeek} endWeek={endWeek} study={study}/>
      }
    </div>
  );
}