const readline = require('readline');
const colors = {
    reset: "\x1b[0m",
    bold: "\x1b[1m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    cyan: "\x1b[36m"
};

function createStudent(firstName, id, grades) {
    return {
        firstName: firstName,
        id: id,
        grades: grades
    };
}

const zak = createStudent('Zakaria', 1, [85, 92, 78]);
const med = createStudent('Mohammed', 2, [70, 82, 88]);
const alive = createStudent('Aicha', 3, [76, 75, 90]);
const melly = createStudent('Melly', 4, [72, 67, 69]);

const students = [zak, med, alive, melly];
// const students = [];

function calculateAverage(std) {
    if(std.grades.length === 0) {
        return 0;
    }

    let total = 0;
    for (const grade of std.grades) {
        total += grade;
    }

    let value = total / std.grades.length;
    return value.toFixed(2);
}

function findStudentById(id) {
    for (const student of students) {
        if(student.id === id) return student;  
    }
    return null;
}

function addGradeToStudent(id, value) {
    const student = findStudentById(id);
    if (student == null) {
            console.log('-');
        } 
    else {
            student.grades.push(value);
            console.log(`${colors.green}Successfully added grade ${value} to ${student.firstName}!${colors.reset}`);
        }
}

function showStudentInfo(id) {
    
    const student = findStudentById(id);

    if (student == null) {
            invalidStudentIDMessage();
        } 
    else {
            const studentAvg = calculateAverage(student);
            studentInfoMessage(student, studentAvg);
        }
}

function showAllStudents() {
    if(students.length === 0) {
        console.log('No students found.');
        return;
    }
    for (const student of students) {
        const studentAvg = calculateAverage(student);
        studentInfoMessage(student, studentAvg);
    }
}

function isValidInteger(value) {
    return Number.isInteger(value);
}
function isValidNumber(value) {
    return Number.isFinite(value);
}
function isLimitedNumber(value, min, max) {
    if (!Number.isFinite(value)) {
        return false;
    }
    return value >= min && value <= max;
}


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`${colors.blue}--------- Student Grade Tracker ---------${colors.reset}`);
console.log('1. Show all students\n2. Total students count\n3. Add new student\n4. Find a student\n5. Remove a student\n6. Add grade to a student');
console.log(`${colors.red}7. Exit${colors.reset}`);
showMenu();

function showMenu() {
    rl.question('Choose an option: ', (answer) => {
        const ans = Number(answer);

        if (!isLimitedNumber(ans, 1, 7) || !isValidInteger(ans)) {
            invalidMenuOptionMessage();
            showMenu();
            return;
        }

        if (ans === 1) {
            showAllStudents();
            showMenu();
            return;
        }
        else if (ans === 2) {
            console.log('Total students: ' + Number(students.length));
            showMenu();
            return;
        }
        else if (ans === 3) {
            rl.question('Student ID: ', (newStudentID) => {
                const id = Number(newStudentID);
                if (!isValidNumber(id) || !isValidInteger(id) || !isLimitedNumber(id, 1, 1000)) { // 1000 for now, increase later
                    invalidStudentIDMessage();
                    showMenu();
                    return;
                }

                rl.question('Student name: ', (newStudentName) => {
                    const name = newStudentName.trim();
                    if (!name || isValidNumber(Number(name))) {
                        invalidStudentNameMessage();
                        showMenu();
                        return;
                    }

                    const newStudent = createStudent(name, id, [0]);
                    students.push(newStudent);
                    console.log(`${colors.green}Successfully added student ${newStudent.firstName}!${colors.reset}`);
                    showMenu();
                });
            });
        }
        else if (ans === 4) {
            rl.question('Student ID: ', (stdID) => {
                const id = Number(stdID);
                if (!isValidNumber(id)) {
                    invalidStudentIDMessage();
                    showMenu();
                    return;
                }
                showStudentInfo(id);
                showMenu();
            });
        }
        else if (ans === 5) {
            rl.question('Student ID: ', (oldStudentID) => {
                const id = Number(oldStudentID);
                if (!isValidNumber(id)) {
                    invalidStudentIDMessage();
                    showMenu();
                    return;
                }

                const studentIndex = students.findIndex(student => student.id === id);
                if (studentIndex === -1) {
                    invalidStudentIDMessage();
                    showMenu();
                    return;
                }

                const removedStudent = students.splice(studentIndex, 1)[0];
                console.log(`${colors.green}Successfully removed student ${removedStudent.firstName}!${colors.reset}`);
                showMenu();
            });
        }
        else if (ans === 6) {
            rl.question('Student ID: ', (stdID) => {
                const id = Number(stdID);
                if (findStudentById(id) == null || !isValidNumber(id)) {
                    invalidStudentIDMessage();
                    showMenu();
                    return;
                }

                rl.question('Grade: ', (stdGrade) => {
                    const grade = Number(stdGrade);
                    if (!isLimitedNumber(grade, 0, 100)) {
                        invalidStudentGradeMessage();
                        showMenu();
                        return;
                    }
                    else if (!isValidNumber(grade)) {
                        console.log(`${colors.red}Cannot add text as a grade.${colors.reset}`);
                        showMenu();
                        return;
                    }
                    else {
                        addGradeToStudent(id, grade.toFixed(2));
                        showMenu();
                    }
                });
            });
        }
        else {
            rl.close();
        }
    });
}

function invalidMenuOptionMessage() {
    console.log(`${colors.red}Please choose a valid menu option.${colors.reset}`);
}

function invalidStudentIDMessage() {
    console.log(`${colors.red}Please enter a valid student ID.${colors.reset}`);
}

function invalidStudentNameMessage() {
    console.log(`${colors.red}Please enter a valid student name.${colors.reset}`);
}

function duplicateStudentIDMessage() {
    console.log(`${colors.red}A student already has this ID, please choose another.${colors.reset}`);
}

function invalidStudentGradeMessage() {
    console.log(`${colors.red}Please enter a value between 0 and 100.${colors.reset}`);
}

function studentInfoMessage(s, savg) {
    console.log(`${colors.blue}First name: ${colors.reset}` + s.firstName + '\n' + `${colors.blue}ID: ${colors.reset}` + s.id + '\n' + `${colors.blue}Grades: ${colors.reset}` + s.grades + '\n' + `${colors.blue}Average: ${colors.reset}` + savg);
}

// check gpt chat, invalid input control and pretty output

//show all students, show students count, add student, find student, remove student, add grade to student, exit

//invalid possibilities: -1, 1000, nb in txt case, txt in nb case, 1.5

// full invalid checks: add new student, find student, remove student, add grade