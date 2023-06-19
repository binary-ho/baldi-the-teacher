import styled from "styled-components";

const StudentRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  border: 1px solid black;
`;

const Column = styled.p`
  margin: 15px;
`

export const WeekStudentsInfo = (students) => {
    return (
        <div>
            {
                students.students && Object.keys(students.students)
                    .sort((a, b) => {
                        return students.students[b]["isSubmit"] === "제출함" ? 1 : -1;
                    })
                    .map(handle => {
                    const studentInfo = students.students[handle];

                    return (
                        <StudentRow key={handle} >
                            <Column>{handle}</Column>
                            <Column key={"isSubmit"}> {studentInfo["isSubmit"]} </Column>
                            {
                                studentInfo["length"] !== -1 ?
                                <Column key={"length"}> 과제물 길이 : {studentInfo["length"]} </Column>
                                    :
                                <div/>
                            }
                            <a href={studentInfo["url"]} target="_blank">바로 가기</a>
                        </StudentRow>
                    )
                })
            }
        </div>
    )
}
