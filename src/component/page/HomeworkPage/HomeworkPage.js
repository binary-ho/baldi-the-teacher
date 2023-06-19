import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {getStudents} from "../../../utils/StudentDataHelper";
import {WeekStudentsInfo} from "./WeekStudentsInfo";

const Board = styled.div`
  background-color: whitesmoke;
  width: 90vw;
  height: 80vh;
  overflow: visible;
  overflow-y: scroll;
`;

const StudyBox = styled.div`
  margin-bottom: 100px;
`

const WeekBox = styled.div`
  margin: 40px;
  border: 2px solid;
`

export const HomeworkPage = (payload) => {
    const [students, setStudents] = useState();

    useEffect(() => {
        getStudents(payload).then(students => {
            setStudents(students);
        });
    }, []);

    return (
        <div>
            <Board>
                {students && Object.keys(students).map((study, idx)=> {
                    return (
                        <StudyBox key={idx}>
                            <h1>{study}</h1>
                            {
                                Object.keys(students[study]).map(week => {
                                    return (
                                        <WeekBox>
                                            <h2>Week {week}</h2>
                                            <WeekStudentsInfo students={students[study][week]}/>
                                        </WeekBox>
                                    );
                                })
                            }
                        </StudyBox>
                    )
                })}
            </Board>
        </div>
    );
}
