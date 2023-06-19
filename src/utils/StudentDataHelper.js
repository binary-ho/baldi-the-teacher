import axios from "axios";

const STUDY_INFO = {
    WEB : {
        repository : "2023-1-OC-Web-Study",
    },
    BE : {
        repository : "2023-1-OC-BE-Study",
    },
    AI : {
        repository : "2023-1-OC-AI-Study"
    },
    MOBILE : {
        repository : "GDSC-OC-MOBILE-WIL",
    },
}

export function getStudents(studentsRawData) {
    return classifyStudents(studentsRawData).then(response => {
        return response;
    });
}

async function classifyStudents(studentsRawData) {
    const students = initStudies();

    for (const student of studentsRawData) {
        if (student.github_repo_link) {
            let push = false;
            for (const key in STUDY_INFO) {
                const study = STUDY_INFO[key];
                if (!student.github_repo_link.includes(study.repository)) {
                    continue;
                }

                push = true;
                const homeworkData = await getHomeworkData(study, student);
                Object.entries(homeworkData).forEach(([week, data]) => {
                    if (!students[key + "Students"]["week " + week]) {
                        students[key + "Students"]["week " + week] = {};
                    }
                    students[key + "Students"]["week " + week][student["discord_handle"]] = data;
                });
            }

            if (!push) {
                console.log("[ERROR] 파싱 실패 학생 (깃 링크를 확인하세요) : " + student.github_repo_link);
            }
        } else {
            console.log("[ERROR] 파싱 실패 학생 : " + student);
        }
    }

    return students;
}

const initStudies = () => {
    const students = {};

    for (const key in STUDY_INFO) {
        students[key + "Students"] = {};
        for (let i = 1; i <= 10; i++) {
            students[key + "Students"]["week " + i] = {};
        }
    }

    return students;
}


async function getHomeworkData(study, student) {
    const dataUrl = "https://raw.githubusercontent.com/" + student.github_handle + "/" + study.repository + "/main/Week";
    const homeworkData = {};

    for (let week = 1; week <= 10; week++) {
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
