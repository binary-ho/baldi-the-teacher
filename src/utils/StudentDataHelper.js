import axios from "axios";

const STUDY_INFO = {
    WEB : "2023-1-OC-Web-Study",
    BE : "2023-1-OC-BE-Study",
    AI : "2023-1-OC-AI-Study",
    MOBILE : "GDSC-OC-MOBILE-WIL"
}

export function getStudents(payload) {
    return classifyStudents(payload).then(response => {
        return response;
    });
}

async function classifyStudents(payload) {
    const { studentsRawData, startWeek, endWeek, study } = payload;
    const students = initStudies(startWeek, endWeek, study);

    for (const student of studentsRawData) {
        if (student.github_repo_link) {
            if (!student.github_repo_link.includes(STUDY_INFO[study])) {
                continue;
            }
            const homeworkData = await getHomeworkData(study, student, startWeek, endWeek);

            Object.entries(homeworkData).forEach(([week, data]) => {
                if (!students[study][week]) {
                    students[study][week] = {};
                }
                students[study][week][student["discord_handle"]] = data;
            });
        } else {
            console.log("[ERROR] 파싱 실패 학생 : " + student);
        }
    }

    return students;
}

const initStudies = (startWeek, endWeek, study) => {
    const students = {};

    students[study] = {};
    for (let i = startWeek; i <= endWeek; i++) {
        students[study][i] = {};
    }

    return students;
}


async function getHomeworkData(study, student, startWeek, endWeek) {
    const dataUrl = "https://raw.githubusercontent.com/" + student.github_handle + "/" + STUDY_INFO[study] + "/main/Week";
    const homeworkData = {};

    for (let week = startWeek; week <= endWeek; week++) {
        homeworkData[week] = [];

        const weekUrl = dataUrl + week + "/WIL" + week + ".md";
        try {
            const response = await axios.get(weekUrl);
            homeworkData[week] = {
                isSubmit : "제출함",
                length : response.data.length,
                url : weekUrl,
            }
        } catch {
            homeworkData[week] = {
                isSubmit : "제출 안함",
                length : -1,
                url : weekUrl,
            }
        }
    }

    return homeworkData;
}
