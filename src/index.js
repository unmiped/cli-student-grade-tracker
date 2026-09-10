const readline = require('readline');

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

// const student = findStudentById(3);
// if(student != null) console.log('Found student with the name: ' + student.firstName);
// else console.log('Student not found.');

// const results = showInfo();
// console.log(results);

function addGradeToStudent(id, value) {
    const student = findStudentById(id);
    if (student == null) {
            console.log('Cannot add grade to non existent student.');
        } 
    else {
            student.grades.push(value); 
            console.log('Added grade ' + value + ' to ' + student.firstName);
        }
}

function showStudentInfo(id) {
    
    const student = findStudentById(id);

    if (student == null) {
            console.log('Student not found.');
        } 
    else {
            const studentAvg = calculateAverage(student);
            console.log('Name: ' + student.firstName + ' - ID: ' + student.id + ' - Grades: ' + student.grades + ' - Average: ' + studentAvg);
        }
}

// showStudentInfo(3);

function showAllStudents() {
    if(students.length === 0) {
        console.log('No students found.');
        return;
    }
    for (const student of students) {
        const studentAvg = calculateAverage(student);
        console.log(student.firstName + ' - ID: ' + student.id + ' - Grades: ' + student.grades + ' - Average: ' + studentAvg);
    }
}

// showAllStudents();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('==== Student Grade Tracker ====\n1. Show all students\n2. Find a student\n3. Add a grade\n4. Exit');
showMenu();

function showMenu() {
    rl.question('Choose an option: ', (answer) => {
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
                    console.log('Invlid student ID.');
                    showMenu();
                }
                rl.question('Grade? ', (stdGrade) => {
                    const id = Number(stdID);
                    const grade = Number(stdGrade);
                    addGradeToStudent(id, grade);
                    showMenu();
            })
            })
        }
        if(answer == 4) {
            rl.close();
        }
    })
}

// check gpt chat, invalid input control and pretty output