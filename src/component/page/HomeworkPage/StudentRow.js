import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 5px;
  border: 1px solid black;
`;

const Column = styled.p`
  margin: 5px;
`

export const StudentRow = (students) => {
    return (
        <div>
            {
                students.students && Object.keys(students.students).map(handle => {
                    const studentInfo = students.students[handle];
                    return (
                        <Row key={handle}>
                            <Column>{handle}</Column>
                            {studentInfo && Object.keys(studentInfo).map(info => {
                                if (info === "isSubmit" || (info === "length" && studentInfo[info] !== -1)) {
                                    return (<Column key={info}> {info} : {studentInfo[info]} </Column>)
                                }
                            })}
                        </Row>
                    )
                })
            }
        </div>
    )
}
