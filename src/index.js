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
            console.log('Cannot add grade to non existent student.');
        } 
    else {
            student.grades.push(value); 
            console.log(`${colors.green}Added grade ${value} to ${student.firstName}!${colors.reset}`);
        }
}

function showStudentInfo(id) {
    
    const student = findStudentById(id);

    if (student == null) {
            console.log(`${colors.red}Student not found.${colors.reset}`);
        } 
    else {
            const studentAvg = calculateAverage(student);
            console.log(`${colors.blue}First name: ${colors.reset}` + student.firstName + `${colors.blue} ID: ${colors.reset}` + student.id + `${colors.blue} Grades: ${colors.reset}` + student.grades + `${colors.blue} Average: ${colors.reset}` + studentAvg);
        }
}

function showAllStudents() {
    if(students.length === 0) {
        console.log('No students found.');
        return;
    }
    for (const student of students) {
        const studentAvg = calculateAverage(student);
        console.log(`${colors.blue}First name: ${colors.reset}` + student.firstName + `${colors.blue} ID: ${colors.reset}` + student.id + `${colors.blue} Grades: ${colors.reset}` + student.grades + `${colors.blue} Average: ${colors.reset}` + studentAvg);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log(`${colors.blue}--------- Student Grade Tracker ---------${colors.reset}`);
console.log('1. Show all students\n2. Find a student\n3. Add grade to student');
console.log(`${colors.red}4. Exit${colors.reset}`);
showMenu();

function showMenu() {
    rl.question('Choose an option: ', (answer) => {
        if(answer > 4 || answer <= 0) {
            console.log(`${colors.red}Invlid index.${colors.reset}`);
            showMenu();
        }
        if(answer == 1) {
            showAllStudents();
            showMenu();
        }
        if(answer == 2) {
            rl.question('Student ID? ', (stdID) => {
                const id = Number(stdID);
                showStudentInfo(id);
                showMenu();
            })
        }
        if(answer == 3) {
            rl.question('Student ID? ', (stdID) => {
                const id = Number(stdID);
                if(findStudentById(id) == null) {
                    console.log(`${colors.red}Invlid student ID.${colors.reset}`);
                    showMenu();
                }
                rl.question('Grade? ', (stdGrade) => {
                    const id = Number(stdID);
                    const grade = Number(stdGrade);
                    if(stdGrade > 100) {
                        console.log(`${colors.red}Cannot add grade higher than 100.${colors.reset}`);
                        showMenu();
                    }
                    else if(stdGrade < 0) {
                        console.log(`${colors.red}Cannot add grade lower than 0.${colors.reset}`);
                        showMenu();
                    }
                    else {
                        addGradeToStudent(id, grade);
                        showMenu();
                    }
            })
            })
        }
        if(answer == 4) {
            rl.close();
        }
    })
}

// check gpt chat, invalid input control and pretty output