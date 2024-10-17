import Student from '../models/student.js';

export function addStudent(req, res, next) {
    const { id, name, program } = req.body;
    if (!id || !name || !program) res.status(400).json({ error: 'Please input id, name, program.' });

    const student = Student.create(new Student(parseInt(id), name, program));
    if (student) {
        const relativeUrl = `${req.baseUrl}/${student.id}`;
        res.status(201).location(relativeUrl).json(student);
    } else {
        res.status(409).json({ error: `Student id: ${id} has existed.` });
    }
}

export function getStudents(req, res, next) {
    const { sort, order, name, program } = req.query;
    res.status(200).json(Student.getStudents(sort, order, name, program));
}

export function getStudentById(req, res, next) {
    const { id } = req.params;
    const student = Student.getStudentById(parseInt(id));
    if (student) res.status(200).json(student);
    else res.status(404).json({ error: `Student id: ${id} not found.` });
}

export function updateStudent(req, res, next) {
    const { id } = req.params;
    const { name, program } = req.body;
    if (!name || !program) res.status(400).json({ error: 'Please input name, program.' });

    const updated = Student.updateStudent(new Student(parseInt(id), name, program));
    if (updated) res.status(200).json({ message: `Student ${name} has been updated.` });
    else res.status(404).json({ error: `Student id: ${id} not found.` });
}

export function deleteStudent(req, res, next) {
    const { id } = req.params;
    const deleted = Student.deleteStudent(parseInt(id));
    if (deleted) res.status(200).json({ message: `Student id: ${id} has been deleted.` });
    else res.status(404).json({ error: `Student id: ${id} not found.` });
}
