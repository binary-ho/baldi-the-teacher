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
    height: 70vh;
    width: 70vw;
`

export const MainPage = () => {
  const [students, setStudents] = useState([]);
  const onDrop = useCallback(files => {
    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const students = convertXLSXToStudents(event.target.result);
      setStudents(students);
    }
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <div>
      {
        students.length === 0 ?
          <DropZone {...getRootProps()}>
            <input {...getInputProps()} />
            <p> csv 파일을 드랍하세요 or 클릭하여 업로드 하세요 </p>
          </DropZone>
          :
          <HomeworkPage studentsRawData={students}/>
      }
    </div>
  );
}