export default class Student {
    constructor(id, name, program) {
        this.id = id;
        this.name = name;
        this.program = program;
    }

    static create(student) {
        const index = students.findIndex(c => c.id === student.id);
        if (index >= 0) return undefined;
        students.push(student);
        return structuredClone(student);
    }

    static getStudentById(id) {
        const student = students.find(c => c.id === id);
        return structuredClone(student);
    }

    static getStudents(sort, order, name, program) {
        let query = students;
        if (name) query = query.filter(c => c.name == name);
        if (program) query = query.filter(c => c.program == program);
        if (sort) {
            if (order == "asc") {
                query.sort((a, b) => a[sort].localeCompare(b[sort]));
            }
            else if (order == "desc") {
                query.sort((a, b) => b[sort].localeCompare(a[sort]));
            }
        }
        return structuredClone(query);
    }

    static updateStudent(student) {
        const existStudent = students.find(c => c.id === student.id);
        if (existStudent) {
            existStudent.name = student.name;
            existStudent.program = student.program;
            return true;
        }
        return false;
    }

    static deleteStudent(id) {
        const index = students.findIndex(c => c.id === id);
        if (index >= 0) {
            students.splice(index, 1);
            return true;
        }
        return false;
    }
}

const students = [
    new Student(1, 'Anna Smith', 'Compro'),
    new Student(2, 'Tom Jerry', 'MBA')
];
