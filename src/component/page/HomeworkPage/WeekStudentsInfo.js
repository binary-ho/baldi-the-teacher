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
                        <Row key={handle}>
                            <Column>{handle}</Column>
                            {studentInfo && Object.keys(studentInfo).map(key => {
                                if (key === "isSubmit" || (key === "length" && studentInfo[key] !== -1)) {
                                    return (<Column key={key}> {key} : {studentInfo[key]} </Column>)
                                }
                            })}
                        </Row>
                    )
                })
            }
        </div>
    )
}
