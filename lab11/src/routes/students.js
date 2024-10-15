import express from 'express';

import * as controller from '../controllers/studentController.js';

const router = express.Router();

router.route('/')
    .get(controller.getStudents)
    .post(express.json(), controller.addStudent);

router.route('/:id')
    .get(controller.getStudentById)
    .put(express.json(), controller.updateStudent)
    .delete(controller.deleteStudent);

export default router;
